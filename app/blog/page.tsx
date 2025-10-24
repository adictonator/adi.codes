import { getAllPosts } from '@/lib/mdx'
import BlogList from '@/components/blog/blog-list'

export const metadata = {
	title: 'Blog | Aditya Bhaskar Sharma',
	description: 'Thoughts on design, code, and building meaningful software.',
}

export default function BlogIndex() {
	const posts = getAllPosts()

	return <BlogList posts={posts} />
}
