/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://adi.codes',
	generateRobotsTxt: true,
	sitemapSize: 5000,
	exclude: ['/icon.svg', '/api/*'],
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
			lastmod: new Date().toISOString(),
		}
	},
}
