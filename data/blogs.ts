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

export const blogs: BlogPost[] = [
	{
		title: 'The Future of AI in Web Development',
		readTime: '7 min read',
		status: 'featured',
		tags: ['AI', 'Web Development', 'JavaScript'],
		snippet:
			'Exploring how artificial intelligence is shaping the landscape of web development and what it means for developers.',

		link: '/blog/ai-in-web-development',
		date: '2023-06-15',
	},
]
