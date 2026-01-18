'use client'

import { experiences } from '@/data/experience'
import { motion } from 'framer-motion'
import { Briefcase, ChevronRight, University } from 'lucide-react'

export default function TimelineExperience() {
	return (
		<div className="divide-border relative grid min-w-0 divide-y divide-dashed sm:gap-x-4 md:grid-cols-2 md:gap-x-0 md:divide-x">
			{experiences.map((exp, index) => {
				const [startYear, endYear] = exp.period.split(' - ')

				return (
					<article
						key={index}
						className="group hover:bg-secondary relative grid transition-colors">
						<section className="flex-1 p-3 text-left sm:p-4 md:p-5 lg:p-8">
							{exp.type === 'education' ? (
								<University
									className="stroke-border size-5 lg:size-10"
									strokeWidth={1}
								/>
							) : (
								<Briefcase
									className="size-5 stroke-neutral-700/80 lg:size-10"
									strokeWidth={1}
								/>
							)}
							<h3 className="mt-2.5 text-lg font-medium text-neutral-300 sm:text-xl md:text-xl lg:text-2xl">
								{exp.role}
							</h3>
							<p className="mt-1.5 flex items-center text-xs text-gray-500 sm:text-sm md:mt-2.5">
								{/*{exp.type} &bull;*/}
								{exp.company} &bull; {exp.location}
							</p>

							{/*<p>
								{exp.companyUrl ? (
									<a
										href={exp.companyUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1 text-sm text-blue-400 hover:underline">
										<Globe size={16} />
										{exp.companyUrl}
									</a>
								) : (
									<span className="text-sm text-gray-500">
										{exp.company}
									</span>
								)}
							</p>*/}

							<p className="text-muted mt-3.5 text-base md:text-base lg:text-lg">
								{exp.summary}
							</p>

							<div className="mt-6 grid gap-4 p-3 sm:gap-6 sm:p-4 md:mt-4 md:grid-cols-1 md:p-5 lg:grid-cols-5 lg:p-0">
								{/* Achievements */}
								<div className="space-y-3 sm:col-span-1 lg:col-span-3">
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
													className="flex gap-2 text-xs text-gray-400 sm:text-sm">
													<ChevronRight
														className="mt-1 size-3 shrink-0 stroke-teal-400 sm:size-3.5"
														strokeWidth={1}
													/>
													{/*<span className="text-teal-400 select-none">
														›
													</span>*/}
													{achievement}
												</motion.li>
											),
										)}
									</ul>
								</div>
							</div>
						</section>

						<div className="relative right-4 bottom-0 w-full self-end overflow-hidden text-5xl font-medium tracking-wider text-amber-200/20 group-hover:text-amber-200/50 lg:text-8xl">
							<div className="flex w-auto transform items-center justify-end justify-self-end whitespace-nowrap">
								<div className="translate-x-0 text-right transition-transform duration-300 ease-out group-hover:mr-8 group-hover:-translate-x-full">
									{startYear}
								</div>
								<div className="absolute flex translate-x-full transform items-center transition-transform duration-300 ease-out group-hover:-translate-x-0">
									<span className="text-2xl md:text-5xl">
										&#10035;
									</span>
									<span>{endYear}</span>
								</div>
							</div>
						</div>
					</article>
				)
			})}
		</div>
	)
}
