'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, X, Play, Triangle, Star, GitFork, Eye, Trophy } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { Project } from '@/data/projects'
import { ProjectLinks } from '@/components/project-links'
import { categoryLabels, statusStyles } from '@/lib/project-status'
import { formatDate } from '@/lib/format'
import { useDialog } from '@/hooks/use-dialog'
import { cn } from '@/lib/utils'

type PreviewModalProps = {
	isOpen: boolean
	onClose: () => void
	project: Project | null
}

export function PreviewModal({ isOpen, onClose, project }: PreviewModalProps) {
	const dialogRef = useRef<HTMLDivElement>(null)
	const closeRef = useRef<HTMLButtonElement>(null)

	// Esc to close, focus moves into the dialog and stays there.
	useDialog({
		dialogRef,
		initialFocusRef: closeRef,
		onClose,
		isEnabled: isOpen && project !== null,
	})

	// Stop the page behind from scrolling (very noticeable on phones).
	useEffect(() => {
		if (!isOpen) return
		const previous = document.body.style.overflow
		document.body.style.overflow = 'hidden'
		return () => {
			document.body.style.overflow = previous
		}
	}, [isOpen])

	return (
		<AnimatePresence>
			{isOpen && project && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={onClose}
					className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6">
					<motion.div
						ref={dialogRef}
						role="dialog"
						aria-modal="true"
						aria-labelledby="preview-title"
						initial={{ y: 40, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: 40, opacity: 0 }}
						transition={{ type: 'spring', stiffness: 300, damping: 30 }}
						onClick={e => e.stopPropagation()}
						className="relative flex max-h-dvh w-full max-w-3xl flex-col overflow-hidden border border-dashed border-neutral-800 bg-neutral-950 sm:max-h-full">
						{/* Window bar */}
						<div className="flex shrink-0 items-center justify-between gap-3 border-b border-dashed border-neutral-800 bg-neutral-900/50 px-4 py-2.5">
							<div className="flex min-w-0 items-center gap-3">
								<span aria-hidden="true" className="flex shrink-0 gap-1.5">
									<span className="size-2.5 rounded-full bg-red-500/80" />
									<span className="size-2.5 rounded-full bg-amber-500/80" />
									<span className="size-2.5 rounded-full bg-emerald-500/80" />
								</span>
								<Terminal className="size-3.5 shrink-0 text-emerald-500" />
								<span className="truncate font-mono text-xs text-neutral-500">
									preview/{project.category}/
									{project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
								</span>
							</div>
							<button
								ref={closeRef}
								type="button"
								onClick={onClose}
								aria-label="Close"
								className="-m-2 shrink-0 p-2 text-neutral-500 transition-colors hover:text-neutral-300">
								<X className="size-4" />
							</button>
						</div>

						<div className="min-h-0 flex-1 overflow-y-auto">
							{/* Cover */}
							<div className="relative aspect-video max-h-96 w-full overflow-hidden bg-neutral-900">
								{project.preview?.video ? (
									<>
										<video
											src={project.preview.video}
											autoPlay
											loop
											muted
											playsInline
											controls
											className="size-full bg-neutral-900 object-cover"
										/>
										<div className="absolute right-0 bottom-0 left-0 flex items-center gap-2 border-t border-dashed border-neutral-800 bg-neutral-950/90 p-3 font-mono text-xs text-neutral-500">
											<Play className="size-3" />
											Interactive demo
										</div>
									</>
								) : project.preview?.image ? (
									// eslint-disable-next-line @next/next/no-img-element
									<img
										src={project.preview.image}
										alt={`${project.title} cover`}
										className="size-full object-cover"
									/>
								) : (
									<div className="flex size-full items-center justify-center">
										<div className="text-center">
											<Terminal className="mx-auto mb-3 size-10 text-neutral-700" />
											<p className="font-mono text-sm text-neutral-600">
												No preview yet
											</p>
										</div>
									</div>
								)}
							</div>

							<div className="space-y-4 border-t border-dashed border-neutral-800 p-4 sm:p-6">
								<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
									<div className="min-w-0 flex-1">
										<div className="mb-2 flex flex-wrap items-center gap-2 font-mono text-xs">
											<span className={cn('size-1.5 rounded-full', statusStyles[project.status].dot)} />
											<span className={statusStyles[project.status].text}>
												{statusStyles[project.status].label}
											</span>
											<span className="text-neutral-700">•</span>
											<span className="text-neutral-600">
												{categoryLabels[project.category]}
											</span>
										</div>
										<h2
											id="preview-title"
											className="mb-2 font-mono text-lg text-neutral-200 sm:text-xl">
											{project.title}
										</h2>
										<p className="text-sm leading-relaxed text-neutral-400">
											{project.description}
										</p>
									</div>
									<ProjectLinks
										project={project}
										variant="button"
										className="shrink-0 sm:max-w-48 sm:justify-end"
									/>
								</div>

								<div className="border-t border-dashed border-neutral-800 pt-4">
									<div className="mb-2 flex items-center gap-2 font-mono text-xs text-neutral-600">
										<Terminal className="size-3" />
										tech stack
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

								{project.features && project.features.length > 0 && (
									<div className="border-t border-dashed border-neutral-800 pt-4">
										<div className="mb-2 flex items-center gap-2 font-mono text-xs text-neutral-600">
											<Terminal className="size-3" />
											key features
										</div>
										<ul className="space-y-1.5">
											{project.features.map(feature => (
												<li
													key={feature}
													className="flex items-start gap-2 font-mono text-xs leading-relaxed text-neutral-500">
													<Triangle className="text-terminal-green mt-0.5 size-3 shrink-0 rotate-90" />
													{feature}
												</li>
											))}
										</ul>
									</div>
								)}

								<div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-dashed border-neutral-800 pt-4 font-mono text-xs text-neutral-600">
									{project.metadata.stars ? (
										<span className="flex items-center gap-1.5">
											<Star className="size-3" />
											{project.metadata.stars} stars
										</span>
									) : null}
									{project.metadata.forks ? (
										<span className="flex items-center gap-1.5">
											<GitFork className="size-3" />
											{project.metadata.forks} forks
										</span>
									) : null}
									{project.metadata.views ? (
										<span className="flex items-center gap-1.5">
											<Eye className="size-3" />
											{project.metadata.views} views
										</span>
									) : null}
									{project.metadata.version && (
										<span>v{project.metadata.version}</span>
									)}
									<span className="sm:ml-auto">
										updated {formatDate(project.metadata.lastUpdated)}
									</span>
								</div>

								{project.metadata.awards && project.metadata.awards.length > 0 && (
									<div className="flex flex-wrap gap-2 border-t border-dashed border-neutral-800 pt-4">
										{project.metadata.awards.map(award => (
											<span
												key={award}
												className="flex items-center gap-1.5 border border-dashed border-amber-800 bg-amber-500/10 px-2.5 py-1 font-mono text-xs text-amber-500">
												<Trophy className="size-3" />
												{award}
											</span>
										))}
									</div>
								)}
							</div>
						</div>

						<div className="hidden shrink-0 border-t border-dashed border-neutral-800 bg-neutral-900/30 px-4 py-2 text-center sm:block">
							<span className="font-mono text-xxs text-neutral-600">
								Press{' '}
								<kbd className="border border-neutral-800 bg-neutral-900 px-1.5 py-0.5">
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
