'use client'

import { experiences } from '@/data/experience'
import { motion } from 'framer-motion'
import { Briefcase, ChevronRight, University } from 'lucide-react'
import { useMounted } from '@/hooks/use-mounted'

export default function TimelineExperience() {
	const mounted = useMounted()

	return (
		// Cells draw right/bottom borders; the wrapper clips the outer edges.
		<div className="overflow-hidden">
		<div className="relative -mr-px -mb-px grid min-w-0 md:grid-cols-2">
			{experiences.map((exp, index) => {
				const [startYear, endYear] = exp.period.split(' - ')

				return (
					<article
						key={index}
						className="group hover:bg-secondary border-border relative grid border-r border-b border-dashed transition-colors">
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
							<p className="mt-1.5 text-xs text-neutral-500 sm:text-sm md:mt-2.5">
								{exp.companyUrl ? (
									<a
										href={exp.companyUrl}
										target="_blank"
										rel="noopener noreferrer"
										className="border-border hover:text-primary border-b border-dashed">
										{exp.company}
									</a>
								) : (
									exp.company
								)}{' '}
								&bull; {exp.location} &bull; {exp.period.replace('CURR', 'now')}
							</p>

							<p className="text-muted mt-3.5 text-base md:text-base lg:text-lg">
								{exp.summary}
							</p>

							<div className="mt-6 md:mt-5">
								<div className="space-y-3">
									<h4 className="text-xs font-medium tracking-wider text-neutral-400 uppercase">
										{exp.type === 'education'
											? 'Highlights'
											: 'Key achievements'}
									</h4>
									<ul className="space-y-2">
										{exp.details.achievements.map(
											(achievement, i) => (
												<motion.li
													key={i}
													initial={
														mounted
															? { opacity: 0, x: -20 }
															: false
													}
													animate={{
														opacity: 1,
														x: 0,
													}}
													transition={{
														delay: i * 0.1,
													}}
													className="flex gap-2 text-xs leading-relaxed text-neutral-400 sm:text-sm">
													<ChevronRight
														className="mt-1 size-3 shrink-0 stroke-teal-400 sm:size-3.5"
														strokeWidth={1}
													/>
													{achievement}
												</motion.li>
											),
										)}
									</ul>
								</div>
							</div>
						</section>

						<div aria-hidden="true" className="relative right-4 bottom-0 w-full self-end overflow-hidden text-5xl font-medium tracking-wider text-amber-700/15 group-hover:text-amber-700/40 lg:text-8xl dark:text-amber-200/20 dark:group-hover:text-amber-200/50">
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
		</div>
	)
}
