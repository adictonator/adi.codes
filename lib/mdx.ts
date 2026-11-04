import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content', 'blog')

/**
 * Drafts (`status: 'draft'` in frontmatter) are visible locally only — both in
 * `next dev` and in a local prod build I run to test on my phone. Vercel/CI set
 * these vars during the build, so anything actually deployed ships published
 * posts only. `SHOW_DRAFTS=1` / `SHOW_DRAFTS=0` overrides either way.
 *
 * This is evaluated at build time, not per request: the blog is fully static
 * (`generateStaticParams` + `dynamicParams = false`), so a draft page simply
 * isn't generated in a deployed build — it can't be reached, indexed, or
 * guessed at, and it never reaches the sitemap or the RSS feed.
 */
export const showDrafts =
	process.env.SHOW_DRAFTS === '1' ||
	(process.env.SHOW_DRAFTS !== '0' &&
		!process.env.VERCEL &&
		!process.env.CI)

export type Post = {
	slug: string
	title: string
	/** 'YYYY-MM-DD' */
	date: string
	/** 'YYYY-MM-DD' — set when a post is meaningfully revised. */
	updated?: string
	description: string
	tags: string[]
	status?: string
	isDraft: boolean
	/** Minutes, derived from the body — never set it in frontmatter. */
	readingTime: number
}

/** 200 wpm, the same rate scripts/seo-score.js uses. */
function readingTime(body: string): number {
	const words = body.trim().split(/\s+/).filter(Boolean).length
	return Math.max(1, Math.round(words / 200))
}

// YAML turns an unquoted `date: 2025-11-03` into a Date object. Accept both
// forms so a missing pair of quotes can't break sorting or rendering.
function toDateString(value: unknown): string | undefined {
	if (value instanceof Date && !isNaN(value.getTime())) {
		return value.toISOString().slice(0, 10)
	}
	if (typeof value === 'string' && value.trim()) return value.trim()
	return undefined
}

function toTags(value: unknown): string[] {
	if (Array.isArray(value)) return value.map(String).filter(Boolean)
	if (typeof value === 'string')
		return value
			.split(',')
			.map(tag => tag.trim())
			.filter(Boolean)
	return []
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/**
 * A published post with a missing title/description/date would ship with
 * broken search and social previews, so it fails the build instead. Drafts
 * only warn — they're allowed to be half-finished.
 */
function validate(post: Post, fileName: string) {
	const problems: string[] = []
	if (!post.title) problems.push('missing `title`')
	if (!post.description) problems.push('missing `description`')
	if (!post.date) problems.push("missing `date` (format: 'YYYY-MM-DD')")
	else if (isNaN(new Date(post.date).getTime()))
		problems.push(`\`date\` is not a valid date: ${post.date}`)
	if (post.updated && isNaN(new Date(post.updated).getTime()))
		problems.push(`\`updated\` is not a valid date: ${post.updated}`)
	if (!SLUG_PATTERN.test(post.slug))
		problems.push(
			'filename must be lowercase words joined by hyphens (it becomes the URL)',
		)

	if (problems.length === 0) return

	const message = `content/blog/${fileName}: ${problems.join('; ')}`
	if (post.isDraft) {
		console.warn(`[blog] draft ${message}`)
	} else {
		throw new Error(`[blog] ${message}`)
	}
}

function postFiles(): string[] {
	if (!fs.existsSync(contentDir)) return []
	return fs.readdirSync(contentDir).filter(file => /\.mdx?$/.test(file))
}

function readPost(fileName: string): { post: Post; content: string } {
	const slug = fileName.replace(/\.mdx?$/, '')
	const source = fs.readFileSync(path.join(contentDir, fileName), 'utf8')
	const { data, content } = matter(source)

	const post: Post = {
		slug,
		title: typeof data.title === 'string' ? data.title.trim() : '',
		date: toDateString(data.date) ?? '',
		updated: toDateString(data.updated),
		description:
			typeof data.description === 'string' ? data.description.trim() : '',
		tags: toTags(data.tags),
		status: typeof data.status === 'string' ? data.status : undefined,
		isDraft: data.status === 'draft',
		readingTime: readingTime(content),
	}

	validate(post, fileName)
	return { post, content }
}

/** Newest first. Drafts are included only where `showDrafts` is on. */
export function getAllPosts(): Post[] {
	return postFiles()
		.map(file => readPost(file).post)
		.filter(post => showDrafts || !post.isDraft)
		.sort(
			(a, b) =>
				(new Date(b.date).getTime() || 0) -
				(new Date(a.date).getTime() || 0),
		)
}

/** Published posts only, regardless of environment — for the feed and sitemap. */
export function getPublishedPosts(): Post[] {
	return getAllPosts().filter(post => !post.isDraft)
}

export function getPostBySlug(slug: string): { post: Post; content: string } {
	// getAllPosts() accepts .md and .mdx, so resolving a slug has to as well.
	const fileName = ['md', 'mdx']
		.map(ext => `${slug}.${ext}`)
		.find(candidate => fs.existsSync(path.join(contentDir, candidate)))

	if (!fileName) {
		throw new Error(`No post file found for slug: ${slug}`)
	}

	const result = readPost(fileName)
	// A draft can be just frontmatter while it's being written; a published
	// post with no body is a mistake worth failing the build over.
	if (!result.content.trim() && !result.post.isDraft) {
		throw new Error(`[blog] content/blog/${fileName}: the post has no body`)
	}
	return result
}

/**
 * Other posts worth reading next: most shared tags first, then newest.
 * Falls back to the latest posts when nothing shares a tag.
 */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
	const all = getAllPosts()
	const current = all.find(post => post.slug === slug)
	const tags = new Set(current?.tags.map(tag => tag.toLowerCase()) ?? [])

	return all
		.filter(post => post.slug !== slug)
		.map(post => ({
			post,
			shared: post.tags.filter(tag => tags.has(tag.toLowerCase())).length,
		}))
		.sort(
			(a, b) =>
				b.shared - a.shared ||
				new Date(b.post.date).getTime() - new Date(a.post.date).getTime(),
		)
		.slice(0, limit)
		.map(({ post }) => post)
}
