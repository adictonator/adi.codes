import { skills } from '@/data/skills'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

export default function SkillPill({
	selected,
	setCategory,
}: {
	selected: string | null
	setCategory: (category: string | null) => void
}) {
	return (
		<div className="hidden gap-1 md:flex">
			{Array.from(new Set(skills.map(s => s.category))).map(category => (
				<motion.button
					key={category}
					whileTap={{ scale: 0.95 }}
					onClick={() =>
						setCategory(selected === category ? null : category)
					}
					className={cn(
						'cursor-pointer px-2 py-1 text-xs font-light tracking-widest uppercase transition-colors duration-200',
						{
							'bg-neutral-100/20 text-neutral-100':
								selected === category,
							'text-neutral-300/80 hover:text-neutral-100':
								selected !== category,
						},
					)}>
					{category}
				</motion.button>
			))}
		</div>
	)
}
