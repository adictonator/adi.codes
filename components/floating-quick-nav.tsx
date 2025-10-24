'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Home, FileText, Menu, X, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface QuickNavItem {
	label: string
	href: string
	icon: React.ReactNode
	shortcut?: string
}

const navItems: QuickNavItem[] = [
	{
		label: 'Home',
		href: '/',
		icon: <Home className="h-4 w-4" />,
		shortcut: '⌥H',
	},
	{
		label: 'Blog',
		href: '/blog',
		icon: <FileText className="h-4 w-4" />,
		shortcut: '⌥B',
	},
]

export default function FloatingQuickNav() {
	const [isOpen, setIsOpen] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [scrollProgress, setScrollProgress] = useState(0)

	useEffect(() => {
		const handleScroll = () => {
			// Show after scrolling 200px
			setIsVisible(window.scrollY > 200)

			// Calculate scroll progress
			const totalHeight =
				document.documentElement.scrollHeight - window.innerHeight
			const progress = (window.scrollY / totalHeight) * 100
			setScrollProgress(progress)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
					className="fixed right-3 bottom-2 z-50 sm:right-4 sm:bottom-3 md:right-6 md:bottom-6">
					{/* Main Button */}
					<div className="relative">
						{/* Scroll Progress Ring */}
						<svg
							className="absolute -inset-2 h-16 w-16 -rotate-90"
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
								strokeDasharray={`${2 * Math.PI * 28}`}
								strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
								className="text-emerald-500 transition-all duration-300"
								strokeLinecap="round"
							/>
						</svg>

						{/* Menu Toggle Button */}
						<motion.button
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							onClick={() => setIsOpen(!isOpen)}
							className="relative flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-neutral-700 bg-neutral-900/95 backdrop-blur-md transition-colors hover:border-emerald-500/50 hover:bg-neutral-800/95">
							<AnimatePresence mode="wait">
								{isOpen ? (
									<motion.div
										key="close"
										initial={{ rotate: -90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: 90, opacity: 0 }}
										transition={{ duration: 0.2 }}>
										<X className="h-5 w-5 text-neutral-300" />
									</motion.div>
								) : (
									<motion.div
										key="menu"
										initial={{ rotate: 90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: -90, opacity: 0 }}
										transition={{ duration: 0.2 }}>
										<Menu className="h-5 w-5 text-neutral-300" />
									</motion.div>
								)}
							</AnimatePresence>
						</motion.button>
					</div>

					{/* Quick Nav Menu */}
					<AnimatePresence>
						{isOpen && (
							<motion.div
								initial={{ opacity: 0, y: 10, scale: 0.9 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: 10, scale: 0.9 }}
								transition={{ type: 'spring', damping: 25 }}
								className="absolute right-0 bottom-16 w-48 overflow-hidden rounded-lg border border-dashed border-neutral-700 bg-neutral-900/95 backdrop-blur-md">
								{/* Menu Header */}
								<div className="border-b border-dashed border-neutral-800 bg-neutral-900/50 px-3 py-2">
									<div className="flex items-center gap-2">
										<div className="h-2 w-2 rounded-full bg-emerald-500" />
										<span className="font-mono text-xs text-neutral-400">
											quick-nav
										</span>
									</div>
								</div>

								{/* Menu Items */}
								<div className="p-2">
									{navItems.map((item, index) => (
										<motion.div
											key={item.href}
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{
												delay: index * 0.05,
											}}>
											<Link
												href={item.href}
												onClick={() => setIsOpen(false)}
												className="group flex items-center justify-between rounded px-3 py-2 font-mono text-xs text-neutral-400 transition-all hover:bg-neutral-800 hover:text-neutral-200 sm:text-sm">
												<div className="flex items-center gap-2">
													{item.icon}
													<span>{item.label}</span>
												</div>
												{item.shortcut && (
													<span className="text-xs text-neutral-600 group-hover:text-neutral-500">
														{item.shortcut}
													</span>
												)}
											</Link>
										</motion.div>
									))}

									{/* Divider */}
									<div className="my-2 border-t border-dashed border-neutral-800" />

									{/* Scroll to Top */}
									<motion.button
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{
											delay: navItems.length * 0.05,
										}}
										onClick={() => {
											scrollToTop()
											setIsOpen(false)
										}}
										className="group flex w-full items-center justify-between rounded px-3 py-2 font-mono text-xs text-neutral-400 transition-all hover:bg-neutral-800 hover:text-neutral-200 sm:text-sm">
										<div className="flex items-center gap-2">
											<ChevronUp className="h-4 w-4" />
											<span>Scroll Top</span>
										</div>
										<span className="text-xs text-neutral-600 group-hover:text-neutral-500">
											{Math.round(scrollProgress)}%
										</span>
									</motion.button>
								</div>

								{/* Menu Footer */}
								<div className="border-t border-dashed border-neutral-800 bg-neutral-900/50 px-3 py-2 font-mono text-xs text-neutral-600">
									<div className="flex items-center gap-1">
										<span className="text-emerald-500">
											$
										</span>
										<span>navigate --quick</span>
									</div>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
