import type { ComponentPropsWithoutRef } from 'react'
import Link from 'next/link'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/mdx'
import { siteConfig } from '@/lib/site'
import { pageMetadata } from '@/lib/metadata'
import PageShell from '@/components/page-shell'
import AnimatedBlogPost from '@/components/blog/animated-blog-post'
import CodeBlock from '@/components/blog/code-block'

// GFM tables/strikethrough, plus stable heading ids wrapped in anchor links so
// headings are deep-linkable (and eligible as Google jump-to-section results).
const mdxOptions: MDXRemoteProps['options'] = {
	mdxOptions: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypeAutolinkHeadings,
				{ behavior: 'wrap', properties: { className: ['anchor'] } },
			],
		],
	},
}

const mdxComponents: MDXRemoteProps['components'] = {
	pre: ({ children, ...props }: ComponentPropsWithoutRef<'pre'>) => {
		const codeElement = (children as { props?: Record<string, unknown> })
			?.props
		if (typeof codeElement?.children === 'string') {
			return (
				<CodeBlock
					className={
						(codeElement.className as string) || 'language-text'
					}>
					{codeElement.children}
				</CodeBlock>
			)
		}
		return <pre {...props}>{children}</pre>
	},
	// The post title is the page's only <h1>. A `#` heading in the body would
	// be a second one, so it renders as an <h2> instead.
	h1: (props: ComponentPropsWithoutRef<'h2'>) => <h2 {...props} />,
	// Internal links stay client-side; external ones open in a new tab.
	a: ({ href = '', ...props }: ComponentPropsWithoutRef<'a'>) => {
		if (href.startsWith('/')) return <Link href={href} {...props} />
		if (href.startsWith('#')) return <a href={href} {...props} />
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" {...props} />
		)
	},
	// Wide tables scroll inside the post instead of widening the page on phones.
	table: (props: ComponentPropsWithoutRef<'table'>) => (
		<div className="overflow-x-auto">
			<table {...props} />
		</div>
	),
	img: ({ alt = '', ...props }: ComponentPropsWithoutRef<'img'>) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img alt={alt} loading="lazy" decoding="async" {...props} />
	),
}

// Only slugs returned by getAllPosts() are valid — anything else 404s instead
// of falling back to on-demand SSR. Since getAllPosts() drops drafts in any
// deployed build, a draft's URL can't be reached by guessing it.
export const dynamicParams = false

export function generateStaticParams() {
	return getAllPosts().map(post => ({ slug: post.slug }))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const { post } = getPostBySlug(slug)
	const year = new Date(post.date).getUTCFullYear()

	return pageMetadata({
		title: post.isDraft ? `[Draft] ${post.title}` : post.title,
		description: post.description,
		path: `/blog/${slug}`,
		keywords: post.tags,
		// Belt and braces: drafts are never built in a deployed build, but if
		// one ever is (SHOW_DRAFTS=1 on the host), keep it out of the index.
		noIndex: post.isDraft,
		image: {
			url: `/api/og/${slug}`,
			width: 1200,
			height: 630,
			alt: post.title,
		},
		openGraph: {
			type: 'article',
			publishedTime: post.date,
			...(post.updated && { modifiedTime: post.updated }),
			authors: [siteConfig.url],
			tags: post.tags,
		},
		other: {
			copyright: `© ${year} ${siteConfig.name}. All rights reserved.`,
			license: 'CC BY-NC-ND 4.0 with AI restrictions',
			'license-url': `${siteConfig.url}/license`,
			'ai-training': 'prohibited',
		},
	})
}

export default async function BlogPost({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const { post, content } = getPostBySlug(slug)
	const related = getRelatedPosts(slug)
	const url = `${siteConfig.url}/blog/${slug}`
	const year = new Date(post.date).getUTCFullYear()

	const structuredData = {
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'BlogPosting',
				headline: post.title,
				description: post.description,
				image: {
					'@type': 'ImageObject',
					url: `${siteConfig.url}/api/og/${slug}`,
					width: 1200,
					height: 630,
				},
				author: { '@id': `${siteConfig.url}/#person` },
				publisher: { '@id': `${siteConfig.url}/#person` },
				datePublished: post.date,
				dateModified: post.updated ?? post.date,
				keywords: post.tags.join(', '),
				inLanguage: 'en',
				url,
				mainEntityOfPage: { '@type': 'WebPage', '@id': url },
				isPartOf: { '@id': `${siteConfig.url}/#website` },
				license: `${siteConfig.url}/license`,
				copyrightHolder: { '@id': `${siteConfig.url}/#person` },
				copyrightYear: year,
				copyrightNotice: `© ${siteConfig.name}. All rights reserved. This content may not be used for AI training without explicit written permission.`,
				conditionsOfAccess: `This work is licensed under CC BY-NC-ND 4.0 with additional AI use restrictions. See ${siteConfig.url}/license for full terms.`,
			},
			{
				'@type': 'BreadcrumbList',
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
					{ '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/blog` },
					{ '@type': 'ListItem', position: 3, name: post.title, item: url },
				],
			},
		],
	}

	return (
		<PageShell
			currentPath={`~/blog/${slug}`}
			breadcrumbs={[
				{ label: 'blog', href: '/blog', command: 'cd' },
				{ label: slug, href: `/blog/${slug}` },
			]}
			availability="blog-post">
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<AnimatedBlogPost post={post} related={related}>
				<MDXRemote
					source={content}
					components={mdxComponents}
					options={mdxOptions}
				/>
			</AnimatedBlogPost>
		</PageShell>
	)
}
