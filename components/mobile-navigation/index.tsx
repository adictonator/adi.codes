'use client'

import { useState, useRef, RefObject } from 'react'
import { motion } from 'framer-motion'
import { navigationItems } from './data'
import { useScrollMinimize } from './hooks/use-scroll-minimize'
import { TerminalContainer } from './components/terminal-container'
import { MinimizedView } from './components/minimized-view'
import { ExpandedView } from './components/expanded-view'
import { MoreMenu } from './components/more-menu'

interface MobileNavigationProps {
	activeSection: string
	onSectionChange: (section: string) => void
	scrollRef?: RefObject<HTMLDivElement | null> // Make scrollRef optional
}

export default function MobileNavigation({
	activeSection,
	onSectionChange,
	scrollRef,
}: MobileNavigationProps) {
	const [showMoreMenu, setShowMoreMenu] = useState(false)
	const [isMinimized, setIsMinimized] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)
	const firstFocusableRef = useRef<HTMLButtonElement>(null)

	const { primaryNavItems, secondaryNavItems } = navigationItems

	// Pass scrollRef to useScrollMinimize hook
	useScrollMinimize(setIsMinimized, scrollRef as RefObject<HTMLElement>)

	const handleNavigation = (item: any) => {
		if (item.isAction) {
			setShowMoreMenu(true)
		} else {
			onSectionChange(item.id)
			setShowMoreMenu(false)
		}
	}

	return (
		<>
			<TerminalContainer
				isMinimized={isMinimized}
				setIsMinimized={setIsMinimized}
				minimizedWidth="180px"
				expandedWidth="96%"
				minimizedContent={
					<MinimizedView activeSection={activeSection} />
				}
				expandedContent={
					<ExpandedView
						activeSection={activeSection}
						primaryNavItems={primaryNavItems}
						secondaryNavItems={secondaryNavItems}
						handleNavigation={handleNavigation}
					/>
				}
			/>

			<MoreMenu
				isOpen={showMoreMenu}
				onClose={() => setShowMoreMenu(false)}
				activeSection={activeSection}
				onSectionChange={onSectionChange}
				menuRef={menuRef}
				firstFocusableRef={firstFocusableRef}
				secondaryNavItems={secondaryNavItems}
			/>

			{/* CSS for scanline effect - move to global styles */}
			<style jsx global>{`
				.bg-scanline {
					background: linear-gradient(
						to bottom,
						rgba(255, 255, 255, 0) 0%,
						rgba(255, 255, 255, 0.03) 50%,
						rgba(255, 255, 255, 0) 100%
					);
					background-size: 100% 4px;
				}
			`}</style>
		</>
	)
}
