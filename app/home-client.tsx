'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import LeftPanel from '@/components/left-panel'
import RightPanel from '@/components/right-panel'
import ThemeToggle from '@/components/theme-toggle'
import { BackgroundEffect } from '@/components/ui/background-effect'
import MobileNavigation from '@/components/mobile-navigation'
import { useMobileDetection } from '@/hooks/use-mobile-detection'
import { cn } from '@/lib/utils'

type PostData = {
	slug: string
	title?: string
	date?: string
	description?: string
	tags?: string[]
	[key: string]: any
}

interface HomeClientProps {
	posts: PostData[]
}

export default function HomeClient({ posts }: HomeClientProps) {
	const [activeSection, setActiveSection] = useState('about')
	const isMobile = useMobileDetection()
	// Create a ref for the scrollable container inside RightPanel
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// Covers the initial #hash on load and native in-page anchor clicks
		// (e.g. the "tech stuff" link in the about section).
		const syncFromHash = () => {
			setActiveSection(window.location.hash.slice(1) || 'about')
		}
		syncFromHash()
		window.addEventListener('hashchange', syncFromHash)
		return () => window.removeEventListener('hashchange', syncFromHash)
	}, [])

	// Keep the URL in sync without ever scrolling: assigning to
	// location.hash makes the browser scroll to the anchor, which fights
	// any smooth scroll already in progress. replaceState does not.
	const reflectSection = useCallback((section: string) => {
		setActiveSection(section)
		if (window.location.hash !== `#${section}`) {
			history.replaceState(null, '', `#${section}`)
		}
	}, [])

	// Nav clicks: update state, then do the scrolling ourselves.
	const handleNavigate = useCallback(
		(section: string) => {
			reflectSection(section)
			document
				.getElementById(section)
				?.scrollIntoView({ behavior: 'smooth', block: 'start' })
		},
		[reflectSection],
	)

	return (
		<main
			className={cn('relative', {
				'flex h-dvh flex-row': !isMobile,
			})}>
			{!isMobile ? (
				<>
					<LeftPanel activeSection={activeSection} />
					{/* Desktop RightPanel scrolls naturally */}
					<RightPanel
						onScroll={reflectSection}
						activeSection={activeSection}
						onNavigate={handleNavigate}
						posts={posts}
					/>
				</>
			) : (
				<>
					{/* On mobile, attach the ref to RightPanel's container */}
					<RightPanel
						onScroll={reflectSection}
						activeSection={activeSection}
						onNavigate={handleNavigate}
						scrollRef={scrollContainerRef}
						posts={posts}
					/>
					<MobileNavigation
						activeSection={activeSection}
						onSectionChange={handleNavigate}
						scrollRef={scrollContainerRef}
					/>
				</>
			)}
			{!isMobile && <ThemeToggle />}
			<BackgroundEffect variant="grid" intensity={0.4} opacity={0.7} />
		</main>
	)
}
