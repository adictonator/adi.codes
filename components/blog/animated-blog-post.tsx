'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect, useMemo, useRef } from 'react'
import { Github } from 'lucide-react'
import TerminalNav from '@/components/terminal-nav'
import FloatingQuickNav from '@/components/floating-quick-nav'
import { BackgroundEffect } from '../ui/background-effect'
import AuthorCard from './author-card'
import CopyrightNotice from './copyright-notice'
import Threads from '../social-icons/threads'
import Twitter from '../social-icons/twitter'
import LinkedIn from '../social-icons/linked-in'
import { isGaEnabled, trackOutboundClick, trackScrollDepth } from '@/lib/ga'

const authorInfo = {
	name: 'Aditya',
	role: 'Full Stack Developer',
	bio: 'Building stuff with TypeScript, React, and Node.js. Open source enthusiast.',
	avatar: '/assets/images/me.png',
	socials: [
		{
			icon: Threads,
			url: 'https://threads.com/adictonator',
			username: 'adictonator',
		},
		{
			icon: Twitter,
			url: 'https://twitter.com/adictonator',
			username: 'adictonator',
		},
		{
			icon: Github,
			url: 'https://github.com/adictonator',
			username: 'adictonator',
		},
		{
			icon: LinkedIn,
			url: 'https://linkedin.com/in/-abs-',
			username: 'in/-abs-',
		},
		//{
		//	icon: Mail,
		//	url: 'mailto:you@example.com',
		//	username: 'you@example.com',
		//},
	],
}

interface AnimatedBlogPostProps {
	slug: string
	title: string
	date: string
	tags?: string[]
	children: ReactNode
}

export default function AnimatedBlogPost({
	slug,
	title,
	date,
	tags,
	children,
}: AnimatedBlogPostProps) {
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
		<article
			ref={articleRef}
			className="border-border/50 mx-auto min-h-screen border-x border-dashed bg-neutral-950 md:max-w-4xl">
			<TerminalNav
				currentPath={`~/blog/${slug}`}
				breadcrumbs={[
					{ label: 'blog', href: '/blog', command: 'cd' },
					{ label: slug, href: `/blog/${slug}` },
				]}
			/>

			<div className="relative p-6 md:p-8">
				<header className="mb-6 md:mb-8">
					<div className="space-y-6">
						<div className="space-y-2">
							<div className="font-mono text-xs">
								<span className="text-terminal-green">
									&rarr;
								</span>
								<span className="text-neutral-500"> cat</span>
								<span className="text-blue-400">
									{' '}
									{slug}.md
								</span>
							</div>
							<motion.h1
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								className="text-4xl font-light tracking-tight text-neutral-200 xl:text-5xl xl:leading-tight">
								{title}
							</motion.h1>
						</div>

						<div className="flex flex-wrap items-center gap-4 border-y border-dashed border-neutral-800 py-4 text-sm">
							<span className="flex items-center gap-2 font-mono text-xs">
								<span className="text-blue-500/80">--date</span>
								<time
									dateTime={date}
									className="text-neutral-400 tabular-nums">
									{new Date(date).toLocaleDateString(
										'en-US',
										{
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										},
									)}
								</time>
							</span>
							<span className="flex items-center gap-2 font-mono text-xs">
								<span className="text-accent/80">--time</span>
								<span className="text-neutral-400">
									8 min read
								</span>
							</span>
						</div>
					</div>
				</header>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
					className="prose prose-invert prose-p:text-lg prose-p:leading-relaxed prose-p:text-neutral-300 prose-headings:font-light prose-headings:tracking-tight prose-headings:text-neutral-200 prose-h2:mt-16 prose-h2:border-b prose-h2:border-dashed prose-h2:border-neutral-800 prose-h2:pb-4 prose-h2:text-3xl prose-h3:mt-8 prose-h3:text-2xl prose-code:font-mono prose-code:text-emerald-400 prose-pre:my-0 prose-pre:bg-transparent prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-2 prose-blockquote:border-neutral-700 prose-blockquote:text-neutral-400 prose-ul:my-8 prose-li:my-2 prose-li:text-neutral-300 prose-hr:border-border prose-hr:border-dashed mx-auto max-w-none">
					{children}
				</motion.div>

				<footer className="border-border border-t border-dashed pt-8 md:mt-12">
					<div className="space-y-6 font-mono">
						<div className="flex items-center justify-between">
							<div className="text-xs">
								<span className="text-emerald-500">&rarr;</span>
								<span className="text-neutral-500"> get</span>
								<span className="text-blue-400">
									{' '}
									author-info
								</span>
							</div>

							<div className="hidden items-center gap-2 font-mono text-xs text-neutral-600 lg:flex">
								<span className="text-emerald-500/60">
									pwd:
								</span>
								<span className="max-w-96 overflow-hidden rounded border border-neutral-800 bg-neutral-900/50 px-2 py-0.5 text-ellipsis whitespace-pre text-neutral-500">
									~/blog/{slug}
								</span>
							</div>
						</div>

						{/* Author Card */}
						<AuthorCard authorInfo={authorInfo} />

						{/* Copyright Notice */}
						<CopyrightNotice
							year={new Date().getFullYear()}
							authorName="Aditya Bhaskar Sharma"
						/>
					</div>
				</footer>
			</div>

			<FloatingQuickNav />

			<BackgroundEffect variant="grid" intensity={0.4} opacity={0.7} />
		</article>
	)
}
