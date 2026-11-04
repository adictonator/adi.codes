import { getAllPosts } from '@/lib/mdx'
import { pageMetadata } from '@/lib/metadata'
import BlogList from '@/components/blog/blog-list'
import PageShell from '@/components/page-shell'

export function generateMetadata() {
	return pageMetadata({
		title: 'Notes on Product Engineering, iOS & Web',
		description:
			'Notes from shipping iOS, React Native and web products solo: the decisions, the reversals, and the bits I got wrong first. By Aditya Bhaskar Sharma.',
		path: '/blog',
		// An empty archive is a thin page; keep it out of search until the
		// first post ships. It indexes itself again on the next build.
		noIndex: getAllPosts().length === 0,
	})
}

export default function BlogIndex() {
	return (
		<PageShell
			currentPath="~/blog"
			breadcrumbs={[{ label: 'blog', href: '/blog', command: 'cd' }]}
			availability="blog-index">
			<BlogList posts={getAllPosts()} />
		</PageShell>
	)
}
