import { getAllPosts } from '@/lib/mdx'
import { pageMetadata } from '@/lib/metadata'
import { siteConfig } from '@/lib/site'
import HomeClient from './home-client'

export const metadata = pageMetadata({
	description: siteConfig.description,
	path: '/',
})

export default function Home() {
	return <HomeClient posts={getAllPosts()} />
}
