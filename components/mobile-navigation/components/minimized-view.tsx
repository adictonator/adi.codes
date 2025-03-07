'use client'

import { motion } from 'framer-motion'
import { Terminal, ChevronUp } from 'lucide-react'
import { formatSectionName } from '../utils'

interface MinimizedViewProps {
	activeSection: string
}

export function MinimizedView({ activeSection }: MinimizedViewProps) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="relative z-10 flex h-auto items-center justify-between gap-2 px-2.5">
			<div className="flex min-w-0 items-center gap-2.5">
				<Terminal className="h-4 w-4 shrink-0 text-emerald-400" />
				<span className="truncate font-mono text-xs tracking-tight text-emerald-300">
					{formatSectionName(activeSection)}
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: [0, 1, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}
						className="ml-1 inline-block h-3 w-px bg-emerald-400 align-middle opacity-70"
					/>
				</span>
			</div>
			<ChevronUp className="text-muted h-3.5 w-3.5 shrink-0" />
		</motion.div>
	)
}
