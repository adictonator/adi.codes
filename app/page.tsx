'use client'

import { useState, useCallback } from 'react'
import LeftPanel from '@/components/left-panel'
import SideSection from '@/components/side-section'

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
		<div className="flex h-screen divide-x divide-dashed divide-neutral-700/80">
			<LeftPanel activeSection={activeSection} />
			<SideSection onScroll={handleSectionChange} />
		</div>
	)
}
