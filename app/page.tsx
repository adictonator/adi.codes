import { getAllPosts } from '@/lib/mdx'
import HomeClient from './home-client'

export default function Home() {
	// Fetch blog posts on the server
	const posts = getAllPosts()

	return <HomeClient posts={posts} />
}
