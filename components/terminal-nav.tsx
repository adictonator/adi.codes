'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Home, Terminal, ChevronRight, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useMounted } from '@/hooks/use-mounted'

export interface NavItem {
	label: string
	href: string
	command?: string
}

interface TerminalNavProps {
	currentPath: string
	breadcrumbs: NavItem[]
	showKeyboardHints?: boolean
}

function ThemeButton() {
	const { resolvedTheme, setTheme } = useTheme()
	const mounted = useMounted()
	const isLight = mounted && resolvedTheme === 'light'

	return (
		<button
			type="button"
			onClick={() => setTheme(isLight ? 'dark' : 'light')}
			aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
			className="-m-1 p-1 text-neutral-500 transition-colors hover:text-neutral-300">
			{/* Same icon on server and first client render; swaps after mount. */}
			{isLight ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
		</button>
	)
}

export default function TerminalNav({
	currentPath,
	breadcrumbs,
	showKeyboardHints = true,
}: TerminalNavProps) {
	const mounted = useMounted()
	const router = useRouter()
	const [isMac, setIsMac] = useState(false)

	useEffect(() => {
		setIsMac(/mac|iphone|ipad/i.test(navigator.userAgent))
	}, [])

	// "Back" means one level up the breadcrumb trail, not the page you're on.
	const parentHref =
		breadcrumbs.length > 1 ? breadcrumbs[breadcrumbs.length - 2].href : '/'

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (!e.altKey || e.metaKey || e.ctrlKey) return
			const target = e.target as HTMLElement | null
			if (target?.closest('input, textarea, [contenteditable="true"]'))
				return

			// e.code, not e.key: on a Mac, Option+H types "˙", so e.key never
			// equals "h" and the shortcut silently did nothing.
			if (e.code === 'KeyH') {
				e.preventDefault()
				router.push('/')
			} else if (e.code === 'KeyB') {
				e.preventDefault()
				router.push(parentHref)
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [router, parentHref])

	const modifier = isMac ? '⌥' : 'Alt'

	return (
		<div className="sticky top-0 z-20 border-b border-dashed border-neutral-800 bg-neutral-950/95 backdrop-blur-md">
			{/* Window bar: current path */}
			<div className="flex items-center justify-between gap-3 border-b border-dashed border-neutral-800 bg-neutral-900/50 px-4 py-2">
				<div className="flex min-w-0 items-center gap-2 font-mono text-xs">
					<Terminal className="size-3.5 shrink-0 text-emerald-500" />
					<span className="hidden text-neutral-400 sm:inline">
						terminal
					</span>
					<ChevronRight className="hidden size-3 shrink-0 text-neutral-600 sm:inline" />
					<span className="truncate text-emerald-500/80">
						{currentPath}
					</span>
					<span className="inline-block h-3 w-2 shrink-0 animate-pulse bg-emerald-500 motion-reduce:animate-none" />
				</div>

				<div className="flex shrink-0 items-center gap-3 font-mono text-xxs text-neutral-600">
					{showKeyboardHints && (
						<span className="hidden items-center gap-3 md:flex">
							<span className="flex items-center gap-1">
								<kbd className="border border-neutral-800 bg-neutral-900 px-1 py-0.5">
									{modifier}
								</kbd>
								<kbd className="border border-neutral-800 bg-neutral-900 px-1 py-0.5">
									H
								</kbd>
								<span className="ml-1">home</span>
							</span>
							<span className="flex items-center gap-1">
								<kbd className="border border-neutral-800 bg-neutral-900 px-1 py-0.5">
									{modifier}
								</kbd>
								<kbd className="border border-neutral-800 bg-neutral-900 px-1 py-0.5">
									B
								</kbd>
								<span className="ml-1">back</span>
							</span>
						</span>
					)}
					<ThemeButton />
				</div>
			</div>

			{/* Breadcrumbs */}
			<nav
				aria-label="Breadcrumb"
				className="flex min-w-0 items-center gap-2 px-4 py-2.5 font-mono text-xs">
				<Link
					href="/"
					className="group flex shrink-0 items-center gap-2 text-neutral-500 transition-colors hover:text-neutral-300">
					<Home className="size-3.5 transition-transform group-hover:scale-110" />
					<span className="text-emerald-500/80">cd</span>
					<span>~</span>
				</Link>

				{breadcrumbs.map((item, index) => {
					const isLast = index === breadcrumbs.length - 1
					return (
						<motion.div
							key={item.href}
							initial={mounted ? { opacity: 0, x: -10 } : false}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
							// Only the current page's crumb truncates; parents stay readable.
							className={`flex items-center gap-2 ${isLast ? 'min-w-0' : 'shrink-0'}`}>
							<ChevronRight className="size-3 shrink-0 text-neutral-700" />
							<Link
								href={item.href}
								aria-current={isLast ? 'page' : undefined}
								className="group flex min-w-0 items-center gap-2 text-neutral-500 transition-colors hover:text-neutral-300">
								{item.command && (
									<span className="shrink-0 text-emerald-500/80">
										{item.command}
									</span>
								)}
								<span className="truncate group-hover:text-blue-400">
									{item.label}
								</span>
							</Link>
						</motion.div>
					)
				})}
			</nav>
		</div>
	)
}
