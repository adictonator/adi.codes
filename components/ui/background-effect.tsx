'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

type BackgroundEffectProps = {
	variant?: 'dots' | 'grid'
	intensity?: number
	opacity?: number
	className?: string
}

export function BackgroundEffect({
	variant = 'grid',
	intensity = 0.5,
	opacity = 0.2,
	className = '',
}: BackgroundEffectProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const { resolvedTheme } = useTheme()
	const isDark = resolvedTheme === 'dark'

	// Get appropriate colors for current theme
	const getPrimaryColor = () =>
		isDark ? 'rgba(120, 149, 203, 0.25)' : 'rgba(30, 64, 124, 0.12)'

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext('2d')
		if (!ctx) return

		let animationId: number

		// Set canvas size to match window size
		const setCanvasSize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}

		// Simple grid pattern with fade effect
		const drawGrid = () => {
			const primaryColor = getPrimaryColor()

			ctx.clearRect(0, 0, canvas.width, canvas.height)

			// Create radial gradient for fading effect
			const centerX = canvas.width / 2
			const centerY = canvas.height / 2
			const radius = Math.max(canvas.width, canvas.height) * 0.8

			// Grid settings
			const cellSize = 60
			const time = Date.now() * 0.0001 * intensity
			const offset = Math.sin(time) * 1.5 * intensity

			// Very minimal grid
			ctx.lineWidth = 0.4

			// Function to calculate opacity based on distance from center
			const getOpacityAtPoint = (x: number, y: number) => {
				const dx = x - centerX
				const dy = y - centerY
				const distance = Math.sqrt(dx * dx + dy * dy)
				return Math.max(0, 1 - distance / radius)
			}

			// Draw horizontal lines with fading
			for (let y = 0; y < canvas.height; y += cellSize) {
				ctx.beginPath()

				// Draw segments with changing opacity
				for (let x = 0; x <= canvas.width; x += canvas.width / 20) {
					const opacity =
						getOpacityAtPoint(x, y) * (isDark ? 0.25 : 0.12)
					ctx.strokeStyle = `rgba(${isDark ? '120, 149, 203' : '30, 64, 124'}, ${opacity})`

					if (x === 0) {
						ctx.moveTo(0, y + offset * 0.3)
					} else {
						ctx.lineTo(x, y + offset * 0.3)
						ctx.stroke()
						ctx.beginPath()
						ctx.moveTo(x, y + offset * 0.3)
					}
				}
			}

			// Draw vertical lines with fading
			for (let x = 0; x < canvas.width; x += cellSize) {
				ctx.beginPath()

				// Draw segments with changing opacity
				for (let y = 0; y <= canvas.height; y += canvas.height / 20) {
					const opacity =
						getOpacityAtPoint(x, y) * (isDark ? 0.25 : 0.12)
					ctx.strokeStyle = `rgba(${isDark ? '120, 149, 203' : '30, 64, 124'}, ${opacity})`

					if (y === 0) {
						ctx.moveTo(x + offset * 0.3, 0)
					} else {
						ctx.lineTo(x + offset * 0.3, y)
						ctx.stroke()
						ctx.beginPath()
						ctx.moveTo(x + offset * 0.3, y)
					}
				}
			}

			animationId = requestAnimationFrame(drawGrid)
		}

		const renderEffect = () => {
			setCanvasSize()

			switch (variant) {
				case 'grid':
					drawGrid()
					break
			}
		}

		window.addEventListener('resize', setCanvasSize)
		renderEffect()

		return () => {
			window.removeEventListener('resize', setCanvasSize)
			cancelAnimationFrame(animationId)
		}
	}, [variant, intensity, isDark])

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity }}
			transition={{ duration: 1 }}
			className={`pointer-events-none fixed inset-0 ${className}`}
			style={{ zIndex: -10 }}>
			<canvas ref={canvasRef} className="size-full" />
		</motion.div>
	)
}
