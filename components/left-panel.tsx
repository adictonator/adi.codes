'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'

type PanelContent = {
	[key: string]: {
		title: string
		titleColor: string
		content: {
			type: 'list' | 'tags'
			items: string[]
		}
	}
}

const panelContent: PanelContent = {
	experience: {
		title: 'Career Highlights',
		titleColor: 'text-blue-400',
		content: {
			type: 'list',
			items: [
				'10+ Years Experience',
				'50+ Projects Delivered',
				'3 Industry Awards',
			],
		},
	},
	projects: {
		title: 'Tech Stack',
		titleColor: 'text-blue-400',
		content: {
			type: 'tags',
			items: ['React', 'Node.js', 'TypeScript', 'Python', 'AWS'],
		},
	},
	skills: {
		title: 'Expertise Areas',
		titleColor: 'text-green-400',
		content: {
			type: 'tags',
			items: ['Frontend', 'Backend', 'DevOps', 'Architecture'],
		},
	},
}

export default function LeftPanel({
	activeSection,
}: {
	activeSection: string
}) {
	const { theme, setTheme } = useTheme()

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (
		<div className="grid size-full max-w-7xl p-4 md:p-6 dark:bg-neutral-950/85">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
				className="relative self-end">
				{/* Main heading - always visible */}
				<h1 className="animate-gradient from-primary via-accent to-primary font-source flex flex-col bg-gradient-to-r bg-clip-text text-transparent">
					<small className="md:pl-10 md:text-7xl">Hey! I'm</small>
					<>
						<span
							className="lg:text-14xl cursor-e-resize text-4xl font-bold sm:text-5xl md:text-6xl lg:leading-64"
							title="Go ahead, click me!"
							onClick={() => {
								const fullName = ' Bhaskar Sharma'
								const nameSpan =
									document.querySelector('#typingName')
								if (!nameSpan) return

								if (nameSpan.textContent === fullName) {
									// Reverse animation
									let i = fullName.length
									const interval = setInterval(() => {
										if (i >= 0) {
											nameSpan.textContent =
												fullName.substring(0, i)
											i--
										} else {
											clearInterval(interval)
											nameSpan.parentElement?.setAttribute(
												'title',
												'Go ahead, click me!',
											)
											nameSpan.parentElement?.classList.remove(
												'cursor-w-resize',
											)
											nameSpan.parentElement?.classList.add(
												'cursor-e-resize',
											)
										}
									}, 100)
								} else {
									// Forward animation
									let i = 0
									nameSpan.textContent = ''
									const interval = setInterval(() => {
										if (i <= fullName.length) {
											nameSpan.textContent =
												fullName.substring(0, i)
											i++
										} else {
											clearInterval(interval)
											nameSpan.parentElement?.setAttribute(
												'title',
												'This is what you asked for! Click me again!',
											)
											nameSpan.parentElement?.classList.remove(
												'cursor-e-resize',
											)
											nameSpan.parentElement?.classList.add(
												'cursor-w-resize',
											)
										}
									}, 100)
								}
							}}>
							Aditya
							<span id="typingName"></span>
						</span>
					</>
				</h1>

				<div className="absolute bottom-10 hidden">
					{panelContent[activeSection] && (
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="space-y-4">
							<h2
								className={`text-2xl ${panelContent[activeSection].titleColor}`}>
								{panelContent[activeSection].title}
							</h2>

							{panelContent[activeSection].content.type ===
							'list' ? (
								<div className="text-gray-400">
									{panelContent[
										activeSection
									].content.items.map((item, i) => (
										<p key={i}>{item}</p>
									))}
								</div>
							) : (
								<div className="flex flex-wrap gap-2">
									{panelContent[
										activeSection
									].content.items.map((item, i) => (
										<span
											key={i}
											className="rounded-full bg-gray-800 px-3 py-1 text-sm">
											{item}
										</span>
									))}
								</div>
							)}
						</motion.div>
					)}

					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="text-gray-400">
						Based in [Your Location]
					</motion.p>

					<div className="top-0 right-0">
						<Button
							variant="outline"
							size="icon"
							onClick={toggleTheme}>
							<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
							<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</div>
				</div>
			</motion.div>
		</div>
	)
}
