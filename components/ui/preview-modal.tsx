'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { Project } from '@/data/projects'

type PreviewModalProps = {
	isOpen: boolean
	onClose: () => void
	project: Project | null
}

export function PreviewModal({ isOpen, onClose, project }: PreviewModalProps) {
	if (!project) return null

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm">
					<motion.div
						initial={{ scale: 0.98, y: 10 }}
						animate={{ scale: 1, y: 0 }}
						exit={{ scale: 0.98, y: 10 }}
						transition={{
							type: 'spring',
							stiffness: 200,
							damping: 25,
						}}
						className="relative w-full max-w-5xl overflow-hidden border border-dashed border-neutral-800 bg-neutral-950">
						{/* Modal Header */}
						<div className="flex items-center justify-between border-b border-dashed border-neutral-800 px-4 py-3">
							<div className="flex items-center gap-3">
								<Terminal className="h-4 w-4 text-emerald-500" />
								<span className="font-mono text-sm text-neutral-400">
									preview/
									{project.category.toLowerCase()}
								</span>
							</div>
							<button
								onClick={onClose}
								className="text-xs text-neutral-500 hover:text-neutral-300">
								ESC to close
							</button>
						</div>

						{/* Preview Content */}
						{/*{project.preview.video ? (
							<video
								src={project.preview.video}
								autoPlay
								loop
								muted
								playsInline
								controls
								className="w-full bg-neutral-900"
							/>
						) : (
							<img
								src={project.preview.image}
								alt={project.title}
								className="w-full"
							/>
						)}*/}

						{/* Preview Footer */}
						<div className="border-t border-dashed border-neutral-800 p-4">
							<div className="flex items-center justify-between">
								<div>
									<h3 className="text-lg text-neutral-200">
										{project.title}
									</h3>
									<p className="mt-1 text-sm text-neutral-400">
										{project.description}
									</p>
								</div>
								<div className="flex gap-4">
									{project.links.demo && (
										<a
											href={project.links.demo}
											className="text-sm text-neutral-400 hover:text-neutral-200">
											Try Demo →
										</a>
									)}
								</div>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
