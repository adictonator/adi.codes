'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { pauseScrollObserver } from './right-panel'

interface NavItem {
	id: string
	label: string
}

const NAV_ITEMS: NavItem[] = [
	{ id: 'about', label: 'About' },
	//{ id: 'lab', label: 'Lab' },
	{ id: 'experience', label: 'Work' },
	{ id: 'skills', label: 'Skills' },
	{ id: 'blog', label: 'Blog' },
	{ id: 'uses', label: 'Uses' },
	{ id: 'hire', label: 'Hire' },
	{ id: 'connect', label: 'Social' },
]

export default function VerticalNav() {
	const [activeSection, setActiveSection] = useState('about')

	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash.slice(1) || 'about'
			setActiveSection(hash)
		}

		handleHashChange() // Set initial state
		window.addEventListener('hashchange', handleHashChange)
		return () => window.removeEventListener('hashchange', handleHashChange)
	}, [])

	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		id: string,
	) => {
		e.preventDefault()

		// Pause the IntersectionObserver
		pauseScrollObserver()

		// Update state and hash
		setActiveSection(id)
		window.location.hash = `#${id}`

		// Scroll to target
		const target = document.getElementById(id)
		if (target) {
			target.scrollIntoView({ behavior: 'smooth', block: 'start' })
		}
	}

	return (
		<aside className="bg-foreground border-border divide-border z-20 hidden h-full flex-col items-center justify-center divide-y divide-dashed border-l border-dashed backdrop-blur-sm md:flex">
			{NAV_ITEMS.map(item => {
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
