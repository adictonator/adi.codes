const fs = require('fs')
const nodePath = require('path')
const matter = require('gray-matter')

const posts = (() => {
	const dir = nodePath.join(process.cwd(), 'content', 'blog')
	if (!fs.existsSync(dir)) return []

	return fs
		.readdirSync(dir)
		.filter(file => /\.mdx?$/.test(file))
		.map(file => {
			const { data } = matter(
				fs.readFileSync(nodePath.join(dir, file), 'utf8'),
			)
			return {
				route: `/blog/${file.replace(/\.mdx?$/, '')}`,
				status: data.status,
				lastmod: data.updated || data.date,
			}
		})
})()

// Real per-post lastmod, so crawlers aren't told every page changed on every
// build. Falls back to the build time for non-blog routes.
const postDates = Object.fromEntries(
	posts
		.filter(post => post.lastmod)
		.map(post => [post.route, new Date(post.lastmod).toISOString()]),
)

// A local build renders drafts (see lib/mdx.ts) and public/sitemap-0.xml is
// committed — so exclude drafts here too, or a local build would stage draft
// URLs into the repo's sitemap.
const draftRoutes = posts
	.filter(post => post.status === 'draft')
	.map(post => post.route)

// /blog is noindex while every post is a draft (see app/blog/page.tsx), so it
// shouldn't be listed either. It comes back on the first build with a post.
const hasPublishedPosts = posts.some(post => post.status !== 'draft')

/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://adi.codes',
	generateRobotsTxt: true,
	sitemapSize: 5000,
	exclude: [
		'/icon.svg',
		'/api/*',
		'/feed.xml',
		'/404',
		'/_not-found',
		...draftRoutes,
		...(hasPublishedPosts ? [] : ['/blog']),
	],
	changefreq: 'weekly',
	priority: 0.7,
	transform: async (config, path) => {
		// Weight the pages recruiters should land on.
		const priorities = {
			'/': 1.0,
			'/projects': 0.9,
			'/blog': 0.8,
			'/graveyard': 0.5,
			'/license': 0.1,
		}
		return {
			loc: path,
			changefreq: path.startsWith('/blog/')
				? 'monthly'
				: config.changefreq,
			priority:
				priorities[path] ??
				(path.startsWith('/blog/') ? 0.7 : config.priority),
			lastmod: postDates[path] ?? new Date().toISOString(),
		}
	},
}
