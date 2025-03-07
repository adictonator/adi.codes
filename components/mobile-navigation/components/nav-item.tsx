'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

export interface NavItemType {
	id: string
	label: string
	icon: LucideIcon
	isAction?: boolean
}

interface NavItemProps {
	item: NavItemType
	isActive: boolean
	secondaryNavItems: NavItemType[]
	activeSection: string
	onClick: () => void
}

export function NavItem({
	item,
	isActive,
	secondaryNavItems,
	activeSection,
	onClick,
}: NavItemProps) {
	const hasActiveSecondaryItem =
		item.isAction &&
		secondaryNavItems.some(secItem => activeSection === secItem.id)

	return (
		<motion.button
			onClick={onClick}
			className={cn(
				'group relative flex h-full flex-col items-center justify-center border-t px-1',
				{
					'-top-px z-10 border-emerald-500 bg-emerald-900/20':
						isActive,
					'border-t-transparent hover:bg-neutral-800/30': !isActive,
				},
			)}
			whileTap={{ scale: 0.95 }}>
			{/*{isActive && (
				<motion.div
					className="absolute -top-1 left-1/2 h-0.5 w-6 -translate-x-1/2 bg-emerald-500"
					layoutId="activeNavIndicator"
				/>
			)}*/}

			<motion.div
				className={`flex items-center justify-center ${
					isActive
						? 'text-emerald-400'
						: 'text-neutral-500 group-hover:text-neutral-400'
				}`}>
				<item.icon size={16} />
			</motion.div>

			<span
				className={`text-10px mt-1 tracking-tight ${
					isActive
						? 'text-emerald-200'
						: 'text-neutral-500 group-hover:text-neutral-400'
				}`}>
				{item.isAction ? (
					<span className="inline-flex items-center">
						{item.label}
						{true && (
							<span className="ml-0.5 inline-block size-1 rounded-full bg-emerald-400"></span>
						)}
					</span>
				) : (
					item.label
				)}
			</span>

			{isActive && !item.isAction && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-xxs absolute -bottom-0.5 text-emerald-500/80">
					cd ~/{item.id}
				</motion.div>
			)}
		</motion.button>
	)
}
