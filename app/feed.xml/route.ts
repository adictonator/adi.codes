import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import { getPostBySlug, getPublishedPosts } from '@/lib/mdx'
import { siteConfig } from '@/lib/site'

/**
 * RSS 2.0 feed at /feed.xml — built once at build time, like the blog itself.
 *
 * Items carry the full post as HTML (`content:encoded`), which is what dev.to
 * and Hashnode import when cross-posting (they keep a canonical link back
 * here) and what daily.dev needs to accept the blog as a source.
 *
 * The body is rendered as plain GitHub-flavoured markdown, not MDX: posts
 * don't use JSX components, and feed readers couldn't run them anyway.
 */
export const dynamic = 'force-static'

const site = siteConfig.url

function escapeXml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;')
}

// CDATA can't contain "]]>", so split it across two sections if it appears.
function cdata(value: string): string {
	return `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`
}

type HastNode = {
	type: string
	tagName?: string
	properties?: Record<string, unknown>
	children?: HastNode[]
}

// Feed readers show posts off-site, so "/assets/x.png" and "/blog/y" have to
// become absolute URLs or they break.
function absoluteUrls() {
	return (tree: HastNode) => {
		const visit = (node: HastNode) => {
			for (const key of ['href', 'src'] as const) {
				const value = node.properties?.[key]
				if (typeof value === 'string' && value.startsWith('/')) {
					node.properties![key] = `${site}${value}`
				}
			}
			node.children?.forEach(visit)
		}
		visit(tree)
	}
}

const toHtml = remark()
	.use(remarkGfm)
	.use(remarkRehype, { allowDangerousHtml: true })
	.use(absoluteUrls)
	.use(rehypeStringify, { allowDangerousHtml: true })

// MDX needs `\{` to print a literal brace; plain markdown already handles
// that escape, so the rendered text matches the site.
async function renderPost(slug: string): Promise<string> {
	const { content } = getPostBySlug(slug)
	return String(await toHtml.process(content))
}

export async function GET() {
	const posts = getPublishedPosts()

	const items = await Promise.all(
		posts.map(async post => {
			const url = `${site}/blog/${post.slug}`
			const html = await renderPost(post.slug)
			const footer = `<p><em>Originally published at <a href="${url}">${siteConfig.shortName}</a>.</em></p>`

			return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			<description>${escapeXml(post.description)}</description>
			<dc:creator>${escapeXml(siteConfig.name)}</dc:creator>
${post.tags.map(tag => `			<category>${escapeXml(tag)}</category>`).join('\n')}
			<content:encoded>${cdata(html + footer)}</content:encoded>
		</item>`
		}),
	)

	const lastBuild = posts[0]
		? new Date(posts[0].updated ?? posts[0].date).toUTCString()
		: new Date().toUTCString()

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
	<channel>
		<title>${escapeXml(`${siteConfig.name} — Notes`)}</title>
		<link>${site}/blog</link>
		<atom:link href="${site}${siteConfig.feed}" rel="self" type="application/rss+xml" />
		<description>${escapeXml('Notes from shipping iOS, React Native and web products solo — the decisions, the reversals, and the bits I got wrong first.')}</description>
		<language>en</language>
		<copyright>${escapeXml(`© ${new Date().getFullYear()} ${siteConfig.name}. CC BY-NC-ND 4.0 with AI restrictions — ${site}/license`)}</copyright>
		<managingEditor>${siteConfig.email} (${escapeXml(siteConfig.name)})</managingEditor>
		<lastBuildDate>${lastBuild}</lastBuildDate>
		<image>
			<url>${site}/assets/og.png</url>
			<title>${escapeXml(`${siteConfig.name} — Notes`)}</title>
			<link>${site}/blog</link>
		</image>${items.join('')}
	</channel>
</rss>
`

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600, s-maxage=3600',
		},
	})
}
