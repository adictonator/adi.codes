'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, ArrowLeft, Terminal, ChevronRight, Command } from 'lucide-react'
import { useEffect, useState } from 'react'

interface NavItem {
	label: string
	href: string
	command?: string
}

interface TerminalNavProps {
	currentPath: string
	breadcrumbs: NavItem[]
	showKeyboardHints?: boolean
}

export default function TerminalNav({
	currentPath,
	breadcrumbs,
	showKeyboardHints = true,
}: TerminalNavProps) {
	const [isMac, setIsMac] = useState(false)

	useEffect(() => {
		setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
	}, [])

	// Keyboard navigation
	useEffect(() => {
		const handleKeyPress = (e: KeyboardEvent) => {
			// Alt/Option + H for home
			if (e.altKey && e.key === 'h') {
				e.preventDefault()
				window.location.href = '/'
			}
			// Alt/Option + B for back/blog
			if (e.altKey && e.key === 'b') {
				e.preventDefault()
				if (breadcrumbs.length > 0) {
					window.location.href =
						breadcrumbs[breadcrumbs.length - 1].href
				}
			}
		}

		window.addEventListener('keydown', handleKeyPress)
		return () => window.removeEventListener('keydown', handleKeyPress)
	}, [breadcrumbs])

	return (
		<div className="sticky top-0 z-20 border-b border-dashed border-neutral-800 bg-neutral-950/95 backdrop-blur-md">
			{/* Terminal Window Buttons & Path */}
			<div className="mb-2 flex items-center justify-between border-b border-dashed border-neutral-700/50 bg-neutral-900/50 px-4 py-2">
				<div className="flex items-center gap-2">
					<Terminal className="h-3.5 w-3.5 text-emerald-500" />
					<span className="font-mono text-xs text-neutral-400">
						terminal
					</span>
					<ChevronRight className="h-3 w-3 text-neutral-600" />
					<span className="font-mono text-xs text-emerald-500/80">
						{currentPath}
					</span>
					<span className="ml-1 inline-block h-3 w-2 animate-pulse bg-emerald-500" />
				</div>

				{/* Quick Actions - Desktop Only */}
				{showKeyboardHints && (
					<div className="text-10px hidden items-center gap-3 font-mono text-neutral-600 md:flex">
						<span className="flex items-center gap-1">
							<kbd className="rounded border border-neutral-800 bg-neutral-900 px-1 py-0.5">
								{isMac ? '⌥' : 'Alt'}
							</kbd>
							<kbd className="rounded border border-neutral-800 bg-neutral-900 px-1 py-0.5">
								H
							</kbd>
							<span className="ml-1">home</span>
						</span>
						<span className="flex items-center gap-1">
							<kbd className="rounded border border-neutral-800 bg-neutral-900 px-1 py-0.5">
								{isMac ? '⌥' : 'Alt'}
							</kbd>
							<kbd className="rounded border border-neutral-800 bg-neutral-900 px-1 py-0.5">
								B
							</kbd>
							<span className="ml-1">back</span>
						</span>
					</div>
				)}
			</div>

			{/* Navigation Commands */}
			<div className="flex items-center justify-between px-4 py-2.5">
				<div className="flex items-center gap-4 font-mono text-xs">
					{/* Home Link */}
					<Link
						href="/"
						className="group flex items-center gap-2 text-neutral-500 transition-colors hover:text-neutral-300">
						<Home className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
						<span className="text-emerald-500/80">cd</span>
						<span className="hidden sm:inline">~</span>
					</Link>

					{/* Breadcrumb Navigation */}
					{breadcrumbs.map((item, index) => (
						<motion.div
							key={item.href}
							initial={{ opacity: 0, x: -10 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
							className="flex items-center gap-2">
							<ChevronRight className="h-3 w-3 text-neutral-700" />
							<Link
								href={item.href}
								className="group flex items-center gap-2 text-neutral-500 transition-colors hover:text-neutral-300">
								{item.command && (
									<span className="text-emerald-500/80">
										{item.command}
									</span>
								)}
								<span className="group-hover:text-blue-400">
									{item.label}
								</span>
							</Link>
						</motion.div>
					))}
				</div>
			</div>
		</div>
	)
}
