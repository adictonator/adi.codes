'use client'

import { useRef } from 'react'
import Link from 'next/link'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const blogPosts = [
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

const BlogShowcase = () => {
	const scrollRef = useRef<HTMLDivElement>(null)

	const scroll = (direction: 'left' | 'right') => {
		if (!scrollRef.current) return
		const firstCard = scrollRef.current.firstElementChild as HTMLElement
		// Include the gap (24px = 6 * 4 from gap-6)
		const scrollAmount = firstCard.offsetWidth + 24
		scrollRef.current.scrollBy({
			left: direction === 'left' ? -scrollAmount : scrollAmount,
			behavior: 'smooth',
		})
	}

	return (
		<div className="relative mx-auto w-full px-4">
			<div
				ref={scrollRef}
				className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth">
				{blogPosts.map((post, index) => (
					<Card key={index} className="shrink-0 snap-start">
						<CardHeader>
							<CardTitle>{post.title}</CardTitle>
							<CardDescription>{post.date}</CardDescription>
						</CardHeader>
						<CardContent>
							<p>{post.snippet}</p>
						</CardContent>
						<CardFooter>
							<Button
								asChild
								variant={index === 0 ? 'default' : 'outline'}>
								<Link href={post.link}>Read More</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			<div className="mt-4 flex justify-center gap-4">
				<Button onClick={() => scroll('left')} variant="outline">
					Prev
				</Button>
				<Button onClick={() => scroll('right')} variant="outline">
					Next
				</Button>
			</div>
		</div>
	)
}

export default BlogShowcase
