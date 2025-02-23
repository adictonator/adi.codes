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
		<div
			className={`grid grid-cols-1 divide-x divide-dashed divide-neutral-700/80 md:grid-cols-2 lg:grid-cols-3 [&:has(>:nth-child(4))]:divide-y [&:not(:has(>:nth-child(4)))]:divide-y-0 [&:not(:has(>:nth-child(4)))>*]:border-b-0 [&>*]:border-b [&>*]:border-dashed [&>*]:border-neutral-700/80 last:[&>*]:border-r [&>*:last-child]:border-b-0`}>
			{filteredSkills.map((skill, index) => (
				<motion.div
					key={skill.name}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{ delay: index * 0.1 }}
					className="group relative grid aspect-video h-full overflow-hidden hover:bg-neutral-700/15 md:p-6">
					<div className="flex items-start justify-between">
						<div className="flex-1">
							<div className="flex items-center gap-3">
								<h3 className="text-2xl font-normal text-white/90">
									{skill.name}
								</h3>
							</div>
							<div className="mt-2 flex items-center gap-3 text-sm font-light">
								<span className="text-white/40">
									{skill.category}
								</span>
								<span className="text-white/30">&bull;</span>
								<span className="text-white/40 duration-300 group-hover:text-neutral-100/80">
									{skill.yearsOfExperience}y exp
								</span>
								<span className="text-white/30">&bull;</span>
								<span className="text-white/40">
									{skill.projectCount} projects
								</span>
							</div>
						</div>

						<div className="ml-4 text-right">
							<span className="font-mono text-3xl font-light tracking-tighter text-white/90">
								{skill.expertise}
							</span>
							<span className="font-light text-white/40">%</span>
						</div>
					</div>

					<div className="flex flex-wrap gap-2 self-start">
						{skill.tags.map(tag => (
							<span
								key={tag}
								className="rounded-full bg-white/5 px-3 py-1 text-xs font-light tracking-wider text-white/60">
								{tag}
							</span>
						))}
					</div>

					<div className="mt-2 h-1 w-full self-end overflow-hidden bg-neutral-700">
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: `${skill.expertise}%` }}
							transition={{
								duration: 1,
								ease: [0.32, 0.72, 0, 1],
							}}
							className="h-full bg-neutral-400 transition-[background-color] duration-300 group-hover:bg-[var(--brand-color)]"
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
