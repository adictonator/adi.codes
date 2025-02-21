'use client'

import { experiences, icons } from '@/data/experience'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, Briefcase, Globe, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function TimelineExperience() {
	const [expandedId, setExpandedId] = useState<number | null>(null)

	return (
		<div className="relative grid grid-cols-2 divide-x divide-y divide-dashed divide-neutral-700/80">
			{experiences.map((exp, index) => {
				const Icon = icons[exp.type]
				const isExpanded = expandedId === index

				return (
					<div
						key={index}
						className="group relative aspect-square bg-neutral-950 transition-colors hover:bg-neutral-950/95 md:p-8">
						{(index === 0 ||
							exp.period.split(' - ')[0] !==
								experiences[index - 1].period.split(
									' - ',
								)[0]) && (
							<div className="absolute right-4 bottom-4 font-mono text-8xl font-medium tracking-wider text-amber-200 opacity-20 group-hover:opacity-50">
								{exp.period.split(' - ')[0]}
							</div>
						)}
						{/* Header - Always Visible */}
						<Icon size={20} className="text-blue-400" />

						{/* Title & Company */}
						<div className="flex-1 text-left">
							<h3 className="font-medium text-gray-200">
								{exp.role}
							</h3>
							<p className="text-sm text-gray-500">
								{exp.company} • {exp.location}
							</p>
							<div className="grid gap-6 p-5 sm:grid-cols-5">
								{/* Achievements */}
								<div className="space-y-3 sm:col-span-3">
									<h4 className="text-xs font-medium tracking-wider text-gray-400 uppercase">
										Key Achievements
									</h4>
									<ul className="space-y-2">
										{exp.details.achievements.map(
											(achievement, i) => (
												<motion.li
													key={i}
													initial={{
														opacity: 0,
														x: -20,
													}}
													animate={{
														opacity: 1,
														x: 0,
													}}
													transition={{
														delay: i * 0.1,
													}}
													className="flex gap-2 text-sm text-gray-400">
													<span className="text-blue-400 select-none">
														›
													</span>
													{achievement}
												</motion.li>
											),
										)}
									</ul>
								</div>

								{/* Skills */}
								<div className="sm:col-span-2">
									<h4 className="mb-3 text-xs font-medium tracking-wider text-gray-400 uppercase">
										Technologies
									</h4>
									<div className="flex flex-wrap gap-1.5">
										{exp.details.skills.map((skill, i) => (
											<motion.span
												key={skill}
												initial={{
													opacity: 0,
													scale: 0.9,
												}}
												animate={{
													opacity: 1,
													scale: 1,
												}}
												transition={{
													delay: i * 0.05,
												}}
												className="rounded-full bg-blue-500/5 px-2.5 py-0.5 text-xs text-blue-400">
												{skill}
											</motion.span>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
