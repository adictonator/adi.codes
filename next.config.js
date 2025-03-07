/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	reactStrictMode: true,
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: { unoptimized: true },
}

module.exports = nextConfig
