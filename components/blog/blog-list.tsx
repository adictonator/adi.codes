'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
	FileText,
	Calendar,
	Clock,
	Tag,
	ArrowRight,
	Folder,
	Terminal,
} from 'lucide-react'
import { useState } from 'react'
import TerminalNav from '@/components/terminal-nav'
import FloatingQuickNav from '@/components/floating-quick-nav'
import { BackgroundEffect } from '../ui/background-effect'

type PostData = {
	slug: string
	title?: string
	date?: string
	description?: string
	tags?: string[]
	[key: string]: any
}

interface BlogListProps {
	posts: PostData[]
}

export default function BlogList({ posts }: BlogListProps) {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

	// Calculate reading time based on description length (rough estimate)
	const estimateReadTime = (description?: string) => {
		if (!description) return '5 min read'
		const words = description.split(' ').length
		const minutes = Math.ceil(words / 200)
		return `${minutes} min read`
	}

	return (
		<div className="mx-auto min-h-screen max-w-5xl bg-neutral-950">
			{/* Terminal Navigation */}
			<TerminalNav
				currentPath="~/blog"
				breadcrumbs={[{ label: 'blog', href: '/blog', command: 'cd' }]}
			/>

			{/* Floating Quick Navigation */}
			<FloatingQuickNav />

			<div className="p-6 md:p-8 lg:p-12">
				{/* Header Section */}
				<header className="mb-12">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="space-y-4">
						<div className="flex items-center gap-3">
							<Folder className="h-8 w-8 text-emerald-500/80" />
							<h1 className="text-4xl font-light tracking-tight text-neutral-200 md:text-5xl">
								Blog Archive
							</h1>
						</div>
						<p className="font-mono text-sm text-neutral-400">
							<span className="text-blue-500/80">total</span>{' '}
							{posts.length}{' '}
							{posts.length === 1 ? 'entry' : 'entries'}
						</p>
					</motion.div>
				</header>

				{/* Blog Posts List */}
				{posts.length === 0 ? (
					<div className="rounded-lg border border-dashed border-neutral-800 bg-neutral-900/30 p-8 text-center">
						<Terminal className="mx-auto mb-4 h-12 w-12 text-neutral-700" />
						<p className="font-mono text-sm text-neutral-500">
							<span className="text-red-500">ERROR:</span> No
							articles found
						</p>
						<p className="mt-2 font-mono text-xs text-neutral-600">
							~/blog/articles: directory is empty
						</p>
					</div>
				) : (
					<div className="space-y-4">
						{posts.map((post, index) => {
							const readTime = estimateReadTime(post.description)
							const isHovered = hoveredIndex === index

							return (
								<motion.div
									key={post.slug}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.05 }}
									onMouseEnter={() => setHoveredIndex(index)}
									onMouseLeave={() => setHoveredIndex(null)}>
									<Link href={`/blog/${post.slug}`}>
										<div className="group relative cursor-pointer rounded-lg border border-dashed border-neutral-800 bg-neutral-900/30 transition-all hover:border-neutral-700 hover:bg-neutral-900/50">
											{/* File Header Bar */}
											<div className="flex items-center justify-between border-b border-dashed border-neutral-800 bg-neutral-900/50 px-4 py-2">
												<div className="flex items-center gap-2 font-mono text-xs">
													<FileText className="h-3.5 w-3.5 text-blue-400" />
													<span className="text-neutral-400">
														{post.slug}.md
													</span>
												</div>
												<div className="flex items-center gap-2">
													<motion.span
														animate={{
															opacity: isHovered
																? 1
																: 0,
														}}
														className="font-mono text-xs text-emerald-500">
														cat
													</motion.span>
													<ArrowRight
														className={`h-3.5 w-3.5 text-neutral-600 transition-all group-hover:translate-x-1 group-hover:text-emerald-500`}
													/>
												</div>
											</div>

											{/* Content */}
											<div className="p-6">
												<h2 className="mb-3 text-2xl font-light tracking-tight text-neutral-200 transition-colors group-hover:text-emerald-400">
													{post.title}
												</h2>

												{post.description && (
													<p className="mb-4 text-sm leading-relaxed text-neutral-400">
														{post.description}
													</p>
												)}

												{/* Metadata */}
												<div className="flex flex-wrap items-center gap-4 border-t border-dashed border-neutral-800 pt-4 font-mono text-xs">
													{post.date && (
														<div className="flex items-center gap-2 text-neutral-500">
															<Calendar className="h-3.5 w-3.5" />
															<time
																dateTime={
																	post.date
																}>
																{new Date(
																	post.date,
																).toLocaleDateString(
																	'en-US',
																	{
																		year: 'numeric',
																		month: 'short',
																		day: 'numeric',
																	},
																)}
															</time>
														</div>
													)}
													<div className="flex items-center gap-2 text-neutral-500">
														<Clock className="h-3.5 w-3.5" />
														<span>{readTime}</span>
													</div>
													{post.tags &&
														post.tags.length >
															0 && (
															<div className="flex items-center gap-2">
																<Tag className="h-3.5 w-3.5 text-neutral-600" />
																<div className="flex flex-wrap gap-2">
																	{post.tags
																		.slice(
																			0,
																			3,
																		)
																		.map(
																			tag => (
																				<span
																					key={
																						tag
																					}
																					className="rounded border border-neutral-800 bg-neutral-900/50 px-2 py-0.5 text-neutral-500 transition-colors group-hover:border-neutral-700 group-hover:text-neutral-400">
																					{
																						tag
																					}
																				</span>
																			),
																		)}
																	{post.tags
																		.length >
																		3 && (
																		<span className="text-neutral-600">
																			+
																			{post
																				.tags
																				.length -
																				3}{' '}
																			more
																		</span>
																	)}
																</div>
															</div>
														)}
												</div>
											</div>
										</div>
									</Link>
								</motion.div>
							)
						})}
					</div>
				)}

				{/* Footer Stats */}
				<footer className="mt-12 border-t border-dashed border-neutral-800 pt-8">
					<div className="font-mono text-xs text-neutral-500">
						<div className="mb-2">
							<span className="text-emerald-500">$</span> find ./
							-name "*.md" | wc -l
						</div>
						<div className="text-neutral-600">
							<span className="text-blue-400">
								{posts.length}
							</span>{' '}
							{posts.length === 1 ? 'article' : 'articles'} found
						</div>
					</div>
				</footer>
			</div>

			<BackgroundEffect variant="grid" intensity={0.4} opacity={0.7} />
		</div>
	)
}
