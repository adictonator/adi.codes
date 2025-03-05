'use client'

import { useState, useEffect } from 'react'
import LeftPanel from '@/components/left-panel'
import RightPanel from '@/components/right-panel'
import ThemeToggle from '@/components/theme-toggle'
import { BackgroundEffect } from '@/components/ui/background-effect'

export default function Home() {
	const [activeSection, setActiveSection] = useState('about')

	useEffect(() => {
		// Handle initial load
		const hash = window.location.hash.slice(1) || 'about'
		setActiveSection(hash)

		// Handle hash changes
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
		<main className="divide-border relative flex h-screen justify-between divide-x divide-dashed">
			<LeftPanel activeSection={activeSection} />
			<RightPanel onScroll={handleSectionChange} />

			{/* Hiding for now until I figure out the light shades I wanna use. */}
			{/*<ThemeToggle />*/}
			<BackgroundEffect variant="grid" intensity={0.4} opacity={0.7} />
		</main>
	)
}
