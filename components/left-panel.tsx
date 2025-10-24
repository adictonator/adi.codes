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
	const transition: any = {
		type: 'spring',
		stiffness: 125, // Increased from 100
		damping: 15, // Reduced from 20
		mass: 0.2, // Reduced from 0.3
	}

	return (
		<div className="bg-foreground relative hidden flex-col justify-end p-4 sm:p-5 md:flex md:w-1/2 md:p-5 lg:w-1/2 lg:p-6">
			<AnimatePresence mode="wait">
				<motion.div
					key={activeSection}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={transition}
					className="relative">
					{activeSection === 'about' ? (
						<h1 className="animate-gradient from-primary via-accent to-primary font-source flex w-fit flex-col bg-linear-to-r bg-clip-text text-transparent">
							<small className="text-4xl sm:text-5xl md:text-5xl lg:text-7xl">
								Hey! I'm
							</small>
							<span
								className="2xl:text-14xl xl:text-10xl cursor-e-resize text-5xl font-bold sm:text-6xl md:text-7xl 2xl:leading-72"
								title="Go ahead, click me!"
								onClick={handleNameClick}>
								Aditya
								{/*<span id="typingName"></span>*/}
							</span>
						</h1>
					) : (
						<div className="space-y-4">
							<h2 className="animate-gradient from-primary via-accent to-primary font-source flex flex-col bg-linear-to-r bg-clip-text text-transparent">
								{sectionContent[activeSection]?.subheading && (
									<small className="text-lg sm:text-2xl md:text-2xl lg:text-4xl">
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
							<p className="text-base text-gray-400 sm:text-lg md:text-lg lg:max-w-5xl lg:pb-14">
								{sectionContent[activeSection].description}
							</p>
						</div>
					)}
				</motion.div>
			</AnimatePresence>
		</div>
	)
}
