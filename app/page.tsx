'use client'

import { useState, useCallback } from 'react'
import LeftPanel from '@/components/left-panel'
import ThemeToggle from '@/components/theme-toggle'
import RightPanel from '@/components/right-panel'

export default function Page() {
	const [activeSection, setActiveSection] = useState<string>('about')

	const handleSectionChange = useCallback(
		(section: string) => {
			if (section !== activeSection) {
				setActiveSection(section)
			}
		},
		[activeSection],
	)

	return (
		<main className="divide-border relative flex h-screen divide-x divide-dashed">
			<LeftPanel activeSection={activeSection} />
			<RightPanel onScroll={handleSectionChange} />

			{/* Hiding for now until I figure out the light shades I wanna use. */}
			{/*<ThemeToggle />*/}
		</main>
	)
}
