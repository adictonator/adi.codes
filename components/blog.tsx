import Link from 'next/link'

const blogPosts = [
	{
		title: 'The Future of AI in Web Development',
		snippet:
			'Exploring how artificial intelligence is shaping the landscape of web development and what it means for developers.',
		link: '/blog/ai-in-web-development',
	},
	{
		title: 'Mastering React Hooks: A Comprehensive Guide',
		snippet:
			'A deep dive into React Hooks, covering everything from basic usage to advanced patterns and best practices.',
		link: '/blog/mastering-react-hooks',
	},
	{
		title: 'Building Scalable APIs with GraphQL and Node.js',
		snippet:
			'Learn how to create efficient and flexible APIs using GraphQL and Node.js, with real-world examples and tips.',
		link: '/blog/graphql-nodejs-apis',
	},
]

const Blog = () => {
	return (
		<section id="blogs" className="bg-secondary py-20">
			<h2 className="mb-8 text-center text-3xl font-bold text-primary">
				Latest Blog Posts
			</h2>
			<div className="mx-auto max-w-3xl">
				{blogPosts.map((post, index) => (
					<div
						key={index}
						className="mb-8 rounded-lg bg-white p-6 shadow-md">
						<h3 className="mb-2 text-xl font-semibold text-primary">
							{post.title}
						</h3>
						<p className="mb-4 text-gray-600">{post.snippet}</p>
						<Link
							href={post.link}
							className="text-accent transition-colors hover:text-accent/90">
							Read More &rarr;
						</Link>
					</div>
				))}
			</div>
			<div className="mt-8 text-center">
				<Link
					href="/blog"
					className="rounded-full bg-accent px-6 py-3 text-lg text-white transition-colors hover:bg-accent/90">
					View All Posts
				</Link>
			</div>
		</section>
	)
}

export default Blog
