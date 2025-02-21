'use client'

import { motion } from 'framer-motion'
import { Coffee, Globe, Sparkles, Code, Rocket } from 'lucide-react'

const highlights = [
	{
		icon: Code,
		label: 'Full Stack Developer',
		color: 'blue',
	},
	{
		icon: Globe,
		label: 'Remote First',
		color: 'green',
	},
	{
		icon: Sparkles,
		label: '10+ Years Experience',
		color: 'yellow',
	},
]

export default function AboutMe() {
	return (
		<div className="relative">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="grid grid-cols-1 divide-x divide-dashed divide-neutral-700/80 md:grid-cols-2">
				<div className="font-source space-y-16 p-6 text-xl leading-relaxed tracking-wide text-neutral-200 md:p-8">
					<p>
						I'm a passionate software engineer specializing in
						building exceptional digital experiences. With a decade
						of experience in full-stack development, I focus on
						creating scalable, user-centric applications that solve
						real-world problems.
					</p>
					<p>
						Currently working remotely from India, I collaborate
						with teams worldwide to deliver high-impact solutions.
						My expertise spans across modern web technologies, cloud
						architecture, and DevOps practices.
					</p>

					{/*<p className="mt-8 border-t border-dashed border-neutral-700/80 pt-4 text-xl">
						Scroll down to explore more about my professional
						journey.
					</p>*/}
				</div>

				<div className="grid gap-4 pt-4 text-sm text-gray-400 sm:grid-cols-2">
					<div className="flex items-center gap-2">
						<Rocket className="h-4 w-4 text-purple-400" />
						<span>50+ Projects Delivered</span>
					</div>
					<div className="flex items-center gap-2">
						<Coffee className="h-4 w-4 text-orange-400" />
						<span>Always up for a coffee chat</span>
					</div>
				</div>
			</motion.div>
		</div>
	)
}
