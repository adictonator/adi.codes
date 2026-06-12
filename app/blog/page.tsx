import { getAllPosts } from '@/lib/mdx'
import BlogList from '@/components/blog/blog-list'

export const metadata = {
	title: 'Blog — Notes on Product Engineering, iOS & Web',
	description:
		'Writing on product engineering: building iOS apps solo (Swift vs React Native), architecture decisions, performance war stories, and what shipping real products teaches you.',
	alternates: {
		canonical: '/blog',
	},
}

export default function BlogIndex() {
	const posts = getAllPosts()

	return <BlogList posts={posts} />
}
