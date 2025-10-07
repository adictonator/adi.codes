'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, FileText, Frown } from 'lucide-react'

type PostData = {
	slug: string
	title?: string
	date?: string
	description?: string
	tags?: string[]
	[key: string]: any
}

interface BlogShowcaseProps {
	posts?: PostData[]
}

export default function BlogShowcase({ posts = [] }: BlogShowcaseProps) {
	const allPosts = posts.slice(0, 5)

	if (allPosts.length === 0) {
		return (
			<div className="border-border bg-secondary text-muted p-12 text-center font-light">
				<Frown className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
				<p className="text-lg">No articles yet.</p>
				<p className="text-muted-foreground mt-2 text-sm">
					I must be busy with some other side-project. <br />
					Check back soon for new content.
				</p>
			</div>
		)
	}

	// We have at least one post
	const [featuredPost, ...otherPosts] = allPosts

	return (
		<div className="grid md:grid-cols-2">
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.4 }}
				className="group border-border relative flex flex-col border-r border-dashed">
				<Link
					href={`/blog/${featuredPost.slug}`}
					className="flex h-full flex-col">
					{/* Header badge */}
					<div className="border-border bg-secondary flex items-center gap-x-4 border-t-0 border-b border-dashed px-4 py-2">
						<motion.div
							className="size-1.5 rounded-full bg-emerald-500"
							whileHover={{ scale: 1.5 }}
							transition={{
								type: 'spring',
								stiffness: 400,
							}}
						/>

						<span className="text-muted text-xs font-light tracking-wider uppercase">
							Latest Article
						</span>
					</div>

					{/* Content */}
					<div className="hover:bg-secondary flex flex-1 flex-col justify-between p-6 transition-colors duration-300">
						<div className="flex h-full flex-col space-y-4">
							<h3 className="text-primary text-2xl leading-tight font-normal transition-colors duration-300 group-hover:text-[var(--brand-color)]">
								{featuredPost.title}
							</h3>

							{featuredPost.description && (
								<p className="text-muted line-clamp-3 grow leading-relaxed">
									{featuredPost.description}
								</p>
							)}

							{/* Tags */}
							{featuredPost.tags &&
								featuredPost.tags.length > 0 && (
									<div className="flex flex-wrap gap-2">
										{featuredPost.tags
											.slice(0, 3)
											.map(tag => (
												<span
													key={tag}
													className="bg-secondary text-muted border-border border border-dashed px-2 py-1 text-xs font-light">
													{tag}
												</span>
											))}
									</div>
								)}
						</div>

						{/* Footer metadata */}
						<div className="text-muted border-border mt-6 flex items-center gap-3 border-t border-dashed pt-4 text-xs font-light">
							{featuredPost.date && (
								<span className="flex items-center gap-1.5">
									<Calendar className="h-3.5 w-3.5" />
									{new Date(
										featuredPost.date,
									).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
										year: 'numeric',
									})}
								</span>
							)}
							<span className="text-muted-foreground">
								&bull;
							</span>
							<span className="flex items-center gap-1.5">
								<Clock className="h-3.5 w-3.5" />
								{featuredPost.description
									? `${Math.ceil(featuredPost.description.split(' ').length / 200)} min read`
									: '5 min read'}
							</span>

							<span className="text-muted group-hover:text-accent ml-auto h-4 w-4 transition-all duration-300 group-hover:translate-x-2">
								&rarr;
							</span>
						</div>
					</div>
				</Link>
			</motion.div>

			<div className="grid grid-cols-1 sm:grid-cols-2">
				{[...Array(4)].map((_, index) => {
					const post = otherPosts[index]
					const postIndex = index + 1

					if (post) {
						return (
							<motion.div
								key={post.slug}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 + index * 0.1 }}
								className="border-border group hover:bg-secondary relative flex flex-col overflow-hidden border-dashed transition-all duration-300 not-last:not-even:border-r not-last:not-[:nth-child(3)]:border-b lg:min-h-52">
								<Link
									href={`/blog/${post.slug}`}
									className="flex h-full flex-col">
									{/* Animated gradient overlay */}
									<div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										<div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-color)]/5 via-transparent to-transparent" />
									</div>

									{/* Header with index and hover indicator */}
									<div className="border-border group-hover:bg-secondary/50 flex items-center justify-between border-b border-dashed bg-transparent px-3 py-2 transition-colors duration-300">
										<div className="flex items-center gap-2">
											<motion.div
												className="bg-muted-foreground/20 size-1.5 rounded-full"
												whileHover={{ scale: 1.5 }}
												transition={{
													type: 'spring',
													stiffness: 400,
												}}
											/>
											<span className="text-muted text-xs font-light tracking-wider uppercase">
												#{postIndex + 1}
											</span>
										</div>
										<motion.div
											initial={{ x: -5, opacity: 0 }}
											animate={{ x: 0, opacity: 0 }}
											whileHover={{
												x: 0,
												opacity: 1,
											}}
											className="text-muted-foreground">
											<ArrowRight className="h-3 w-3" />
										</motion.div>
									</div>

									{/* Content */}
									<div className="flex flex-1 flex-col justify-between p-4">
										<div className="space-y-3">
											<h4 className="text-primary line-clamp-2 text-sm leading-tight font-normal transition-colors duration-300 group-hover:text-[var(--brand-color)]">
												{post.title}
											</h4>

											<p className="text-muted line-clamp-2 text-xs leading-relaxed">
												{post.description}
											</p>

											{/* Tag preview - show first tag */}
											{post.tags &&
												post.tags.length > 0 && (
													<div className="flex items-center gap-1">
														<span className="bg-secondary/50 text-muted border-border inline-block border border-dashed px-1.5 py-0.5 text-[9px] font-light">
															{post.tags[0]}
														</span>
														{post.tags.length >
															1 && (
															<span className="text-muted-foreground text-[9px]">
																+
																{post.tags
																	.length - 1}
															</span>
														)}
													</div>
												)}
										</div>

										{/* Footer with date */}
										<div className="text-muted border-border mt-3 flex items-center gap-2 border-dashed pt-3 text-[10px] font-light">
											<Calendar className="size-3 opacity-60" />
											{post.date &&
												new Date(
													post.date,
												).toLocaleDateString('en-US', {
													month: 'short',
													day: '2-digit',
												})}
											<span className="text-muted-foreground group-hover:text-accent ml-auto transition-all duration-300 group-hover:translate-x-1">
												&rarr;
											</span>
										</div>
									</div>
								</Link>
							</motion.div>
						)
					}

					// Otherwise, show a placeholder that hints at "more coming"
					return (
						<motion.div
							key={`placeholder-${index}`}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 + index * 0.1 }}
							className="border-border group from-secondary/20 relative flex flex-col content-center justify-center overflow-hidden border-dashed bg-gradient-to-br to-transparent not-last:border-r lg:min-h-52">
							{/* Animated dots pattern */}
							<div className="absolute inset-0 size-full opacity-20">
								<div
									className="h-full w-full"
									style={{
										backgroundImage:
											'radial-gradient(circle, currentColor 1px, transparent 1px)',
										backgroundSize: '20px 20px',
									}}
								/>
							</div>

							<div className="relative flex flex-col items-center justify-center self-center p-4 text-center backdrop-blur-[1px]">
								<FileText className="text-muted-foreground/40 mb-3 size-8" />
								<p className="text-muted-foreground text-xs leading-relaxed font-light">
									More content
									<br />
									<span className="text-muted-foreground/60">
										coming soon
									</span>
								</p>
								<div className="bg-muted-foreground/10 mt-2 h-px w-8" />
							</div>
						</motion.div>
					)
				})}
			</div>
		</div>
	)
}
