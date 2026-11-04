/** @type {import('next').NextConfig} */
// No `output: 'standalone'`: Vercel builds through Next's adapter hook, and
// since Next 16.3 standalone breaks that build ("ENOENT … next-server.js.nft.json").
// Vercel doesn't need it; only add it back for a self-hosted/Docker deploy.
const nextConfig = {
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
