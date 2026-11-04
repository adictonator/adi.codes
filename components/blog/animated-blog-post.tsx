'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect, useMemo, useRef } from 'react'
import AuthorCard from './author-card'
import CopyrightNotice from './copyright-notice'
import TagList from './tag-list'
import type { Post } from '@/lib/mdx'
import { formatDate } from '@/lib/format'
import { isGaEnabled, trackOutboundClick, trackScrollDepth } from '@/lib/ga'
import { useMounted } from '@/hooks/use-mounted'

interface AnimatedBlogPostProps {
	post: Post
	related: Post[]
	children: ReactNode
}

export default function AnimatedBlogPost({
	post,
	related,
	children,
}: AnimatedBlogPostProps) {
	const mounted = useMounted()
	const { slug, title, date, updated, tags, readingTime } = post
	const articleRef = useRef<HTMLElement>(null)

	useEffect(() => {
		if (!isGaEnabled) return

		const node = articleRef.current
		if (!node) return

		const handleClick = (event: MouseEvent) => {
			const target = event.target as HTMLElement | null
			if (!target) return
			const anchor = target.closest('a')
			if (!anchor) return

			const href = anchor.getAttribute('href')
			if (!href) return

			if (href.startsWith('#')) return

			let url: string
			try {
				url = new URL(href, window.location.href).href
			} catch (error) {
				return
			}

			if (url.startsWith(window.location.origin)) return

			const text = anchor.textContent?.trim() || 'external link'
			trackOutboundClick({
				url,
				text,
				slug,
				location: window.location.pathname,
			})
		}

		node.addEventListener('click', handleClick)
		node.addEventListener('auxclick', handleClick)

		return () => {
			node.removeEventListener('click', handleClick)
			node.removeEventListener('auxclick', handleClick)
		}
	}, [slug])

	const scrollThresholds = useMemo(() => [25, 50, 75, 90], [])

	useEffect(() => {
		if (!isGaEnabled) return

		const tracked = new Set<number>()
		let ticking = false

		const handleScroll = () => {
			if (ticking) return
			ticking = true

			requestAnimationFrame(() => {
				const scrollElement = document.documentElement
				const maxScroll =
					scrollElement.scrollHeight - window.innerHeight
				if (maxScroll <= 0) {
					scrollThresholds.forEach(percent => {
						if (tracked.has(percent)) return
						tracked.add(percent)
						trackScrollDepth({ slug, percent })
					})
					ticking = false
					return
				}

				const currentScroll = window.scrollY
				const progress = Math.min(
					100,
					Math.round((currentScroll / maxScroll) * 100),
				)

				scrollThresholds.forEach(percent => {
					if (progress < percent || tracked.has(percent)) return
					tracked.add(percent)
					trackScrollDepth({ slug, percent })
				})

				ticking = false
			})
		}

		window.addEventListener('scroll', handleScroll, { passive: true })
		handleScroll()

		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [slug, scrollThresholds])

	return (
		<article ref={articleRef}>
			<header className="mb-8 space-y-6">
				<div className="space-y-3">
					<div className="font-mono text-xs break-all">
						<span className="text-emerald-500">&rarr;</span>
						<span className="text-neutral-500"> cat</span>
						<span className="text-blue-400"> {slug}.md</span>
						{post.isDraft && (
							<span className="ml-2 border border-amber-500/40 bg-amber-500/10 px-1.5 py-0.5 text-xxs tracking-wide text-amber-400 uppercase">
								draft
							</span>
						)}
					</div>
					<motion.h1
						initial={mounted ? { opacity: 0, y: 20 } : false}
						animate={{ opacity: 1, y: 0 }}
						className="text-3xl font-light tracking-tight text-balance text-neutral-200 sm:text-4xl xl:text-5xl xl:leading-tight">
						{title}
					</motion.h1>
				</div>

				<div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-dashed border-neutral-800 py-4 font-mono text-xs">
					<span className="flex items-center gap-2">
						<span className="text-blue-400">--date</span>
						<time
							dateTime={date}
							className="text-neutral-400 tabular-nums">
							{formatDate(date, 'long')}
						</time>
					</span>
					{updated && (
						<span className="flex items-center gap-2">
							<span className="text-blue-400">--updated</span>
							<time
								dateTime={updated}
								className="text-neutral-400 tabular-nums">
								{formatDate(updated, 'long')}
							</time>
						</span>
					)}
					<span className="flex items-center gap-2">
						<span className="text-blue-400">--time</span>
						<span className="text-neutral-400">
							{readingTime} min read
						</span>
					</span>
				</div>

				{tags.length > 0 && <TagList tags={tags} />}
			</header>

			<motion.div
				initial={mounted ? { opacity: 0 } : false}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="prose prose-site prose-p:text-lg prose-p:leading-relaxed prose-headings:font-light prose-headings:tracking-tight prose-h2:mt-16 prose-h2:border-b prose-h2:border-dashed prose-h2:border-neutral-800 prose-h2:pb-4 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h3:mt-8 prose-h3:text-xl sm:prose-h3:text-2xl prose-code:font-mono prose-pre:my-0 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-2 prose-blockquote:font-normal prose-blockquote:not-italic prose-ul:my-8 prose-li:my-2 prose-hr:border-dashed prose-img:border prose-img:border-dashed prose-img:border-neutral-800 max-w-none">
				{children}
			</motion.div>

			<footer className="mt-12 space-y-6 border-t border-dashed border-neutral-800 pt-8 font-mono">
				<div className="text-xs">
					<span className="text-emerald-500">&rarr;</span>
					<span className="text-neutral-500"> get</span>
					<span className="text-blue-400"> author-info</span>
				</div>

				<AuthorCard related={related} />

				<CopyrightNotice
					year={new Date(date).getUTCFullYear()}
					minimal
				/>
			</footer>
		</article>
	)
}
