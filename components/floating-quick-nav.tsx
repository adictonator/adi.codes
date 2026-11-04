'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Home, FileText, FolderGit2, Menu, X, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface QuickNavItem {
	label: string
	href: string
	icon: React.ReactNode
	shortcut?: string
}

export default function FloatingQuickNav() {
	const [isOpen, setIsOpen] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [scrollProgress, setScrollProgress] = useState(0)

	const navItems: QuickNavItem[] = [
		{
			label: 'Home',
			href: '/',
			icon: <Home className="size-4" />,
			shortcut: '⌥H',
		},
		{
			label: 'Projects',
			href: '/projects',
			icon: <FolderGit2 className="size-4" />,
		},
		{
			label: 'Blog',
			href: '/blog',
			icon: <FileText className="size-4" />,
		},
	]

	useEffect(() => {
		const handleScroll = () => {
			setIsVisible(window.scrollY > 200)
			const totalHeight =
				document.documentElement.scrollHeight - window.innerHeight
			setScrollProgress(
				totalHeight > 0
					? Math.min(100, (window.scrollY / totalHeight) * 100)
					: 0,
			)
		}

		handleScroll()
		window.addEventListener('scroll', handleScroll, { passive: true })
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const circumference = 2 * Math.PI * 28

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					className="fixed right-4 bottom-4 z-50 md:right-6 md:bottom-6">
					<div className="relative">
						{/* Scroll progress ring */}
						<svg
							aria-hidden="true"
							className="absolute -inset-2 size-16 -rotate-90"
							viewBox="0 0 64 64">
							<circle
								cx="32"
								cy="32"
								r="28"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								className="text-neutral-800"
							/>
							<circle
								cx="32"
								cy="32"
								r="28"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeDasharray={circumference}
								strokeDashoffset={
									circumference * (1 - scrollProgress / 100)
								}
								className="text-emerald-500 transition-all duration-300"
								strokeLinecap="round"
							/>
						</svg>

						<motion.button
							type="button"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setIsOpen(!isOpen)}
							aria-expanded={isOpen}
							aria-label={isOpen ? 'Close quick navigation' : 'Open quick navigation'}
							className="relative flex size-12 items-center justify-center rounded-full border border-dashed border-neutral-700 bg-neutral-900/95 backdrop-blur-md transition-colors hover:border-emerald-500/50 hover:bg-neutral-800/95">
							{isOpen ? (
								<X className="size-5 text-neutral-300" />
							) : (
								<Menu className="size-5 text-neutral-300" />
							)}
						</motion.button>
					</div>

					<AnimatePresence>
						{isOpen && (
							<motion.div
								initial={{ opacity: 0, y: 10, scale: 0.95 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: 10, scale: 0.95 }}
								transition={{ type: 'spring', damping: 20, stiffness: 300 }}
								className="absolute right-0 bottom-16 w-48 overflow-hidden border border-dashed border-neutral-700 bg-neutral-900/95 backdrop-blur-md">
								<div className="border-b border-dashed border-neutral-800 bg-neutral-900/50 px-3 py-2 font-mono text-xs text-neutral-600">
									<span className="text-emerald-500">$</span>{' '}
									navigate --quick
								</div>

								<div className="p-2">
									{navItems.map(item => (
										<Link
											key={item.href}
											href={item.href}
											onClick={() => setIsOpen(false)}
											className="group flex items-center justify-between px-3 py-2 font-mono text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200">
											<span className="flex items-center gap-2">
												{item.icon}
												{item.label}
											</span>
											{item.shortcut && (
												<span className="hidden text-xs text-neutral-600 group-hover:text-neutral-500 md:inline">
													{item.shortcut}
												</span>
											)}
										</Link>
									))}

									<div className="my-2 border-t border-dashed border-neutral-800" />

									<button
										type="button"
										onClick={() => {
											window.scrollTo({ top: 0, behavior: 'smooth' })
											setIsOpen(false)
										}}
										className="group flex w-full items-center justify-between px-3 py-2 font-mono text-sm text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-neutral-200">
										<span className="flex items-center gap-2">
											<ChevronUp className="size-4" />
											Scroll top
										</span>
										<span className="text-xs text-neutral-600 group-hover:text-neutral-500">
											{Math.round(scrollProgress)}%
										</span>
									</button>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
