'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { sectionContent } from '@/data/left-panel-content'
import { useNameExpander } from '@/hooks/use-name-expander'

export default function LeftPanel({
	activeSection,
}: {
	activeSection: string
}) {
	const { handleNameClick } = useNameExpander({
		fullName: ' Bhaskar Sharma',
		elementId: 'typingName',
	})

	// Faster spring animation (25% quicker)
	const transition = {
		type: 'spring',
		stiffness: 125, // Increased from 100
		damping: 15, // Reduced from 20
		mass: 0.2, // Reduced from 0.3
	}

	return (
		<div className="relative grid size-full p-4 md:max-w-7xl md:p-6">
			<AnimatePresence mode="wait">
				<motion.div
					key={activeSection}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={transition}
					className="relative self-end">
					{activeSection === 'about' ? (
						<h1 className="animate-gradient from-primary via-accent to-primary font-source flex w-fit flex-col bg-gradient-to-r bg-clip-text text-transparent">
							<small className="md:pl-10 md:text-7xl">
								Hey! I'm
							</small>
							<span
								className="lg:text-14xl cursor-e-resize text-4xl font-bold sm:text-5xl md:text-6xl lg:leading-72"
								title="Go ahead, click me!"
								onClick={handleNameClick}>
								Aditya
								{/*<span id="typingName"></span>*/}
							</span>
						</h1>
					) : (
						<div className="space-y-4">
							<h2 className="animate-gradient from-primary via-accent to-primary font-source flex flex-col bg-gradient-to-r bg-clip-text text-transparent">
								{sectionContent[activeSection]?.subheading && (
									<small className="md:pl-0 md:text-xl lg:text-4xl">
										{
											sectionContent[activeSection]
												.subheading
										}
									</small>
								)}
								<span className="text-4xl font-bold underline-offset-8 sm:text-5xl md:text-6xl lg:text-9xl lg:leading-snug">
									{sectionContent[activeSection].title}
								</span>
							</h2>
							<p className="text-lg text-gray-400 md:max-w-5xl md:pb-14">
								{sectionContent[activeSection].description}
							</p>
						</div>
					)}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
