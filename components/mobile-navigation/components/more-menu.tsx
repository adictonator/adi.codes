'use client'

import { useEffect, MutableRefObject } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Terminal, X, ChevronRight, Download, FolderGit2, FileText, SunMoon } from 'lucide-react'
import { TerminalHeader } from './terminal-header'
import { NavItemType } from './nav-item'
import { siteConfig } from '@/lib/site'
import { trackResumeClick } from '@/lib/ga'

interface MoreMenuProps {
	isOpen: boolean
	onClose: () => void
	activeSection: string
	onSectionChange: (section: string) => void
	menuRef: MutableRefObject<HTMLDivElement | null>
	firstFocusableRef: MutableRefObject<HTMLButtonElement | null>
	secondaryNavItems: NavItemType[]
}

export function MoreMenu({
	isOpen,
	onClose,
	activeSection,
	onSectionChange,
	menuRef,
	firstFocusableRef,
	secondaryNavItems,
}: MoreMenuProps) {
	const { resolvedTheme, setTheme } = useTheme()

	// Focus management
	useEffect(() => {
		if (!isOpen) return

		document.body.style.overflow = 'hidden'
		const timer = setTimeout(() => firstFocusableRef.current?.focus(), 300)

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose()
		}

		window.addEventListener('keydown', handleEscape)

		return () => {
			window.removeEventListener('keydown', handleEscape)
			document.body.style.overflow = ''
			clearTimeout(timer)
		}
	}, [isOpen, onClose, firstFocusableRef])

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { duration: 0.15 } }}
						className="bg-secondary fixed inset-0 z-40 backdrop-blur-sm"
						onClick={onClose}
					/>

					{/* Menu container */}
					<motion.div
						ref={menuRef}
						initial={{ y: '100%' }}
						animate={{ y: 0 }}
						exit={{
							y: '100%',
							transition: {
								duration: 0.2,
								ease: [0.32, 0.72, 0, 1],
							},
						}}
						transition={{
							type: 'spring',
							damping: 30,
							stiffness: 400,
							mass: 0.8,
						}}
						className="dark border-border bg-secondary fixed right-4 bottom-24 left-4 z-50 overflow-hidden border shadow-lg shadow-emerald-400/15">
						{/* Header with close button */}
						<TerminalHeader
							title="menu.sh"
							extraContent={
								<button
									ref={firstFocusableRef}
									onClick={onClose}
									aria-label="Close menu"
									className="ml-auto flex size-4 items-center justify-center hover:bg-neutral-800 md:size-8">
									<X
										size={16}
										className="text-muted-foreground hover:text-muted justify-self-end"
									/>
								</button>
							}
							className="px-3 py-2"
						/>

						{/* Subheader */}
						<div className="flex items-center gap-2 border-b border-dashed border-neutral-800 bg-black/20 px-4 py-2">
							<Terminal className="h-3.5 w-3.5 text-emerald-500" />
							<h3 className="text-xs font-medium text-neutral-400">
								More sections
							</h3>
						</div>

						{/* Menu items */}
						<div className="divide-y divide-dashed divide-neutral-800">
							{secondaryNavItems.map((item, index) => (
								<MoreMenuItem
									key={item.id}
									item={item}
									index={index}
									isActive={activeSection === item.id}
									onClick={() => {
										onSectionChange(item.id)
										onClose()
									}}
								/>
							))}
						</div>

						{/* Pages and the résumé, one tap from anywhere */}
						<div className="grid grid-cols-2 border-t border-dashed border-neutral-800 font-mono text-xs text-neutral-400">
							<a
								href={siteConfig.resume}
								target="_blank"
								rel="noopener noreferrer"
								download
								onClick={() => trackResumeClick({ variant: 'mobile-menu' })}
								className="flex items-center gap-2 border-r border-b border-dashed border-neutral-800 px-4 py-3 hover:bg-neutral-800/30">
								<Download className="size-3.5 text-emerald-500" />
								résumé
							</a>
							<Link
								href="/projects"
								className="flex items-center gap-2 border-b border-dashed border-neutral-800 px-4 py-3 hover:bg-neutral-800/30">
								<FolderGit2 className="size-3.5 text-emerald-500" />
								all projects
							</Link>
							<Link
								href="/blog"
								className="flex items-center gap-2 border-r border-b border-dashed border-neutral-800 px-4 py-3 hover:bg-neutral-800/30">
								<FileText className="size-3.5 text-emerald-500" />
								blog
							</Link>
							<button
								type="button"
								onClick={() =>
									setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
								}
								className="flex items-center gap-2 border-b border-dashed border-neutral-800 px-4 py-3 text-left hover:bg-neutral-800/30">
								<SunMoon className="size-3.5 text-emerald-500" />
								toggle theme
							</button>
						</div>

						{/* Footer */}
						<MenuFooter itemCount={secondaryNavItems.length} />
					</motion.div>
				</>
			)}
		</AnimatePresence>
	)
}

function MoreMenuItem({
	item,
	index,
	isActive,
	onClick,
}: {
	item: NavItemType
	index: number
	isActive: boolean
	onClick: () => void
}) {
	const Icon = item.icon

	return (
		<motion.button
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0, transition: { delay: index * 0.08 } }}
			onClick={onClick}
			className={`group flex w-full items-center justify-between px-4 py-3.5 transition-colors ${
				isActive
					? 'bg-neutral-800/50 text-emerald-400'
					: 'hover:bg-neutral-800/30'
			}`}>
			<div className="flex items-center gap-3">
				<div
					className={`flex h-8 w-8 items-center justify-center rounded-full ${
						isActive
							? 'bg-emerald-900/30'
							: 'bg-neutral-800/50 group-hover:bg-neutral-800'
					}`}>
					<Icon size={16} />
				</div>
				<span
					className={`font-medium ${
						isActive
							? ''
							: 'text-neutral-300 group-hover:text-neutral-200'
					}`}>
					{item.label}
				</span>
			</div>

			<ChevronRight
				size={16}
				className={`opacity-0 transition-opacity ${
					isActive ? 'opacity-100' : 'group-hover:opacity-50'
				}`}
			/>
		</motion.button>
	)
}

function MenuFooter({ itemCount }: { itemCount: number }) {
	return (
		<div className="flex items-center justify-between border-t border-neutral-800 bg-black/40 px-4 py-2.5">
			<div className="flex items-center gap-1.5">
				<span className="size-2 animate-pulse rounded-full bg-emerald-500/70" />
				<span className="font-mono text-xs text-neutral-500">
					ready
				</span>
			</div>

			<div className="flex items-center text-xs text-neutral-600">
				<span>sections:{itemCount}</span>
			</div>
		</div>
	)
}
