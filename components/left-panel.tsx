'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { Moon, Sun } from 'lucide-react'

const sectionContent: Record<
	string,
	{ subheading: string; title: string; items: string[] }
> = {
	//about: {
	//	title: 'About Me',
	//	items: [
	//		'Full Stack Developer',
	//		'Cloud Architecture',
	//		'Team Leadership',
	//	],
	//},
	experience: {
		subheading: 'Experience',
		title: 'Career Highlights',
		items: [
			'10+ Years Experience',
			'50+ Projects Delivered',
			'3 Industry Awards',
		],
	},
	skills: {
		title: 'Core Skills',
		items: [
			'Frontend Development',
			'Backend Systems',
			'Cloud Infrastructure',
		],
	},
	projects: {
		title: 'Project Focus',
		items: ['Web Applications', 'API Design', 'System Architecture'],
	},
	opensource: {
		title: 'Open Source',
		items: ['Active Contributor', 'Project Maintainer', 'Community Member'],
	},
	uses: {
		title: 'Tech Stack',
		items: ['Modern Tools', 'Best Practices', 'Efficient Workflows'],
	},
	lab: {
		title: 'Experiments',
		items: ['Innovation', 'Research', 'Prototypes'],
	},
	blog: {
		title: 'Writing',
		items: ['Technical Guides', 'Industry Insights', 'Best Practices'],
	},
	hire: {
		title: 'Work With Me',
		items: [
			'Available for Projects',
			'Remote Collaboration',
			'Technical Leadership',
		],
	},
}

export default function LeftPanel({
	activeSection,
}: {
	activeSection: string
}) {
	const { theme, setTheme } = useTheme()

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

				<AnimatePresence mode="wait">
					{sectionContent[activeSection] && (
						<motion.div
							key={activeSection}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							className="absolute bottom-20 space-y-4">
							<h2 className="text-2xl text-blue-400">
								{sectionContent[activeSection].title}
							</h2>
							<div className="space-y-2">
								{sectionContent[activeSection].items.map(
									(item, i) => (
										<motion.p
											key={item}
											initial={{ opacity: 0, x: -20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{ delay: i * 0.1 }}
											className="text-gray-400">
											{item}
										</motion.p>
									),
								)}
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Theme Toggle */}
				<div className="absolute right-0 bottom-0">
					<Button
						variant="outline"
						size="icon"
						onClick={() =>
							setTheme(theme === 'light' ? 'dark' : 'light')
						}>
						<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>
			</motion.div>
		</div>
	)
}
