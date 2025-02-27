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
				<div className="grid grid-cols-1 items-stretch divide-x divide-dashed divide-neutral-700/80 border-b border-dashed border-neutral-700/80 md:grid-cols-2">
					{services.map(service => (
						<motion.div
							key={service.type}
							className="group relative z-10 md:p-6"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}>
							<div className="space-y-4">
								<div className="flex items-center gap-3">
									{service.type === 'project-discovery' ? (
										<Blocks className="h-5 w-5 text-amber-500" />
									) : (
										<Code2 className="h-5 w-5 text-blue-500" />
									)}
									<h3 className="text-xl font-light text-neutral-200">
										{service.title}
									</h3>
								</div>
								<p className="text-sm text-neutral-400">
									{service.description}
								</p>
							</div>

							<div className="mt-8 space-y-4">
								<div className="flex items-center gap-2">
									<Terminal className="h-3.5 w-3.5 text-emerald-500" />
									<h4 className="text-muted-foreground text-xs tracking-wider uppercase">
										Key Features
									</h4>
								</div>

								{/* Terminal-inspired feature display */}
								<div className="relative rounded-lg border border-neutral-800 bg-neutral-900/50">
									{/* Terminal header */}
									<div className="flex items-center gap-1.5 border-b border-neutral-800 bg-neutral-900/80 px-3 py-1.5">
										<span className="size-2 rounded-full bg-red-500/70"></span>
										<span className="size-2 rounded-full bg-yellow-500/70"></span>
										<span className="size-2 rounded-full bg-green-500/70"></span>
										<span className="text-muted-foreground ml-2 text-xs">
											features.json
										</span>
									</div>

									<div className="p-3 text-xs">
										<div className="text-blue-400">
											{'{'}
										</div>
										<div className="ml-4 text-neutral-400">
											"features": [
										</div>

										{service.features.map((feature, i) => (
											<motion.div
												key={i}
												initial={{ opacity: 0, x: -5 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{ delay: i * 0.1 }}
												className="group/feature ml-8">
												<div className="flex items-center gap-3">
													<span className="text-green-400">
														"
													</span>
													<div className="flex items-center gap-2 py-1.5">
														<motion.span
															initial={{
																opacity: 0.5,
																scale: 0.9,
															}}
															whileHover={{
																opacity: 1,
																scale: 1,
															}}
															className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800/70 text-emerald-400 opacity-70 transition-all group-hover/feature:bg-emerald-500/20">
															{/* Dynamic icon based on feature content */}
															{getFeatureIcon(
																feature,
															)}
														</motion.span>

														<span className="text-neutral-300 transition-colors group-hover/feature:text-neutral-200">
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

										<div className="ml-4 text-neutral-400">
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

				<div className="flex items-center justify-stretch divide-x divide-dashed divide-neutral-700/80 md:h-14 md:grid-cols-4">
					<div className="flex h-full flex-1 flex-col items-center justify-center gap-1">
						<span className="text-muted-foreground text-xs">
							next available
						</span>
						<span className="text-sm text-emerald-400">
							March 2024
						</span>
					</div>
					<div className="flex h-full flex-1 flex-col items-center justify-center gap-1">
						<span className="text-muted-foreground text-xs">
							successful projects
						</span>
						<span className="text-primary text-sm">
							50+ Delivered
						</span>
					</div>
					<div className="flex flex-1 flex-col items-center justify-center gap-1">
						<span className="text-muted-foreground text-xs">
							timezone
						</span>
						<span className="text-primary h-full text-sm">
							GMT+5:30
						</span>
					</div>
					<div className="flex flex-1 flex-col items-center justify-center gap-1">
						<span className="text-muted-foreground text-xs">
							location
						</span>
						<span className="text-primary h-full text-sm">
							Remote Worldwide
						</span>
					</div>
				</div>

				<div className="divide-border border-border flex items-stretch justify-stretch divide-x divide-dashed border-t border-dashed md:h-16 md:grid-cols-4">
					<button
						onClick={() => setShowBooking(true)}
						className="flex flex-1 cursor-pointer items-center justify-center gap-2 text-center text-xl text-neutral-300 transition-colors">
						<Calendar className="size-4" />
						schedule call
					</button>
					<a
						href={`mailto:hello@example.com?subject=Project Inquiry`}
						className="flex flex-1 items-center justify-center gap-2 text-lg transition-colors">
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
				<div className="max-h-[500px] overflow-hidden">
					<CalWidget />
				</div>
			</Dialog>
		</>
	)
}
