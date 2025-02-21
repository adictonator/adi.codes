'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ShoppingCart, ChevronRight } from 'lucide-react'
import { useState } from 'react'

type SetupItem = {
	name: string
	description?: string
	link?: string
	affiliateLink?: string
	price?: string
	category: 'Hardware' | 'Development' | 'Productivity'
}

const setup: SetupItem[] = [
	{
		name: 'MacBook Pro 16" M1 Max',
		description: '64GB RAM, 2TB SSD - Main development machine',
		category: 'Hardware',
		price: '$3,499',
		affiliateLink: 'https://amazon.com/...',
	},
	{
		name: 'Dell U2720Q',
		description: '27" 4K USB-C Monitor',
		category: 'Hardware',
		link: 'https://www.dell.com/en-us/shop/dell-ultrasharp-27-4k-usb-c-monitor-u2720q/apd/210-avjv/monitors-monitor-accessories',
	},
	{
		name: 'Keychron K3',
		description: 'Low Profile Mechanical Keyboard - Brown switches',
		category: 'Hardware',
	},
	{
		name: 'VS Code',
		description: 'Primary IDE - Using GitHub theme',
		category: 'Development',
	},
	{
		name: 'iTerm2',
		description: 'Terminal Emulator - With Oh My Zsh & Starship prompt',
		category: 'Development',
	},
	{
		name: 'Fig',
		description: 'Terminal Enhancement',
		category: 'Development',
		link: 'https://fig.io',
	},
	{
		name: 'Figma',
		description: 'UI/UX Design - For wireframes and prototypes',
		category: 'Productivity',
	},
	{
		name: 'Arc Browser',
		description: 'Primary Browser',
		category: 'Productivity',
		link: 'https://arc.net',
	},
	{
		name: 'Raycast',
		description: 'Productivity Tool - Replaced Spotlight',
		category: 'Productivity',
	},
]

export default function UsesShowcase() {
	const [selectedItem, setSelectedItem] = useState<SetupItem | null>(null)
	const categories = ['Hardware', 'Development', 'Productivity'] as const

	return (
		<>
			<div className="space-y-8">
				{categories.map(category => (
					<div key={category} className="space-y-4">
						{/* Category Header */}
						<div className="flex items-center gap-4">
							<h3 className="text-sm font-medium tracking-wider text-blue-400 uppercase">
								{category}
							</h3>
							<div className="h-px flex-1 bg-gradient-to-r from-blue-500/20 to-transparent" />
						</div>

						{/* Items Grid */}
						<div className="grid gap-3">
							{setup
								.filter(item => item.category === category)
								.map(item => (
									<motion.button
										key={item.name}
										onClick={() => setSelectedItem(item)}
										className="group flex items-center justify-between rounded-lg border border-gray-800/50 bg-gray-900/30 p-4 text-left transition-all hover:border-blue-500/30 hover:bg-gray-800/50">
										<div className="flex-1 space-y-1 pr-6">
											<div className="flex items-center gap-3">
												<h4 className="font-medium text-gray-200 group-hover:text-white">
													{item.name}
												</h4>
												{item.price && (
													<span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-400">
														{item.price}
													</span>
												)}
											</div>
											{item.description && (
												<p className="line-clamp-1 text-sm text-gray-500">
													{item.description}
												</p>
											)}
										</div>
										<ChevronRight className="h-4 w-4 text-gray-600 transition-colors group-hover:text-blue-400" />
									</motion.button>
								))}
						</div>
					</div>
				))}
			</div>

			{/* Enhanced Modal */}
			<AnimatePresence>
				{selectedItem && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setSelectedItem(null)}
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
						<motion.div
							initial={{ scale: 0.95, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.95, opacity: 0 }}
							onClick={e => e.stopPropagation()}
							className="relative mx-4 w-full max-w-lg overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-2xl">
							{/* Modal Header */}
							<div className="relative border-b border-gray-800 bg-gray-900/80 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-gray-900/50">
								<h3 className="pr-8 font-medium text-white">
									{selectedItem.name}
								</h3>
								<button
									onClick={() => setSelectedItem(null)}
									className="absolute top-4 right-4 rounded-full bg-gray-800 p-1.5 text-gray-400 hover:text-white">
									<X size={14} />
								</button>
							</div>

							{/* Modal Content */}
							<div className="p-6">
								<div className="space-y-6">
									{selectedItem.description && (
										<p className="text-gray-400">
											{selectedItem.description}
										</p>
									)}

									<div className="flex flex-wrap gap-3">
										{selectedItem.affiliateLink && (
											<a
												href={
													selectedItem.affiliateLink
												}
												target="_blank"
												rel="noopener noreferrer sponsored"
												className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600">
												<ShoppingCart size={16} />
												View on Amazon
											</a>
										)}
										{selectedItem.link && (
											<a
												href={selectedItem.link}
												target="_blank"
												rel="noopener noreferrer"
												className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800">
												<ExternalLink size={16} />
												Learn More
											</a>
										)}
									</div>

									{selectedItem.affiliateLink && (
										<p className="text-xs text-gray-500">
											* As an Amazon Associate I earn from
											qualifying purchases
										</p>
									)}
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	)
}
