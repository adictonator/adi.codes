'use client'

import { useState, useEffect } from 'react'

export function useMobileDetection(breakpoint = 768) {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkIfMobile = () => {
			setIsMobile(window.innerWidth < breakpoint)
		}

		// Initial check
		checkIfMobile()

		// Add event listener
		window.addEventListener('resize', checkIfMobile)

		// Cleanup
		return () => window.removeEventListener('resize', checkIfMobile)
	}, [breakpoint])

	return isMobile
}
