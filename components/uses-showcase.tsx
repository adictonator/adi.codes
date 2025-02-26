'use client'

import { setup } from '@/data/uses'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ShoppingCart } from 'lucide-react'
import { useState } from 'react'

export default function UsesShowcase() {
	const [selectedItem, setSelectedItem] = useState<SetupItem | null>(null)
	const categories = ['Hardware', 'Development', 'Productivity'] as const

	const getCategoryColorClass = (category: string) => {
		switch (category) {
			case 'Hardware':
				return 'group-hover:text-blue-500/50' // Using Tailwind's blue
			case 'Development':
				return 'group-hover:text-emerald-500/50' // Using Tailwind's emerald
			case 'Productivity':
				return 'group-hover:text-amber-500/50' // Using Tailwind's amber
		}
	}

	return (
		<div className="relative grid grid-cols-1 divide-x divide-dashed divide-neutral-700/80 lg:grid-cols-3">
			{categories.map(category => (
				<article
					key={category}
					className="group hover:bg-secondary relative flex flex-col transition-colors">
					<header className="p-6">
						<h3 className="text-2xl text-neutral-400">
							{category}
						</h3>
					</header>

					{/* Items Stack */}
					<ul className="mb-3.5">
						{setup
							.filter(item => item.category === category)
							.map((item, index) => (
								<motion.li
									key={index}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: index * 0.1 }}
									onClick={() => setSelectedItem(item)}
									className="group/item relative w-full text-left">
									<div className="flex cursor-pointer flex-col items-baseline justify-between border-y border-dashed border-transparent px-6 py-4 transition-all duration-200 hover:border-neutral-700/50 hover:bg-neutral-900/30">
										<span className="font-light text-neutral-300 transition-colors group-hover/item:text-neutral-200">
											{item.name}
										</span>
										{item.description && (
											<p className="mt-1 line-clamp-1 text-sm text-neutral-500 group-hover/item:text-neutral-400">
												{item.description}
											</p>
										)}
									</div>
								</motion.li>
							))}
					</ul>

					{/* Enhanced Background Category Display */}
					<footer className="pointer-events-none relative right-1.5 bottom-1.5 mt-auto w-fit self-end overflow-hidden select-none">
						<motion.div
							initial={{ y: '100%' }}
							animate={{ y: 0 }}
							transition={{ delay: 0.2 }}
							className="flex flex-col items-end">
							<span className="text-xxs tracking-[0.5em] text-neutral-600 duration-200 group-hover:text-neutral-500">
								{category === 'Hardware'
									? '01:SYSTEM'
									: category === 'Development'
										? '02:COMMAND'
										: '03:OUTPUT'}
							</span>

							<span
								className={`text-5xl font-light tracking-widest text-neutral-700/80 transition-colors duration-200 ${getCategoryColorClass(category)}`}>
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

			{/* Item Details Modal */}
			<AnimatePresence>
				{selectedItem && (
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-lg border border-neutral-800 bg-neutral-900 p-6 shadow-xl backdrop-blur-sm">
						<div className="flex justify-between gap-8">
							<div className="flex-1 space-y-4">
								<h3 className="text-2xl text-white">
									{selectedItem.name}
								</h3>
								<p className="text-neutral-400">
									{selectedItem.description}
								</p>
								<div className="flex gap-4">
									{selectedItem.affiliateLink && (
										<a
											href={selectedItem.affiliateLink}
											className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
											<ShoppingCart className="h-4 w-4" />
											Buy
										</a>
									)}
									{selectedItem.link && (
										<a
											href={selectedItem.link}
											className="flex items-center gap-2 text-sm text-neutral-300 hover:text-white">
											<ExternalLink className="h-4 w-4" />
											More Info
										</a>
									)}
								</div>
							</div>
							<button
								onClick={() => setSelectedItem(null)}
								className="text-neutral-500 hover:text-white">
								ESC
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
