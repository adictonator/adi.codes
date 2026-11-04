/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	images: { unoptimized: true },
	// The usual places people (and feed readers) guess for an RSS feed.
	async redirects() {
		return ['/rss', '/rss.xml', '/feed', '/blog/feed.xml', '/blog/rss.xml'].map(
			source => ({ source, destination: '/feed.xml', permanent: true }),
		)
	},
}

module.exports = nextConfig
