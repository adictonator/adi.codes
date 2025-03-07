'use client'

import { useState, useEffect, useRef } from 'react'
import LeftPanel from '@/components/left-panel'
import RightPanel from '@/components/right-panel'
import ThemeToggle from '@/components/theme-toggle'
import { BackgroundEffect } from '@/components/ui/background-effect'
import MobileNavigation from '@/components/mobile-navigation'
import { useMobileDetection } from '@/hooks/use-mobile-detection'
import { cn } from '@/lib/utils'

export default function Home() {
	const [activeSection, setActiveSection] = useState('about')
	const isMobile = useMobileDetection()
	// Create a ref for the scrollable container inside RightPanel
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const hash = window.location.hash.slice(1) || 'about'
		setActiveSection(hash)

		const handleHashChange = () => {
			const newHash = window.location.hash.slice(1) || 'about'
			setActiveSection(newHash)
		}

		window.addEventListener('hashchange', handleHashChange)
		return () => window.removeEventListener('hashchange', handleHashChange)
	}, [])

	const handleSectionChange = (section: string) => {
		history.pushState(null, '', `#${section}`)
		setActiveSection(section)
	}

	return (
		<main
			className={cn('relative', {
				'divide-border h-screen justify-between divide-x divide-dashed md:flex':
					!isMobile,
			})}>
			{!isMobile ? (
				<>
					<LeftPanel activeSection={activeSection} />
					{/* Desktop RightPanel scrolls naturally */}
					<RightPanel onScroll={handleSectionChange} />
				</>
			) : (
				<>
					{/* On mobile, attach the ref to RightPanel's container */}
					<RightPanel
						onScroll={handleSectionChange}
						scrollRef={scrollContainerRef}
					/>
					<MobileNavigation
						activeSection={activeSection}
						onSectionChange={handleSectionChange}
						scrollRef={scrollContainerRef}
					/>
				</>
			)}
			<BackgroundEffect variant="grid" intensity={0.4} opacity={0.7} />
		</main>
	)
}
