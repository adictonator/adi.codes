type BlogPost = {
	title: string
	date: string
	readTime: string
	snippet: string
	tags: string[]
	status: 'featured' | 'draft' | 'published'
	link: string
	excerpt?: {
		language: string
		code: string
		filename?: string
	}
}

// For testing, you can set this to empty array to see the empty state
const blogPosts: BlogPost[] = [
	// Commented out to demonstrate empty state
	//	{
	//		title: 'Building a Modern Web Portfolio',
	//		date: '2024-02-15',
	//		readTime: '8 min read',
	//		snippet: 'Exploring the intersection of design and functionality...',
	//		tags: [
	//			'Next.js',
	//			'Design',
	//			'Performance',
	//			'Animation',
	//			'Tailwind CSS',
	//			'Framer Motion',
	//			'TypeScript',
	//		],
	//		status: 'featured',
	//		link: '/blog/modern-portfolio',
	//		excerpt: {
	//			language: 'typescript',
	//			filename: 'portfolio/animations.ts',
	//			code: `const fadeInUp = {
	//  initial: { y: 20, opacity: 0 },
	//  animate: { y: 0, opacity: 1 },
	//  transition: { duration: 0.5 }
	//}`,
	//		},
	//	},
]

export const blogs = [
	{
		title: 'The Future of AI in Web Development',
		snippet:
			'Exploring how artificial intelligence is shaping the landscape of web development and what it means for developers.',
		link: '/blog/ai-in-web-development',
		date: '2023-06-15',
	},
	{
		title: 'Mastering React Hooks: A Comprehensive Guide',
		snippet:
			'A deep dive into React Hooks, covering everything from basic usage to advanced patterns and best practices.',
		link: '/blog/mastering-react-hooks',
		date: '2023-05-22',
	},
	{
		title: 'Building Scalable APIs with GraphQL and Node.js',
		snippet:
			'Learn how to create efficient and flexible APIs using GraphQL and Node.js, with real-world examples and tips.',
		link: '/blog/graphql-nodejs-apis',
		date: '2023-04-10',
	},
	{
		title: 'The Power of Server-Side Rendering in Next.js',
		snippet:
			"Discover how server-side rendering can improve your web application's performance and SEO.",
		link: '/blog/server-side-rendering-nextjs',
		date: '2023-03-05',
	},
]
