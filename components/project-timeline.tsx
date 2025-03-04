'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Project, ProjectTimelineEvent } from '@/data/projects'
import { useState } from 'react'

export default function ProjectTimeline() {
	const [activeTimeline, setActiveTimeline] = useState<
		ProjectTimelineEvent[]
	>([])

	return (
		<AnimatePresence>
			{activeTimeline.length > 0 && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm">
					<div
						className="absolute inset-0"
						onClick={() => setActiveTimeline([])}
					/>

					{/* Timeline Sheet with Enhanced Animation */}
					<motion.div
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{
							type: 'spring',
							damping: 30,
							stiffness: 200,
							mass: 0.8,
							ease: [0.22, 1, 0.36, 1],
						}}
						className="relative h-full w-full max-w-xl border-l border-dashed border-neutral-800 bg-neutral-950">
						<div className="flex h-full flex-col">
							{/* Header with Project Info */}
							<div className="border-b border-dashed border-neutral-800 bg-neutral-900/30">
								<div className="flex items-center justify-between p-6">
									<h3 className="font-mono text-lg text-neutral-200">
										Project Timeline
									</h3>
									<button
										onClick={() => setActiveTimeline([])}
										className="text-xs text-neutral-500 hover:text-neutral-300">
										ESC to close
									</button>
								</div>
								<div className="space-y-4 border-t border-dashed border-neutral-800 bg-neutral-900/20 px-6 py-4">
									<div className="flex items-center gap-3 text-sm">
										<span className="text-neutral-400">
											Total Updates:
										</span>
										<span className="font-mono text-emerald-400">
											{activeTimeline.length}
										</span>
										<span className="text-neutral-400">
											•
										</span>
										<span className="text-neutral-400">
											Last Updated:
										</span>
										<span className="font-mono text-neutral-300">
											{format(
												new Date(
													activeTimeline[0].date,
												),
												'MMM dd, yyyy',
											)}
										</span>
									</div>
								</div>
							</div>

							{/* Timeline Content */}
							<div className="flex-1 overflow-y-auto">
								<div className="space-y-1 p-6">
									{activeTimeline.map((event, index) => (
										<motion.div
											key={index}
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{
												duration: 0.3,
												delay: index * 0.1,
												ease: [0.22, 1, 0.36, 1],
											}}
											className="group relative pl-6">
											{/* Timeline Line with Gradient */}
											<div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-neutral-800 via-neutral-800 to-transparent" />

											{/* Event Marker with Hover Effect */}
											<div className="absolute top-1.5 -left-1 flex items-center justify-center">
												<div className="h-2 w-2 rounded-full border border-neutral-700 bg-neutral-900 transition-all duration-300 group-hover:border-neutral-500 group-hover:bg-neutral-800" />
												<div className="absolute h-4 w-4 rounded-full bg-neutral-700/20 opacity-0 transition-all duration-300 group-hover:opacity-100" />
											</div>

											{/* Event Content with Enhanced Hover */}
											<div className="space-y-2 rounded border border-transparent px-4 py-3 transition-all duration-300 group-hover:border-neutral-800 group-hover:bg-neutral-900/30">
												<div className="flex items-center gap-2 text-xs">
													<span className="font-mono text-neutral-500 transition-colors group-hover:text-neutral-400">
														{format(
															new Date(
																event.date,
															),
															'MMM dd, yyyy',
														)}
													</span>
													<span className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-400 transition-colors group-hover:bg-neutral-700/50 group-hover:text-neutral-300">
														{event.type}
													</span>
												</div>
												<h4 className="text-sm text-neutral-300 transition-colors group-hover:text-neutral-200">
													{event.title}
												</h4>
												{event.description && (
													<p className="text-sm text-neutral-500 transition-colors group-hover:text-neutral-400">
														{event.description}
													</p>
												)}
											</div>
										</motion.div>
									))}
								</div>
							</div>

							{/* Footer Stats */}
							<div className="border-t border-dashed border-neutral-800 bg-neutral-900/30 p-4">
								<div className="flex justify-between text-xs text-neutral-500">
									<span>
										First Update:{' '}
										{format(
											new Date(
												activeTimeline[
													activeTimeline.length - 1
												].date,
											),
											'MMM dd, yyyy',
										)}
									</span>
									<span>
										{
											activeTimeline.filter(
												e => e.type === 'feature',
											).length
										}{' '}
										features
									</span>
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
