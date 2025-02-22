'use client'

import { useState, useCallback } from 'react'
import LeftPanel from '@/components/left-panel'
import SideSection from '@/components/side-section'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export default function Page() {
	const [activeSection, setActiveSection] = useState<string>('about')
	const { theme, setTheme } = useTheme()

	const handleSectionChange = useCallback(
		(section: string) => {
			if (section !== activeSection) {
				setActiveSection(section)
			}
		},
		[activeSection],
	)

	return (
		<div className="relative flex h-screen divide-x divide-dashed divide-neutral-700/80">
			<LeftPanel activeSection={activeSection} />
			<SideSection onScroll={handleSectionChange} />

			{/* Theme Toggle */}
			<div className="absolute top-0 left-0">
				<button
					className="group relative flex cursor-pointer items-center justify-center border border-t-0 border-l-0 border-dashed border-neutral-700/80 p-2.5 transition-all hover:border-neutral-700 dark:hover:border-neutral-700"
					onClick={() =>
						setTheme(theme === 'light' ? 'dark' : 'light')
					}>
					{theme === 'light' ? (
						<Sun className="size-5 scale-100 transition-all duration-300 group-hover:fill-amber-300" />
					) : (
						<Moon className="size-5 rotate-90 stroke-neutral-700 transition-all delay-150 duration-300 group-hover:fill-neutral-700 dark:rotate-0" />
					)}
					<span className="sr-only">Toggle theme</span>
				</button>
			</div>
		</div>
	)
}
