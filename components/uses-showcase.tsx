'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { setup, SetupItem } from '@/data/uses'
import { ArrowUpRight } from 'lucide-react'
import { Dialog } from './ui/dialog'

export default function UsesShowcase() {
	const [selectedItem, setSelectedItem] = useState<SetupItem | null>(null)
	const categories = ['Hardware', 'Development', 'Productivity'] as const

	const getCategoryColorClass = (category: string) => {
		switch (category) {
			case 'Hardware':
				return 'group-hover:text-blue-500/50'
			case 'Development':
				return 'group-hover:text-emerald-500/50'
			case 'Productivity':
				return 'group-hover:text-amber-500/50'
		}
	}

	return (
		<>
			<div className="divide-border grid w-full min-w-0 grid-cols-1 divide-dashed overflow-hidden max-sm:gap-x-4 md:divide-x xl:divide-y 2xl:grid-cols-3">
				{categories.map(category => (
					<article
						key={category}
						className="group relative flex flex-col transition-colors">
						<header className="p-3 lg:p-4 2xl:p-6">
							<h3 className="text-muted text-lg sm:text-xl md:text-xl lg:text-2xl">
								{category}
							</h3>
						</header>

						<ul className="mb-3.5">
							{setup
								.filter(item => item.category === category)
								.map((item, index) => (
									<motion.li
										key={index}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}
										{...(item.affiliateLink && {
											onClick: () =>
												setSelectedItem(item),
										})}
										className="group/item relative w-full">
										<div
											className={`hover:bg-secondary hover:border-border flex flex-col items-baseline justify-between border-y border-dashed border-transparent px-4 py-2 transition-all duration-200 sm:px-5 sm:py-3 md:px-6 md:py-4 ${item.affiliateLink && 'cursor-pointer'}`}>
											<span className="text-primary/80 group-hover/item:text-primary text-sm font-light transition-colors sm:text-base md:text-base">
												{item.name}
											</span>
											{item.description && (
												<p className="text-muted/50 group-hover/item:text-muted line-clamp-1 text-xs md:mt-1 md:text-sm">
													{item.description}
												</p>
											)}
											{item.affiliateLink && (
												<ArrowUpRight
													className="text-primary absolute right-3 size-3 opacity-0 duration-300 group-hover/item:opacity-100 sm:right-4 sm:size-3.5 md:right-5 md:size-4"
													strokeWidth={1}
												/>
											)}
										</div>
									</motion.li>
								))}
						</ul>

						{/* Enhanced Background Category Display */}
						<footer className="pointer-events-none relative right-1 bottom-1 mt-auto w-fit self-end overflow-hidden select-none sm:right-1.5 sm:bottom-1.5">
							<motion.div
								initial={{ y: '100%' }}
								animate={{ y: 0 }}
								transition={{ delay: 0.2 }}
								className="flex flex-col items-end">
								<span className="text-xxs text-muted-foreground/50 group-hover:text-muted-foreground tracking-[0.3em] duration-200 sm:text-xs sm:tracking-[0.5em]">
									{category === 'Hardware'
										? '01:SYSTEM'
										: category === 'Development'
											? '02:COMMAND'
											: '03:OUTPUT'}
								</span>

								<span
									className={`text-border text-3xl font-light tracking-widest transition-colors duration-200 sm:text-4xl md:text-4xl lg:text-5xl ${getCategoryColorClass(category)}`}>
									{category === 'Hardware'
										? 'SYS'
										: category === 'Development'
											? 'CMD'
											: 'OUT'}
								</span>
							</motion.div>
						</footer>
					</article>
				))}
			</div>

			<Dialog
				isOpen={selectedItem !== null}
				onClose={() => setSelectedItem(null)}
				content={selectedItem}
			/>
		</>
	)
}
