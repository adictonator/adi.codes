'use client'

import React, { createContext, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'

// Types
type ToastType = 'default' | 'success' | 'error' | 'warning'
type Toast = {
	id: number
	message: string
	type: ToastType
}

// Context
type ToastContextType = {
	showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

// Provider Component
export function ToastProvider({ children }: { children: React.ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([])

	const showToast = (message: string, type: ToastType = 'default') => {
		const id = Date.now()
		setToasts(prev => [...prev, { id, message, type }])

		// Auto-remove after animation
		setTimeout(() => {
			setToasts(prev => prev.filter(toast => toast.id !== id))
		}, 5000)
	}

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			{typeof window !== 'undefined' &&
				createPortal(
					<AnimatePresence>
						{toasts.map(toast => (
							<motion.div
								key={toast.id}
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}
								transition={{ duration: 0.3 }}
								role="status"
								className="text-primary bg-secondary fixed inset-x-4 bottom-24 z-100 mx-auto w-fit max-w-md border-2 border-dashed border-yellow-300/30 px-6 py-3 text-center text-sm md:bottom-8 md:text-base">
								{toast.message}
							</motion.div>
						))}
					</AnimatePresence>,
					document.body,
				)}
		</ToastContext.Provider>
	)
}

// Hook for easy access
export function useToast() {
	const context = useContext(ToastContext)

	if (!context) {
		throw new Error('useToast must be used within a ToastProvider')
	}

	return context
}
