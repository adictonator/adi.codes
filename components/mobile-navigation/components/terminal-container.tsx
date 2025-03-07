'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TerminalHeader } from './terminal-header'

interface TerminalContainerProps {
	isMinimized: boolean
	setIsMinimized: (state: boolean) => void
	minimizedWidth: string
	expandedWidth: string
	minimizedContent: ReactNode
	expandedContent: ReactNode
}

export function TerminalContainer({
	isMinimized,
	setIsMinimized,
	minimizedWidth,
	expandedWidth,
	minimizedContent,
	expandedContent,
}: TerminalContainerProps) {
	return (
		<motion.div
			className="border-muted/15 fixed inset-x-0 bottom-2.5 z-20 mx-auto w-full overflow-hidden border shadow-[0_0_15px_rgba(0,255,170,0.15)]"
			initial={{ y: 100, opacity: 0 }}
			animate={{
				y: 0,
				opacity: 1,
				height: isMinimized ? '38px' : 'auto',
				width: isMinimized ? minimizedWidth : expandedWidth,
			}}
			transition={{
				type: 'spring',
				stiffness: 400,
				damping: 30,
				height: { duration: 0.2 },
				width: { duration: 0.2 },
			}}
			onClick={() => isMinimized && setIsMinimized(false)}>
			{/* Background gradient */}
			<motion.div
				className="absolute inset-0 z-0"
				animate={{
					background: isMinimized
						? 'linear-gradient(to right, rgb(0 0 0 / 90%), rgb(20 83 45 / 30%))'
						: 'linear-gradient(to bottom, rgb(0 0 0 / 90%), rgb(23 23 23 / 95%))',
				}}
			/>

			{/* Terminal header */}
			<TerminalHeader
				title={isMinimized ? 'nav.sh' : 'navigation.sh'}
				isMinimized={isMinimized}
			/>

			{/* Content (minimized or expanded) */}
			<AnimatePresence mode="wait">
				{isMinimized ? minimizedContent : expandedContent}
			</AnimatePresence>
		</motion.div>
	)
}
