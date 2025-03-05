'use client'

import { useCallback } from 'react'

interface UseNameExpanderOptions {
	fullName: string
	elementId: string
	animationSpeed?: number
}

export function useNameExpander({
	fullName,
	elementId,
	animationSpeed = 100,
}: UseNameExpanderOptions) {
	/**
	 * Handles clicking on the name to expand/collapse it
	 */
	const handleNameClick = useCallback(() => {
		const nameSpan = document.querySelector(`#${elementId}`)
		if (!nameSpan) return

		if (nameSpan.textContent === fullName) {
			// Reverse animation (collapse)
			let i = fullName.length
			const interval = setInterval(() => {
				if (i >= 0) {
					nameSpan.textContent = fullName.substring(0, i)
					i--
				} else {
					clearInterval(interval)
					nameSpan.parentElement?.setAttribute(
						'title',
						'Go ahead, click me!',
					)
					nameSpan.parentElement?.classList.remove('cursor-w-resize')
					nameSpan.parentElement?.classList.add('cursor-e-resize')
				}
			}, animationSpeed)
		} else {
			// Forward animation (expand)
			let i = 0
			nameSpan.textContent = ''
			const interval = setInterval(() => {
				if (i <= fullName.length) {
					nameSpan.textContent = fullName.substring(0, i)
					i++
				} else {
					clearInterval(interval)
					nameSpan.parentElement?.setAttribute(
						'title',
						'This is what you asked for! Click me again!',
					)
					nameSpan.parentElement?.classList.remove('cursor-e-resize')
					nameSpan.parentElement?.classList.add('cursor-w-resize')
				}
			}, animationSpeed)
		}
	}, [fullName, elementId, animationSpeed])

	return { handleNameClick }
}
