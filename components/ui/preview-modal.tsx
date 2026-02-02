'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
	Terminal,
	X,
	Globe,
	Play,
	Maximize2,
	Triangle,
	Heart,
	Star,
	GitFork,
	Eye,
	Trophy,
	BookOpen,
} from 'lucide-react'
import Link from 'next/link'
import { Project } from '@/data/projects'
import { useState } from 'react'

type PreviewModalProps = {
	isOpen: boolean
	onClose: () => void
	project: Project | null
}

export function PreviewModal({ isOpen, onClose, project }: PreviewModalProps) {
	const [isFullscreen, setIsFullscreen] = useState(false)

	if (!project) return null

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-6">
					<motion.div
						initial={{ scale: 0.95, y: 20 }}
						animate={{ scale: 1, y: 0 }}
						exit={{ scale: 0.95, y: 20 }}
						transition={{
							type: 'spring',
							stiffness: 300,
							damping: 30,
						}}
						onClick={e => e.stopPropagation()}
						className={`relative w-full overflow-hidden border border-dashed border-neutral-800 bg-neutral-950 ${
							isFullscreen ? 'max-w-7xl' : 'max-w-5xl'
						}`}>
						{/* Terminal Window Header */}
						<div className="flex items-center justify-between border-b border-dashed border-neutral-800 bg-neutral-900/50 px-4 py-2.5">
							<div className="flex items-center gap-3">
								<div className="flex gap-1.5">
									<motion.button
										whileHover={{ scale: 1.1 }}
										onClick={onClose}
										className="h-2.5 w-2.5 rounded-full bg-red-500/80 transition-colors hover:bg-red-500"
									/>
									<motion.button
										whileHover={{ scale: 1.1 }}
										onClick={() =>
											setIsFullscreen(!isFullscreen)
										}
										className="h-2.5 w-2.5 rounded-full bg-amber-500/80 transition-colors hover:bg-amber-500"
									/>
									<div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
								</div>
								<Terminal className="h-3.5 w-3.5 text-emerald-500" />
								<span className="font-mono text-xs text-neutral-500">
									preview/{project.category.toLowerCase()}/
									{project.title
										.toLowerCase()
										.replace(/\s+/g, '-')}
								</span>
							</div>

							<div className="flex items-center gap-3">
								{/*<motion.button
									whileHover={{ scale: 1.1 }}
									onClick={() =>
										setIsFullscreen(!isFullscreen)
									}
									className="text-neutral-600 transition-colors hover:text-neutral-400">
									<Maximize2 className="h-3.5 w-3.5" />
								</motion.button>*/}
								<motion.button
									type="button"
									whileHover={{ scale: 1.1 }}
									onClick={onClose}
									className="cursor-pointer text-neutral-600 transition-colors hover:text-neutral-400">
									<X className="h-3.5 w-3.5" />
								</motion.button>
							</div>
						</div>

						{/* Preview Content */}
						<div className="relative bg-neutral-900">
							{project.preview?.video ? (
								<div className="relative">
									<video
										src={project.preview.video}
										autoPlay
										loop
										muted
										playsInline
										controls
										className="w-full bg-neutral-900"
									/>
									{/* Video Controls Overlay */}
									<div className="absolute right-0 bottom-0 left-0 border-t border-dashed border-neutral-800 bg-linear-to-t from-neutral-950/90 to-transparent p-4">
										<div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
											<Play className="h-3 w-3" />
											<span>Interactive Demo</span>
										</div>
									</div>
								</div>
							) : project.preview?.image ? (
								<img
									src={project.preview.image}
									alt={project.title}
									className="w-full"
								/>
							) : (
								<div className="flex aspect-video items-center justify-center bg-neutral-900">
									<div className="text-center">
										<Terminal className="mx-auto mb-3 h-12 w-12 text-neutral-700" />
										<p className="font-mono text-sm text-neutral-600">
											No preview available
										</p>
									</div>
								</div>
							)}
						</div>

						{/* Project Details Footer */}
						<div className="border-t border-dashed border-neutral-800 bg-neutral-950 p-4 sm:p-6">
							<div className="mb-4 flex items-start justify-between">
								<div className="flex-1">
									<div className="mb-2 flex items-center gap-2">
										<motion.div
											className={`h-1.5 w-1.5 rounded-full ${
												project.status === 'published'
													? 'bg-emerald-500'
													: project.status ===
														  'in-progress'
														? 'bg-amber-500'
														: 'bg-neutral-600'
											}`}
											animate={{
												scale: [1, 1.2, 1],
											}}
											transition={{
												duration: 2,
												repeat: Infinity,
												ease: 'easeInOut',
											}}
										/>
										<span className="font-mono text-xs text-neutral-600">
											{project.status}
										</span>
										<span className="text-neutral-800">
											•
										</span>
										<span className="font-mono text-xs text-neutral-600">
											{project.category}
										</span>
									</div>
									<h3 className="mb-2 font-mono text-lg text-neutral-200 sm:text-xl">
										{project.title}
									</h3>
									<p className="text-sm leading-relaxed text-neutral-500">
										{project.description}
									</p>
								</div>

								<div className="ml-4 flex gap-2">
									{project.links.source && (
										<motion.a
											href={project.links.source}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 border border-dashed border-neutral-800 bg-neutral-900/50 px-3 py-2 font-mono text-xs text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-300">
											<Heart className="h-3.5 w-3.5" />
											<span className="hidden sm:inline">
												source
											</span>
										</motion.a>
									)}
									{project.links.live && (
										<motion.a
											href={project.links.live}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-2 border border-dashed border-emerald-800 bg-emerald-950/30 px-3 py-2 font-mono text-xs text-emerald-400 transition-colors hover:border-emerald-700 hover:text-emerald-300">
											<Globe className="h-3.5 w-3.5" />
											<span className="hidden sm:inline">
												visit
											</span>
										</motion.a>
									)}
									{project.links.caseStudy && (
										<Link
											href={project.links.caseStudy}
											onClick={onClose}
											className="flex items-center gap-2 border border-dashed border-blue-800 bg-blue-950/30 px-3 py-2 font-mono text-xs text-blue-400 transition-colors hover:border-blue-700 hover:text-blue-300">
											<BookOpen className="h-3.5 w-3.5" />
											<span className="hidden sm:inline">
												case study
											</span>
										</Link>
									)}
								</div>
							</div>

							{/* Tech Stack */}
							<div className="mb-4 border-t border-dashed border-neutral-800 pt-4">
								<div className="mb-2 flex items-center gap-2">
									<Terminal className="h-3 w-3 text-neutral-600" />
									<span className="font-mono text-xs text-neutral-600">
										tech stack
									</span>
								</div>
								<div className="flex flex-wrap gap-1.5">
									{project.stack.map(tech => (
										<span
											key={tech}
											className="border border-dashed border-neutral-800 bg-neutral-900/50 px-2.5 py-1 font-mono text-xs text-neutral-500">
											{tech}
										</span>
									))}
								</div>
							</div>

							{/* Features */}
							{project.features &&
								project.features.length > 0 && (
									<div className="mb-4 border-t border-dashed border-neutral-800 pt-4">
										<div className="mb-2 flex items-center gap-2">
											<Terminal className="h-3 w-3 text-neutral-600" />
											<span className="font-mono text-xs text-neutral-600">
												key features
											</span>
										</div>
										<ul className="space-y-1.5">
											{project.features.map(
												(feature, idx) => (
													<li
														key={idx}
														className="flex items-start gap-2 font-mono text-xs text-neutral-500">
														<Triangle className="text-terminal-green size-3" />
														{feature}
													</li>
												),
											)}
										</ul>
									</div>
								)}

							{/* Metadata */}
							<div className="flex flex-wrap items-center gap-4 border-t border-dashed border-neutral-800 pt-4 font-mono text-xs text-neutral-600">
								{project.metadata.stars && (
									<span className="flex items-center gap-1.5">
										<Star className="size-3" />
										{project.metadata.stars} stars
									</span>
								)}
								{project.metadata.forks && (
									<span className="flex items-center gap-1.5">
										<GitFork className="size-3" />
										{project.metadata.forks} forks
									</span>
								)}
								{project.metadata.views && (
									<span className="flex items-center gap-1.5">
										<Eye className="size-3" />
										{project.metadata.views} views
									</span>
								)}
								{project.metadata.version && (
									<span className="flex items-center gap-1.5">
										<span className="text-neutral-700">
											v
										</span>
										{project.metadata.version}
									</span>
								)}
								{project.metadata.lastUpdated && (
									<span className="ml-auto">
										updated:{' '}
										{new Date(
											project.metadata.lastUpdated,
										).toLocaleDateString('en-US', {
											month: 'short',
											day: 'numeric',
											year: 'numeric',
										})}
									</span>
								)}
							</div>

							{/* Awards */}
							{project.metadata.awards &&
								project.metadata.awards.length > 0 && (
									<div className="mt-4 flex flex-wrap gap-2 border-t border-dashed border-neutral-800 pt-4">
										{project.metadata.awards.map(award => (
											<span
												key={award}
												className="flex items-center gap-1.5 border border-dashed border-amber-800 bg-amber-950/30 px-2.5 py-1 font-mono text-xs text-amber-500">
												<Trophy className="size-3" />
												{award}
											</span>
										))}
									</div>
								)}
						</div>

						{/* ESC to close hint */}
						<div className="border-t border-dashed border-neutral-800 bg-neutral-900/30 px-4 py-2 text-center">
							<span className="text-xxs font-mono text-neutral-700">
								Press{' '}
								<kbd className="rounded border border-neutral-800 bg-neutral-900 px-1.5 py-0.5">
									ESC
								</kbd>{' '}
								to close
							</span>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
