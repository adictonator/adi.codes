'use client'

import { useEffect, useRef } from 'react'

const DEBUG = false // Set to false for production

export function useScrollMinimize(
	setIsMinimized: (state: boolean) => void,
	scrollRef: React.RefObject<HTMLElement>,
) {
	useEffect(() => {
		DEBUG && console.log('🔄 useScrollMinimize initializing')

		// Track continuous scrolling in the same direction
		let lastWindowScrollY = window.scrollY
		let continuousScrollDistance = 0
		let lastScrollDirection: 'up' | 'down' | null = null

		// Configuration
		const SCROLL_THRESHOLD = 200 // Minimum accumulated scroll before triggering (higher = less sensitive)
		const DIRECTION_CHANGE_RESET = true // Reset accumulated distance on direction change
		const DEBOUNCE_DELAY = 350 // ms to wait before processing scroll (prevents rapid changes)

		// Debounce scroll handling
		let scrollTimer: NodeJS.Timeout | null = null

		const handleWindowScroll = () => {
			if (scrollTimer) return // Skip if we're debouncing

			scrollTimer = setTimeout(() => {
				const currentY = window.scrollY
				const delta = currentY - lastWindowScrollY
				const direction = delta > 0 ? 'down' : 'up'

				// If direction changed and we want to reset
				if (
					lastScrollDirection !== null &&
					direction !== lastScrollDirection &&
					DIRECTION_CHANGE_RESET
				) {
					continuousScrollDistance = 0
				}

				// Accumulate scroll distance in current direction
				continuousScrollDistance += Math.abs(delta)
				lastScrollDirection = direction

				// Only trigger when we've scrolled enough in the same direction
				if (continuousScrollDistance > SCROLL_THRESHOLD) {
					DEBUG &&
						console.log(
							`📱 Sufficient scroll: ${continuousScrollDistance}px ${direction}`,
						)
					setIsMinimized(direction === 'down')

					// Reset accumulation after action
					continuousScrollDistance = 0
				}

				lastWindowScrollY = currentY
				scrollTimer = null
			}, DEBOUNCE_DELAY)
		}

		// Use passive for better performance
		window.addEventListener('scroll', handleWindowScroll, { passive: true })

		return () => {
			window.removeEventListener('scroll', handleWindowScroll)
			if (scrollTimer) clearTimeout(scrollTimer)
		}
	}, [setIsMinimized])
}
