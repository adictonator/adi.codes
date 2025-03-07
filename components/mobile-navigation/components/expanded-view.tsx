'use client'

import { motion } from 'framer-motion'
import { NavItem, NavItemType } from './nav-item'

interface ExpandedViewProps {
	activeSection: string
	primaryNavItems: NavItemType[]
	secondaryNavItems: NavItemType[]
	handleNavigation: (item: NavItemType) => void
}

export function ExpandedView({
	activeSection,
	primaryNavItems,
	secondaryNavItems,
	handleNavigation,
}: ExpandedViewProps) {
	return (
		<motion.div
			className="relative"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}>
			{/* Navigation items grid */}
			<div className="grid h-14 grid-cols-5 items-center">
				{primaryNavItems.map(item => (
					<NavItem
						key={item.id}
						item={item}
						isActive={
							item.isAction
								? secondaryNavItems.some(
										secItem => activeSection === secItem.id,
									)
								: activeSection === item.id
						}
						secondaryNavItems={secondaryNavItems}
						activeSection={activeSection}
						onClick={() => handleNavigation(item)}
					/>
				))}
			</div>

			{/* Status bar */}
			<StatusBar />
		</motion.div>
	)
}

function StatusBar() {
	return (
		<div className="border-muted/20 bg-secondary flex h-3 items-center justify-between border-t px-2">
			<motion.span
				animate={{ opacity: [0.4, 1, 0.4] }}
				transition={{ duration: 2, repeat: Infinity }}
				className="h-1 w-1 rounded-full bg-emerald-500"
			/>
			<span className="font-mono text-[8px] text-neutral-600">
				Desktop site has easter eggs, btw &mdash; v1.0.0
			</span>
		</div>
	)
}
