'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
	Code2,
	Globe,
	ArrowUpRight,
	Gamepad2,
	ExternalLink,
	Github,
	Star,
	GitFork,
	Eye,
	Terminal,
	MonitorPlay,
	Award,
} from 'lucide-react'
import { useState } from 'react'
import { Project, projects } from '@/data/projects'
import { PreviewModal } from './ui/preview-modal'
import ProjectTimeline from './project-timeline'

export default function CreativeLab() {
	const [activeProject, setActiveProject] = useState<Project | null>(null)
	const [isPreviewOpen, setIsPreviewOpen] = useState(false)

	return (
		<>
			<div className="grid md:grid-cols-2">
				{projects.map((project, index) => (
					<motion.article
						key={project.title}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="group relative border-l border-dashed border-neutral-800 bg-neutral-950/30 transition-colors duration-300 hover:bg-neutral-950">
						{/* Project Header */}
						<div className="flex items-center justify-between border-b border-dashed border-neutral-800 bg-neutral-900/20 px-6 py-3">
							<div className="flex items-center gap-3">
								<span
									className={`font-mono text-xs ${
										project.status === 'published'
											? 'text-emerald-400'
											: project.status === 'in-progress'
												? 'text-amber-400'
												: 'text-neutral-400'
									}`}>
									{project.status}
								</span>
								<span className="text-xs text-neutral-500">
									{project.category}
								</span>
							</div>
							<div className="flex gap-2">
								{project.links.source && (
									<a
										href={project.links.source}
										className="text-neutral-500 transition-colors hover:text-neutral-300">
										<Github className="h-4 w-4" />
									</a>
								)}
								{project.links.live && (
									<a
										href={project.links.live}
										className="text-neutral-500 transition-colors hover:text-neutral-300">
										<Globe className="h-4 w-4" />
									</a>
								)}
							</div>
						</div>

						{/* Project Content */}
						<div className="flex flex-col p-6">
							{/* Preview Section */}
							{project.preview?.image && (
								<div
									className="relative mb-6 aspect-video cursor-pointer overflow-hidden"
									onClick={() => {
										setActiveProject(project)
										setIsPreviewOpen(true)
									}}>
									<div className="absolute inset-0 bg-neutral-900/20 transition-colors duration-300 group-hover:bg-transparent" />
									<img
										src={project.preview.image}
										alt={project.title}
										className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
									/>
									{project.preview.video && (
										<div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
											<MonitorPlay className="h-12 w-12 text-white/90" />
										</div>
									)}
								</div>
							)}

							{/* Project Info */}
							<div className="space-y-4">
								<h3 className="text-xl font-light text-neutral-200">
									{project.title}
								</h3>
								<p className="text-sm text-neutral-400">
									{project.description}
								</p>
								<div className="flex flex-wrap gap-2">
									{project.stack.map(tech => (
										<span
											key={tech}
											className="border border-dashed border-neutral-800 bg-neutral-900/30 px-2 py-1 text-xs text-neutral-400">
											{tech}
										</span>
									))}
								</div>
							</div>

							{/* Footer Stats */}
							{project.timeline && (
								<button
									//onClick={() =>
									//	setActiveTimeline(project.timeline)
									//}
									className="mt-6 flex w-full items-center justify-between border-t border-dashed border-neutral-800 pt-4 text-xs text-neutral-500">
									<span>
										View Timeline ({project.timeline.length}{' '}
										updates)
									</span>
									<ArrowUpRight className="h-4 w-4" />
								</button>
							)}
						</div>
					</motion.article>
				))}
			</div>

			<PreviewModal
				isOpen={isPreviewOpen}
				onClose={() => setIsPreviewOpen(false)}
				project={activeProject}
			/>

			<ProjectTimeline />
		</>
	)
}
