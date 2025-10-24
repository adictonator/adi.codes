'use client'

import { useState, useEffect, useRef } from 'react'
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
		window.location.hash = `#${section}`
		setActiveSection(section)
	}

	return (
		<main
			className={cn('relative', {
				'flex h-screen flex-row': !isMobile,
			})}>
			{!isMobile ? (
				<>
					<LeftPanel activeSection={activeSection} />
					{/* Desktop RightPanel scrolls naturally */}
					<RightPanel onScroll={handleSectionChange} posts={posts} />
				</>
			) : (
				<>
					{/* On mobile, attach the ref to RightPanel's container */}
					<RightPanel
						onScroll={handleSectionChange}
						scrollRef={scrollContainerRef}
						posts={posts}
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
