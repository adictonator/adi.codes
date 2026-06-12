'use client'

import { useEffect } from 'react'

export function useScrollMinimize(
	setIsMinimized: (state: boolean) => void,
	scrollRef: React.RefObject<HTMLElement>,
) {
	useEffect(() => {
		// The page itself never scrolls — the right panel's inner div does,
		// so listen there (window kept as a fallback).
		const target: HTMLElement | Window = scrollRef?.current ?? window
		const getY = () =>
			target instanceof Window ? target.scrollY : target.scrollTop

		// Track continuous scrolling in the same direction
		let lastY = getY()
		let continuousScrollDistance = 0
		let lastScrollDirection: 'up' | 'down' | null = null

		// Configuration
		const SCROLL_THRESHOLD = 200 // Minimum accumulated scroll before triggering (higher = less sensitive)
		const DEBOUNCE_DELAY = 350 // ms to wait before processing scroll (prevents rapid changes)

		// Debounce scroll handling
		let scrollTimer: NodeJS.Timeout | null = null

		const handleScroll = () => {
			if (scrollTimer) return // Skip if we're debouncing

			scrollTimer = setTimeout(() => {
				const currentY = getY()
				const delta = currentY - lastY
				const direction = delta > 0 ? 'down' : 'up'

				// Reset accumulated distance on direction change
				if (
					lastScrollDirection !== null &&
					direction !== lastScrollDirection
				) {
					continuousScrollDistance = 0
				}

				// Accumulate scroll distance in current direction
				continuousScrollDistance += Math.abs(delta)
				lastScrollDirection = direction

				// Only trigger when we've scrolled enough in the same direction
				if (continuousScrollDistance > SCROLL_THRESHOLD) {
					setIsMinimized(direction === 'down')

					// Reset accumulation after action
					continuousScrollDistance = 0
				}

				lastY = currentY
				scrollTimer = null
			}, DEBOUNCE_DELAY)
		}

		// Use passive for better performance
		target.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			target.removeEventListener('scroll', handleScroll)
			if (scrollTimer) clearTimeout(scrollTimer)
		}
	}, [setIsMinimized, scrollRef])
}
