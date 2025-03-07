'use client'

import { motion } from 'framer-motion'

interface TerminalHeaderProps {
	title: string
	isMinimized?: boolean
	extraContent?: React.ReactNode
	className?: string
}

export function TerminalHeader({
	title,
	isMinimized,
	extraContent,
	className = '',
}: TerminalHeaderProps) {
	return (
		<div
			className={`relative z-10 flex h-5 items-center gap-1.5 border-b border-neutral-800 bg-black/60 px-2 py-0.5 ${isMinimized ? 'border-b-0' : ''} ${className}`}>
			<span className="h-2 w-2 rounded-full bg-red-500/70" />
			<span className="h-2 w-2 rounded-full bg-yellow-500/70" />
			<span className="h-2 w-2 rounded-full bg-green-500/70" />
			<motion.span
				animate={{ width: isMinimized ? 'auto' : '100px' }}
				className="text-muted-foreground text-10px ml-2 overflow-hidden whitespace-nowrap">
				{title}
			</motion.span>
			{extraContent}
		</div>
	)
}
