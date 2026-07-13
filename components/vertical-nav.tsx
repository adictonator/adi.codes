'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface NavItem {
	id: string
	label: string
}

const NAV_ITEMS: NavItem[] = [
	{ id: 'about', label: 'About' },
	{ id: 'lab', label: 'Lab' },
	{ id: 'experience', label: 'Work' },
	{ id: 'skills', label: 'Skills' },
	{ id: 'blog', label: 'Notes' },
	{ id: 'uses', label: 'Uses' },
	{ id: 'hire', label: 'Hire' },
	{ id: 'connect', label: 'Social' },
]

export default function VerticalNav({
	activeSection,
	onNavigate,
	hasNotes,
}: {
	activeSection: string
	onNavigate: (id: string) => void
	hasNotes: boolean
}) {
	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		id: string,
	) => {
		e.preventDefault()
		onNavigate(id)
	}

	const navItems = NAV_ITEMS.filter(item => item.id !== 'blog' || hasNotes)

	return (
		<aside className="bg-foreground border-border divide-border z-20 hidden h-full flex-col items-center justify-center divide-y divide-dashed border-l border-dashed backdrop-blur-sm md:flex">
			{navItems.map(item => {
				const isActive = activeSection === item.id

				return (
					<motion.a
						key={item.id}
						href={`#${item.id}`}
						onClick={e => handleNavClick(e, item.id)}
						className={cn(
							'group hover:bg-background relative flex-1 py-4 text-center font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 select-none hover:text-emerald-500',
							{
								'bg-background text-emerald-500': isActive,
								'text-neutral-500': !isActive,
							},
						)}
						style={{
							writingMode: 'vertical-rl',
							textOrientation: 'mixed',
						}}>
						{item.label}
					</motion.a>
				)
			})}
		</aside>
	)
}
