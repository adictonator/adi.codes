'use client'

import { services } from '@/data/hire'
import { motion } from 'framer-motion'
import {
	Terminal,
	Calendar,
	Code2,
	Blocks,
	Zap,
	GitMerge,
	Shield,
	Clock,
	Folder,
	Award,
} from 'lucide-react'
import { useState } from 'react'
import CalWidget from './cal-widget'
import { Dialog } from './ui/dialog'

export default function HireMe() {
	const [showBooking, setShowBooking] = useState(false)

	// Generate a unique icon for each feature based on its content
	const getFeatureIcon = (feature: string) => {
		const icons = [Shield, Zap, GitMerge, Award, Clock, Folder]
		// Simple hash function to always get the same icon for the same feature
		const hash = feature.split('').reduce((a, b) => a + b.charCodeAt(0), 0)
		const Icon = icons[hash % icons.length]
		return <Icon className="h-4 w-4" />
	}

	return (
		<>
			<div className="relative">
				<div className="divide-border border-border grid min-w-0 grid-cols-1 items-stretch divide-dashed border-b border-dashed sm:gap-x-4 md:gap-x-6 md:divide-x lg:gap-x-8 xl:divide-y 2xl:grid-cols-2">
					{services.map(service => (
						<motion.div
							key={service.type}
							className="group relative p-3 sm:p-4 md:p-5 lg:p-6"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}>
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									{service.type === 'project-discovery' ? (
										<Blocks className="h-5 w-5 text-amber-500" />
									) : (
										<Code2 className="h-5 w-5 text-blue-500" />
									)}
									<h3 className="text-lg font-light text-neutral-200 sm:text-xl md:text-xl lg:text-2xl">
										{service.title}
									</h3>
								</div>
								<p className="text-xs text-neutral-400 sm:text-sm md:text-sm lg:text-base">
									{service.description}
								</p>
							</div>

							<div className="mt-8 space-y-4 md:mt-6 lg:mt-8">
								<div className="flex items-center gap-2">
									<Terminal className="h-3 w-3 text-emerald-500 sm:h-3.5 sm:w-3.5 lg:h-4 lg:w-4" />
									<h4 className="text-muted-foreground text-xs tracking-wider uppercase md:text-xs lg:text-sm">
										Key Features
									</h4>
								</div>

								{/* Terminal-inspired feature display */}
								<div className="relative rounded-lg border border-neutral-800 bg-neutral-900/50">
									{/* Terminal header */}
									<div className="flex items-center gap-1 border-b border-neutral-800 bg-neutral-900/80 px-2 py-1 sm:px-3 sm:py-1.5">
										<span className="size-2 rounded-full bg-red-500/70"></span>
										<span className="size-2 rounded-full bg-yellow-500/70"></span>
										<span className="size-2 rounded-full bg-green-500/70"></span>
										<span className="text-muted-foreground ml-2 text-[9px] sm:text-xs">
											features.json
										</span>
									</div>

									<div className="p-2 text-[10px] sm:p-3 sm:text-xs md:p-3 lg:text-sm">
										<div className="text-blue-400">
											{'{'}
										</div>
										<div className="ml-3 text-[9px] text-neutral-400 sm:ml-4 sm:text-xs lg:text-sm">
											"features": [
										</div>

										{service.features.map((feature, i) => (
											<motion.div
												key={i}
												initial={{ opacity: 0, x: -5 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: i * 0.1 }}
												className="group/feature ml-4 sm:ml-6 lg:ml-8">
												<div className="flex items-center gap-2 sm:gap-3">
													<span className="text-green-400">
														"
													</span>
													<div className="flex items-center gap-2 py-1">
														<motion.span
															initial={{
																opacity: 0.5,
																scale: 0.9,
															}}
															whileHover={{
																opacity: 1,
																scale: 1,
															}}
															className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-800/70 text-[8px] text-emerald-400 opacity-70 transition-all group-hover/feature:bg-emerald-500/20 sm:h-5 sm:w-5 sm:text-xs lg:h-6 lg:w-6">
															{/* Dynamic icon based on feature content */}
															{getFeatureIcon(
																feature,
															)}
														</motion.span>

														<span className="text-[9px] text-neutral-300 transition-colors group-hover/feature:text-neutral-200 sm:text-xs lg:text-sm">
															{feature}
														</span>
													</div>
													<span className="text-green-400">
														"
													</span>
													{i <
														service.features
															.length -
															1 && (
														<span className="text-neutral-500">
															,
														</span>
													)}
												</div>
											</motion.div>
										))}

										<div className="ml-3 text-[9px] text-neutral-400 sm:ml-4 sm:text-xs lg:text-sm">
											]
										</div>
										<div className="text-blue-400">
											{'}'}
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>

				<div className="divide-border flex items-center justify-stretch divide-x divide-dashed md:h-12 md:grid-cols-4 lg:h-14">
					<div className="flex h-auto flex-1 flex-col items-center justify-center gap-1 py-3 md:h-full md:py-0">
						<span className="text-muted-foreground text-xs md:text-xs">
							next available
						</span>
						<span className="text-sm text-emerald-400 md:text-base">
							March 2024
						</span>
					</div>
					<div className="hidden h-full flex-1 flex-col items-center justify-center gap-1 md:flex">
						<span className="text-muted-foreground text-xs">
							successful projects
						</span>
						<span className="text-primary text-sm md:text-base">
							50+ Delivered
						</span>
					</div>
					<div className="flex h-auto flex-1 flex-col items-center justify-center gap-1 py-3 md:h-full md:py-0">
						<span className="text-muted-foreground text-xs md:text-xs">
							timezone
						</span>
						<span className="text-primary text-sm md:text-base">
							GMT+5:30
						</span>
					</div>
					<div className="hidden flex-1 flex-col items-center justify-center gap-1 md:flex">
						<span className="text-muted-foreground text-xs">
							location
						</span>
						<span className="text-primary text-sm md:text-base">
							Remote Worldwide
						</span>
					</div>
				</div>

				<div className="divide-border border-border flex items-stretch justify-stretch divide-dashed border-t border-dashed max-md:flex-col max-md:divide-y md:h-14 md:grid-cols-4 md:divide-x lg:h-16">
					<button
						onClick={() => setShowBooking(true)}
						className="flex flex-1 cursor-pointer items-center justify-center gap-2 py-3 text-center text-base text-neutral-300 transition-colors sm:text-lg md:py-0 md:text-xl">
						<Calendar className="size-4" />
						schedule call
					</button>
					<a
						href={`mailto:hello@example.com?subject=Project Inquiry`}
						className="flex flex-1 items-center justify-center gap-2 py-2.5 text-xs transition-colors sm:text-sm md:py-0 md:text-lg">
						prefer email?
					</a>
				</div>
			</div>

			<Dialog
				isOpen={showBooking}
				onClose={() => setShowBooking(false)}
				content={{
					category: 'project-discovery',
					name: 'Discovery Call',
					description:
						"Let's discuss your project requirements and explore how we can work together.",
				}}>
				<div className="max-h-56 overflow-hidden md:max-h-[500px]">
					<CalWidget />
				</div>
			</Dialog>
		</>
	)
}
