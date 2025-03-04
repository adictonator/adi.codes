'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRef, useEffect, useState } from 'react'
import {
	Book,
	Terminal,
	ArrowRight,
	ChevronRight,
	MousePointer2,
} from 'lucide-react'

import NoBlogs from './blog/no-blogs'
import BlogItem from './blog/blog-item'
import { blogs } from '@/data/blogs'

export default function BlogShowcase() {
	const scrollContainerRef = useRef<HTMLDivElement>(null)
	const [scrollPosition, setScrollPosition] = useState(0)
	const [maxScroll, setMaxScroll] = useState(0)
	const [isScrollable, setIsScrollable] = useState(false)

	// Get only top 3 articles (or fewer if less are available)
	const featuredBlogs = blogs.slice(0, 3)

	// Render empty state if no blog posts
	if (blogs.length === 0) {
		return <NoBlogs />
	}

	// Update scroll metrics when container dimensions change
	useEffect(() => {
		const updateScrollMetrics = () => {
			if (scrollContainerRef.current) {
				const { scrollWidth, clientWidth, scrollLeft } =
					scrollContainerRef.current
				setMaxScroll(scrollWidth - clientWidth)
				setScrollPosition(scrollLeft)
				setIsScrollable(scrollWidth > clientWidth)
			}
		}

		// Initial update
		updateScrollMetrics()

		// Update on resize
		window.addEventListener('resize', updateScrollMetrics)

		// Track scroll position
		const scrollContainer = scrollContainerRef.current
		const handleScroll = () => {
			if (scrollContainer) {
				setScrollPosition(scrollContainer.scrollLeft)
			}
		}

		if (scrollContainer) {
			scrollContainer.addEventListener('scroll', handleScroll)
		}

		return () => {
			window.removeEventListener('resize', updateScrollMetrics)
			if (scrollContainer) {
				scrollContainer.removeEventListener('scroll', handleScroll)
			}
		}
	}, [])

	// Scroll to next article
	const scrollNext = () => {
		if (scrollContainerRef.current) {
			const articleWidth =
				scrollContainerRef.current.scrollWidth / featuredBlogs.length
			scrollContainerRef.current.scrollBy({
				left: articleWidth,
				behavior: 'smooth',
			})
		}
	}

	return (
		<div className="space-y-6">
			{/* Header with Terminal style */}
			<div className="flex items-center justify-between border-b border-dashed border-neutral-800 pb-4">
				<div className="flex items-center gap-2">
					<Terminal className="h-4 w-4 text-emerald-500" />
					<h2 className="font-mono text-sm text-neutral-300">
						recent.articles{' '}
						<span className="text-emerald-500">
							({featuredBlogs.length})
						</span>
					</h2>
				</div>

				{/* Only show scroll indicator if content is scrollable */}
				{isScrollable && (
					<div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
						<motion.div
							animate={{
								opacity: [0.4, 1, 0.4],
								x: [0, 5, 0],
							}}
							transition={{
								duration: 2,
								ease: 'easeInOut',
								repeat: Infinity,
								repeatDelay: 1,
							}}
							className="flex items-center gap-1">
							<MousePointer2 className="h-3 w-3" />
							<span>scroll</span>
							<ChevronRight className="h-3 w-3" />
						</motion.div>

						<div className="h-1 w-16 rounded-full bg-neutral-800">
							<motion.div
								className="h-1 rounded-full bg-blue-500"
								style={{
									width: `${(scrollPosition / maxScroll) * 100}%`,
									minWidth: '10%',
								}}
							/>
						</div>
					</div>
				)}
			</div>

			{/* Terminal-inspired container */}
			<div className="border border-dashed border-neutral-800 bg-neutral-950">
				{/* Terminal Tab */}
				<div className="flex items-center gap-1.5 border-b border-neutral-800 bg-neutral-900/80 px-3 py-1.5">
					<span className="h-2.5 w-2.5 rounded-full bg-red-500/70"></span>
					<span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70"></span>
					<span className="h-2.5 w-2.5 rounded-full bg-green-500/70"></span>
					<span className="ml-3 font-mono text-xs text-neutral-500">
						blog-recent.sh
					</span>
				</div>

				{/* Horizontal scrolling container with visible overflow */}
				<div
					ref={scrollContainerRef}
					className="scrollbar-thin scrollbar-track-neutral-900 scrollbar-thumb-neutral-700 flex overflow-x-auto"
					style={{ scrollbarWidth: 'thin' }} // Firefox support
				>
					{featuredBlogs.map((blog, index) => (
						<motion.div
							key={blog.title}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
							className="min-w-full shrink-0 border-r border-dashed border-neutral-800 last:border-r-0 sm:min-w-[80%] md:min-w-[60%] lg:min-w-[500px]">
							<Link href={blog.link} className="block h-full">
								<BlogItem blog={blog} />
							</Link>
						</motion.div>
					))}

					{/* Peek element to indicate more content */}
					{isScrollable && scrollPosition < maxScroll - 10 && (
						<div
							className="absolute top-0 right-0 bottom-0 flex w-16 cursor-pointer items-center justify-center bg-gradient-to-r from-transparent to-neutral-950/90"
							onClick={scrollNext}>
							<motion.div
								animate={{
									x: [0, 5, 0],
								}}
								transition={{
									duration: 1.5,
									ease: 'easeInOut',
									repeat: Infinity,
									repeatDelay: 0.5,
								}}>
								<ArrowRight className="h-5 w-5 text-neutral-400" />
							</motion.div>
						</div>
					)}
				</div>

				{/* Mobile prompt - only show on smaller screens */}
				<div className="flex items-center justify-center border-t border-neutral-800 bg-neutral-900/30 py-2 text-xs text-neutral-500 md:hidden">
					<span>swipe to see more</span>
					<ChevronRight className="h-3 w-3" />
				</div>
			</div>

			{/* View all blogs button */}
			<div className="flex justify-center pt-2">
				<Link
					href="/blog"
					className="group flex items-center gap-2 border border-dashed border-neutral-800 bg-neutral-900/30 px-6 py-3 text-sm text-neutral-400 transition-colors hover:border-neutral-700 hover:bg-neutral-900/60 hover:text-neutral-300">
					<Book className="h-4 w-4" />
					<span>View All Articles</span>
					<motion.div
						className="inline-flex"
						whileHover={{ x: 2, y: -2 }}>
						<ArrowRight className="h-3.5 w-3.5" />
					</motion.div>
				</Link>
			</div>

			{/* Add CSS for custom scrollbar in Webkit browsers */}
			<style jsx global>{`
				/* Custom scrollbar for Webkit browsers */
				.scrollbar-thin::-webkit-scrollbar {
					height: 4px;
				}

				.scrollbar-thin::-webkit-scrollbar-track {
					background: #171717;
				}

				.scrollbar-thin::-webkit-scrollbar-thumb {
					background: #404040;
					border-radius: 4px;
				}

				.scrollbar-thin::-webkit-scrollbar-thumb:hover {
					background: #525252;
				}
			`}</style>
		</div>
	)
}
