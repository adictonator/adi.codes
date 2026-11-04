'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock, FileText, Rss } from 'lucide-react'
import type { Post } from '@/lib/mdx'
import { formatDate } from '@/lib/format'
import { siteConfig } from '@/lib/site'
import { useMounted } from '@/hooks/use-mounted'

const SIDE_SLOTS = 4

export default function BlogShowcase({ posts = [] }: { posts?: Post[] }) {
	const mounted = useMounted()

	// With nothing published (every post a draft) the section still renders:
	// an "in drafts" card where the latest post goes, placeholders beside it.
	const [featured, ...rest] = posts.slice(0, SIDE_SLOTS + 1)

	return (
		<div className="divide-border grid min-w-0 divide-y divide-dashed 2xl:grid-cols-2 2xl:divide-x 2xl:divide-y-0">
			{/* Latest post */}
			<div className="flex h-full flex-col">
				<div className="border-border bg-secondary flex items-center gap-x-4 border-b border-dashed px-4 py-2">
					<span
						className={`size-1.5 rounded-full ${featured ? 'bg-emerald-500' : 'bg-amber-500'}`}
					/>
					<span className="text-muted text-xs font-light tracking-wider uppercase">
						{featured ? 'Latest note' : 'In drafts'}
					</span>
				</div>

				{!featured ? (
					<div className="flex flex-1 flex-col justify-between gap-y-4">
						<div className="space-y-4 p-4 xl:p-6">
							<p className="text-primary text-xl leading-tight font-normal sm:text-2xl">
								Nothing published yet
							</p>
							<p className="text-muted leading-relaxed">
								The first notes are still in drafts. They show up
								here the day one is actually done.
							</p>
						</div>
						<a
							href={siteConfig.feed}
							className="group/article border-border hover:bg-secondary text-muted flex w-full items-center gap-3 border-t border-dashed p-4 text-xs font-light transition-colors duration-300">
							<Rss className="size-3.5" />
							Get them by RSS
							<ArrowRight className="group-hover/article:text-accent ml-auto size-4 transition-transform duration-300 group-hover/article:translate-x-2" />
						</a>
					</div>
				) : (
				<motion.article
					initial={mounted ? { opacity: 0, x: -20 } : false}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.4 }}
					className="relative flex flex-1 flex-col justify-between gap-y-4">
					<div className="space-y-4 p-4 xl:p-6">
						<h3 className="text-primary text-xl leading-tight font-normal sm:text-2xl">
							<Link
								href={`/blog/${featured.slug}`}
								className="transition-colors duration-300 hover:text-emerald-400">
								{featured.title}
							</Link>
						</h3>
						<p className="text-muted line-clamp-3 leading-relaxed">
							{featured.description}
						</p>
						{featured.tags.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{featured.tags.slice(0, 3).map(tag => (
									<span
										key={tag}
										className="bg-secondary text-muted border-border border border-dashed px-2 py-1 text-xs font-light">
										{tag}
									</span>
								))}
							</div>
						)}
					</div>

					<Link
						href={`/blog/${featured.slug}`}
						className="group/article border-border hover:bg-secondary text-muted flex w-full items-center gap-3 border-t border-dashed p-4 text-xs font-light transition-colors duration-300">
						<span className="flex items-center gap-1.5">
							<Calendar className="size-3.5" />
							{formatDate(featured.date)}
						</span>
						<span className="text-muted-foreground">&bull;</span>
						<span className="flex items-center gap-1.5">
							<Clock className="size-3.5" />
							{featured.readingTime} min read
						</span>
						<ArrowRight className="group-hover/article:text-accent ml-auto size-4 transition-transform duration-300 group-hover/article:translate-x-2" />
					</Link>
				</motion.article>
				)}
			</div>

			{/* Older posts; cells draw right/bottom borders, wrapper clips edges. */}
			<div className="overflow-hidden">
				<div className="-mr-px -mb-px grid grid-cols-1 sm:grid-cols-2">
					{Array.from({ length: SIDE_SLOTS }, (_, index) => {
						const post = rest[index]

						if (!post) {
							// Placeholders only fill out the 2×2 grid; in the single
							// phone column, one is enough.
							return (
								<div
									key={`placeholder-${index}`}
									className={`border-border from-secondary/20 min-h-32 flex-col items-center justify-center border-r border-b border-dashed bg-linear-to-br to-transparent p-4 text-center 2xl:min-h-44 ${index === rest.length ? 'flex' : 'hidden sm:flex'}`}>
									<FileText className="text-muted-foreground/40 mb-3 size-8" />
									<p className="text-muted-foreground text-xs leading-relaxed font-light">
										More notes
										<br />
										<span className="text-muted-foreground/60">
											on the way
										</span>
									</p>
								</div>
							)
						}

						return (
							<motion.div
								key={post.slug}
								initial={mounted ? { opacity: 0, y: 20 } : false}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.1 + index * 0.1 }}
								className="border-border group hover:bg-secondary relative flex flex-col border-r border-b border-dashed transition-colors duration-300 md:min-h-32 lg:min-h-44">
								<Link
									href={`/blog/${post.slug}`}
									className="flex h-full flex-col">
									<div className="border-border flex items-center justify-between border-b border-dashed px-3 py-2">
										<span className="text-muted text-xs font-light tracking-wider uppercase">
											#{index + 2}
										</span>
										<ArrowRight className="text-muted-foreground size-3 opacity-0 transition-opacity group-hover:opacity-100" />
									</div>

									<div className="flex flex-1 flex-col justify-between p-3">
										<div className="space-y-2.5">
											<h3 className="text-primary line-clamp-2 text-base leading-tight font-normal transition-colors duration-300 group-hover:text-emerald-400">
												{post.title}
											</h3>
											<p className="text-muted line-clamp-2 text-xs leading-relaxed">
												{post.description}
											</p>
										</div>

										<div className="text-muted mt-3 flex items-center gap-2 text-xxs font-light">
											<Calendar className="size-3 opacity-60" />
											{formatDate(post.date, 'monthDay')}
											<span>· {post.readingTime} min</span>
										</div>
									</div>
								</Link>
							</motion.div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
