'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, Calendar, Clock, ArrowRight, Rss } from 'lucide-react'
import type { Post } from '@/lib/mdx'
import { formatDate } from '@/lib/format'
import { siteConfig } from '@/lib/site'
import { useMounted } from '@/hooks/use-mounted'

export default function BlogList({ posts }: { posts: Post[] }) {
	const mounted = useMounted()

	return (
		<>
			<header className="mb-10 space-y-4 border-b border-dashed border-neutral-800 pb-8">
				<motion.div
					initial={mounted ? { opacity: 0, y: 20 } : false}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-4">
					<div className="flex items-center gap-3">
						<FileText className="size-6 text-emerald-500" />
						<h1 className="font-mono text-2xl text-neutral-200 sm:text-3xl">
							notes/
						</h1>
					</div>
					<p className="max-w-2xl font-mono text-sm leading-relaxed text-neutral-500">
						Notes from actually shipping things — the decisions, the
						reversals, and the bits I got wrong first. Mostly iOS,
						React Native, and the occasional post-mortem on a project
						I killed.
					</p>
					<div className="flex flex-wrap items-center gap-4 font-mono text-xs text-neutral-600">
						<span className="flex items-center gap-2">
							<span className="size-1.5 rounded-full bg-emerald-500" />
							{posts.length} {posts.length === 1 ? 'entry' : 'entries'}
						</span>
						<span aria-hidden="true">•</span>
						<a
							href={siteConfig.feed}
							className="flex items-center gap-1.5 transition-colors hover:text-emerald-400">
							<Rss className="size-3" />
							rss feed
						</a>
					</div>
				</motion.div>
			</header>

			{posts.length === 0 ? (
				<div className="border border-dashed border-neutral-800 bg-neutral-900/30 p-6 font-mono text-sm sm:p-8">
					<p className="text-neutral-400">
						<span className="text-emerald-500">$</span> ls notes/
					</p>
					<p className="mt-2 text-neutral-500">
						Nothing published yet — the first posts are still in
						drafts. Grab the{' '}
						<a
							href={siteConfig.feed}
							className="border-b border-dashed border-neutral-700 text-neutral-300 hover:text-emerald-400">
							RSS feed
						</a>{' '}
						and they&apos;ll show up when they ship.
					</p>
				</div>
			) : (
				<ul className="space-y-4">
					{posts.map((post, index) => (
						<motion.li
							key={post.slug}
							initial={mounted ? { opacity: 0, y: 20 } : false}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}>
							<Link
								href={`/blog/${post.slug}`}
								className="group block border border-dashed border-neutral-800 bg-neutral-900/30 transition-colors hover:border-neutral-700 hover:bg-neutral-900/50">
								{/* File header bar */}
								<div className="flex items-center justify-between gap-3 border-b border-dashed border-neutral-800 bg-neutral-900/50 px-4 py-2 font-mono text-xs">
									<span className="flex min-w-0 items-center gap-2">
										<FileText className="size-3.5 shrink-0 text-blue-400" />
										<span className="truncate text-neutral-400">
											{post.slug}.md
										</span>
										{post.isDraft && (
											<span className="shrink-0 border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 text-xxs tracking-wide text-amber-400 uppercase">
												draft
											</span>
										)}
									</span>
									<span className="flex shrink-0 items-center gap-2">
										<span className="text-emerald-500 opacity-0 transition-opacity group-hover:opacity-100">
											cat
										</span>
										<ArrowRight className="size-3.5 text-neutral-600 transition-transform group-hover:translate-x-1 group-hover:text-emerald-500" />
									</span>
								</div>

								<div className="p-4 sm:p-6">
									<h2 className="mb-3 text-xl font-light tracking-tight text-neutral-200 transition-colors group-hover:text-emerald-400 sm:text-2xl">
										{post.title}
									</h2>
									<p className="text-sm leading-relaxed text-neutral-400">
										{post.description}
									</p>
								</div>

								<div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-dashed border-neutral-800 px-4 py-2.5 font-mono text-xs text-neutral-500">
									<span className="flex items-center gap-4">
										<span className="flex items-center gap-2">
											<Calendar className="size-3.5" />
											<time dateTime={post.date}>
												{formatDate(post.date)}
											</time>
										</span>
										<span className="flex items-center gap-2">
											<Clock className="size-3.5" />
											{post.readingTime} min read
										</span>
									</span>
									{post.tags.length > 0 && (
										<span className="flex flex-wrap gap-2">
											{post.tags.slice(0, 3).map(tag => (
												<span
													key={tag}
													className="border border-neutral-800 bg-neutral-900/50 px-2 py-0.5 transition-colors group-hover:border-neutral-700 group-hover:text-neutral-400">
													{tag}
												</span>
											))}
											{post.tags.length > 3 && (
												<span className="py-0.5 text-neutral-600">
													+{post.tags.length - 3} more
												</span>
											)}
										</span>
									)}
								</div>
							</Link>
						</motion.li>
					))}
				</ul>
			)}
		</>
	)
}
