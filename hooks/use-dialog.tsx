'use client'

import { useEffect, RefObject } from 'react'

interface UseDialogProps {
	dialogRef: RefObject<HTMLElement | null> // Updated to allow null
	initialFocusRef?: RefObject<HTMLElement | null> // Also allow null here
	onClose: () => void
	trapFocus?: boolean
	isEnabled?: boolean // Add this prop to control when the hook is active
}

export function useDialog({
	dialogRef,
	initialFocusRef,
	onClose,
	trapFocus = true,
	isEnabled = true, // Default to true for backward compatibility
}: UseDialogProps) {
	useEffect(() => {
		// Skip effect if not enabled
		if (!isEnabled) return

		const dialog = dialogRef.current
		if (!dialog) return

		// Focus the initial element or the dialog itself on mount
		if (initialFocusRef?.current) {
			initialFocusRef.current.focus()
		} else if (dialog.getAttribute('tabindex') === null) {
			dialog.setAttribute('tabindex', '-1')
			dialog.focus()
		}

		const handleKeyDown = (e: KeyboardEvent) => {
			// Close on ESC
			if (e.key === 'Escape') {
				onClose()
				return
			}

			// Trap focus inside dialog
			if (trapFocus && e.key === 'Tab') {
				const focusableElements = dialog.querySelectorAll(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
				)

				if (focusableElements.length === 0) return

				const firstElement = focusableElements[0] as HTMLElement
				const lastElement = focusableElements[
					focusableElements.length - 1
				] as HTMLElement

				if (e.shiftKey && document.activeElement === firstElement) {
					e.preventDefault()
					lastElement.focus()
				} else if (
					!e.shiftKey &&
					document.activeElement === lastElement
				) {
					e.preventDefault()
					firstElement.focus()
				}
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => document.removeEventListener('keydown', handleKeyDown)
	}, [dialogRef, initialFocusRef, onClose, trapFocus, isEnabled]) // Include isEnabled in dependencies
}
