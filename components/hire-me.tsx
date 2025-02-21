'use client'

import { motion } from 'framer-motion'
import {
	Calendar,
	Mail,
	Clock,
	Globe,
	DollarSign,
	ArrowRight,
} from 'lucide-react'

const BOOKING_URL = 'https://cal.com/yourusername'
const RATES = {
	project: 'From $15,000',
	hourly: '$150 - $200',
}

export default function HireMe() {
	return (
		<div className="relative grid grid-cols-1 divide-y divide-dashed divide-neutral-800 md:grid-cols-2 md:divide-x md:divide-y-0">
			{/* Left Panel */}
			<div className="group relative aspect-square bg-neutral-950 p-8 transition-colors hover:bg-neutral-950/95 md:aspect-auto">
				{/* Background Number */}
				<div className="absolute right-8 bottom-8 font-mono text-[8rem] font-medium tracking-tighter text-green-500/10 select-none group-hover:text-green-500/20">
					01
				</div>

				{/* Content */}
				<div className="relative space-y-6">
					{/* Status Indicator */}
					<div className="flex items-center gap-2">
						<span className="relative flex h-2.5 w-2.5">
							<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
							<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
						</span>
						<span className="font-mono text-sm tracking-wide text-green-400">
							AVAILABLE NOW
						</span>
					</div>

					<div>
						<h3 className="mb-2 text-xl font-medium tracking-tight text-white">
							Project Engagement
						</h3>
						<div className="mb-4 flex items-baseline gap-2">
							<span className="font-mono text-2xl text-green-400">
								{RATES.project}
							</span>
							<span className="text-sm text-neutral-500">
								per project
							</span>
						</div>
						<ul className="space-y-2">
							{[
								'Fixed scope projects',
								'Defined milestones',
								'Regular updates',
								'Code ownership',
							].map((item, i) => (
								<motion.li
									key={item}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.1 }}
									className="flex items-center gap-2 text-sm text-neutral-400">
									<span className="text-green-500 select-none">
										›
									</span>
									{item}
								</motion.li>
							))}
						</ul>
					</div>

					<motion.a
						href={BOOKING_URL}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 font-mono text-sm text-white hover:bg-neutral-950/95">
						<Calendar size={14} />
						Schedule Consultation
						<ArrowRight
							size={14}
							className="transition-transform group-hover:translate-x-0.5"
						/>
					</motion.a>
				</div>
			</div>

			{/* Right Panel */}
			<div className="group relative aspect-square bg-neutral-950 p-8 transition-colors hover:bg-neutral-950/90 md:aspect-auto">
				{/* Background Number */}
				<div className="absolute right-8 bottom-8 font-mono text-[8rem] font-medium tracking-tighter text-blue-500/10 select-none group-hover:text-blue-500/20">
					02
				</div>

				{/* Content */}
				<div className="relative space-y-6">
					<div className="flex items-center gap-2">
						<Clock size={16} className="text-blue-400" />
						<span className="font-mono text-sm tracking-wide text-blue-400">
							HOURLY RATE
						</span>
					</div>

					<div>
						<h3 className="mb-2 text-xl font-medium tracking-tight text-white">
							Ongoing Development
						</h3>
						<div className="mb-4 flex items-baseline gap-2">
							<span className="font-mono text-2xl text-blue-400">
								{RATES.hourly}
							</span>
							<span className="text-sm text-neutral-500">
								per hour
							</span>
						</div>
						<ul className="space-y-2">
							{[
								'Flexible engagement',
								'Weekly sprints',
								'Priority support',
								'Direct communication',
							].map((item, i) => (
								<motion.li
									key={item}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: i * 0.1 }}
									className="flex items-center gap-2 text-sm text-neutral-400">
									<span className="text-blue-500 select-none">
										›
									</span>
									{item}
								</motion.li>
							))}
						</ul>
					</div>

					<motion.a
						href="mailto:your@email.com"
						className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 font-mono text-sm text-white hover:bg-neutral-800">
						<Mail size={14} />
						Discuss Requirements
						<ArrowRight
							size={14}
							className="transition-transform group-hover:translate-x-0.5"
						/>
					</motion.a>
				</div>
			</div>
		</div>
	)
}
