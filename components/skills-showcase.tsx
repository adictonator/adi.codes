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
		<div className="divide-border [&>*]:border-border grid grid-cols-1 divide-x divide-dashed md:grid-cols-2 lg:grid-cols-3 [&:has(>:nth-child(4))]:divide-y [&:not(:has(>:nth-child(4)))]:divide-y-0 [&:not(:has(>:nth-child(4)))>*]:border-b-0 [&>*]:border-b [&>*]:border-dashed last:[&>*]:border-r [&>*:last-child]:border-b-0">
			{filteredSkills.map((skill, index) => (
				<motion.div
					key={skill.name}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ delay: index * 0.1 }}
					className="group hover:bg-secondary relative grid aspect-video h-full overflow-hidden md:p-6">
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<div className="flex items-center gap-3">
								<h3 className="text-primary text-2xl font-normal">
									{skill.name}
								</h3>
							</div>
							<div className="mt-2 flex items-center gap-3 text-sm font-light">
								<span className="text-muted">
									{skill.category}
								</span>
								<span className="text-muted-foreground">
									&bull;
								</span>
								<span className="text-muted group-hover:text-primary duration-300">
									{skill.yearsOfExperience}y exp
								</span>
								<span className="text-muted-foreground">
									&bull;
								</span>
								<span className="text-muted">
									{skill.projectCount}{' '}
									{skill.projectCount > 1
										? 'projects'
										: 'project'}
								</span>
							</div>
						</div>

						<div className="ml-4 text-right">
							<span className="text-primary text-3xl font-light tracking-tighter">
								{skill.expertise}
							</span>
							<span className="text-muted font-light">%</span>
						</div>
					</div>

					<div className="flex flex-wrap gap-1.5 self-start">
						{skill.tags.map(tag => (
							<span
								key={tag}
								className="bg-white/5 px-3 py-1 text-xs font-light tracking-wider text-white/60">
								{tag}
							</span>
						))}
					</div>

					<div className="bg-muted-foreground mt-2 h-1 w-full self-end overflow-hidden">
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: `${skill.expertise}%` }}
							transition={{
								duration: 1,
								ease: [0.32, 0.72, 0, 1],
							}}
							className="bg-foreground h-full transition-[background-color] duration-300 group-hover:bg-[var(--brand-color)]"
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
