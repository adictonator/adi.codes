'use client'

import { skills } from '@/data/skills'
import { motion } from 'framer-motion'

export default function SkillsShowcase({
	selectedCategory,
}: {
	selectedCategory: string | null
}) {
	const filteredSkills = skills.filter(
		skill => !selectedCategory || skill.category === selectedCategory,
	)

	return (
		<div className="divide-border *:border-border 3xl:grid-cols-3 grid grid-cols-2 divide-x divide-dashed *:border-b *:border-dashed last:*:border-r [&:has(>:nth-child(4))]:divide-y [&:not(:has(>:nth-child(4)))]:divide-y-0 [&:not(:has(>:nth-child(4)))>*]:border-b-0 [&>*:last-child]:border-b-0">
			{filteredSkills.map((skill, index) => (
				<motion.div
					key={skill.name}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ delay: index * 0.1 }}
					className="group/skill hover:bg-secondary relative grid h-full min-w-0 overflow-hidden px-3 py-2 sm:px-4 sm:py-2.5 md:aspect-auto md:p-4 2xl:aspect-video 2xl:p-6">
					<div className="flex flex-col items-start justify-between max-md:flex-col md:flex-col lg:flex-row">
						<div className="flex w-full flex-1 flex-col">
							<div className="flex items-center gap-2 md:gap-3">
								<h3 className="text-primary text-base font-normal sm:text-lg md:text-lg lg:text-2xl">
									{skill.name}
								</h3>
							</div>
							<div className="mt-2 flex items-center gap-1 text-[11px] font-light sm:text-xs md:gap-2 md:text-xs lg:gap-3 lg:text-sm">
								<span className="text-muted max-md:hidden">
									{skill.category}
								</span>
								<span className="text-muted-foreground max-md:hidden">
									&bull;
								</span>
								<span className="text-muted group-hover/skill:text-primary duration-300">
									{skill.yearsOfExperience}y exp
								</span>
								<span className="text-muted-foreground">
									&bull;
								</span>
								<span className="text-muted text-[10px] sm:text-xs lg:text-sm">
									{skill.projectCount}{' '}
									{skill.projectCount > 1
										? 'projects'
										: 'project'}
								</span>
							</div>
						</div>

						<div className="mt-2 text-right md:mt-0 lg:ml-4 lg:self-start">
							<span className="text-primary text-sm font-light tracking-tighter sm:text-base md:text-2xl lg:text-3xl">
								{skill.expertise}
							</span>
							<span className="text-muted text-xs font-light sm:text-sm lg:text-base">
								%
							</span>
						</div>
					</div>

					<div className="mt-3 hidden flex-wrap gap-1 self-start md:mt-2 md:flex md:gap-1.5 lg:gap-1.5">
						{skill.tags.map(tag => (
							<span
								key={tag}
								className="bg-white/5 px-2 py-0.5 text-[9px] font-light tracking-wider text-white/60 sm:px-2.5 sm:text-xs lg:px-3 lg:py-1 lg:text-xs">
								{tag}
							</span>
						))}
					</div>

					<div className="bg-muted-foreground mt-2 h-1 w-full self-end overflow-hidden md:mt-1.5 lg:mt-2">
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: `${skill.expertise}%` }}
							transition={{
								duration: 1,
								ease: [0.32, 0.72, 0, 1],
							}}
							className="bg-foreground h-full transition-[background-color] duration-300 group-hover/skill:bg-[var(--brand-color)]"
							style={
								{
									'--brand-color': skill.brandColor,
								} as React.CSSProperties
							}
						/>
					</div>
				</motion.div>
			))}
		</div>
	)
}
