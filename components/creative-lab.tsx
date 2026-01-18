'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
	Globe,
	ArrowUpRight,
	Terminal,
	MonitorPlay,
	Play,
	Sparkles,
	TrendingUp,
	Heart,
	Star,
} from 'lucide-react'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Project, projects } from '@/data/projects'
import { PreviewModal } from './ui/preview-modal'
import ProjectTimeline from './project-timeline'
import Image from 'next/image'

type FilterType = 'all' | 'experiment' | 'open-source' | 'project'

export default function CreativeLab() {
	const [activeProject, setActiveProject] = useState<Project | null>(null)
	const [isPreviewOpen, setIsPreviewOpen] = useState(false)
	const [filter, setFilter] = useState<FilterType>('all')
	const [activeTimeline, setActiveTimeline] = useState<Project | null>(null)

	// Filter projects based on selected category - show only featured on homepage
	const filteredProjects = useMemo(() => {
		const filtered =
			filter === 'all'
				? projects
				: projects.filter(
						p =>
							p.category.toLowerCase().replace(' ', '-') ===
							filter,
					)
		// Show only featured projects, sorted by priority, max 4
		return filtered
			.filter(p => p.importance === 'primary')
			.sort((a, b) => a.priority - b.priority)
			.slice(0, 4)
	}, [filter])

	// Always show 4 slots - fill empty ones with placeholders
	const projectSlots = useMemo(() => {
		const slots: (Project | null)[] = [...filteredProjects]
		while (slots.length < 4) {
			slots.push(null)
		}
		return slots
	}, [filteredProjects])

	const filters: { value: FilterType; label: string; icon: any }[] = [
		{ value: 'all', label: 'ls -la', icon: Terminal },
		{ value: 'experiment', label: 'wip/', icon: Terminal },
		//{ value: 'open-source', label: 'open-source/', icon: Heart },
		{ value: 'project', label: 'live/', icon: Terminal },
	]

	return (
		<>
			<div className="border-border flex items-center justify-between border-b border-dashed bg-neutral-900/30 px-4 py-3">
				<div className="flex items-center gap-2">
					<Terminal className="h-3.5 w-3.5 text-emerald-500" />
					<span className="font-mono text-xs text-neutral-500">
						~/projects
					</span>
					<span className="text-neutral-700">$</span>
				</div>

				<div className="flex gap-1.5">
					{filters.map(({ value, label, icon: Icon }) => (
						<button
							key={value}
							onClick={() => setFilter(value)}
							className={`group text-10px flex items-center gap-1.5 border border-dashed px-2.5 py-1 font-mono transition-all duration-200 sm:px-3 sm:text-xs ${
								filter === value
									? 'border-emerald-700 bg-emerald-950/30 text-emerald-400'
									: 'border-neutral-800 bg-neutral-950/30 text-neutral-500 hover:border-neutral-700 hover:text-neutral-400'
							}`}>
							<Terminal className="size-3" />
							{/*<span>cd</span>*/}
							<span className="hidden sm:inline">{label}</span>
						</button>
					))}
				</div>
			</div>

			<div className="divide-border relative grid min-w-0 divide-y divide-dashed md:grid-cols-2 md:gap-x-0 md:divide-x [:where(&_>_:nth-child(n+3))]:border-b-0">
				{projectSlots.map((project, index) => {
					// Empty slot - placeholder matching blog-showcase style
					if (!project) {
						return (
							<div
								key={`empty-${index}`}
								className="relative flex min-h-72 flex-col items-center justify-center border-r border-b border-dashed border-neutral-800 bg-linear-to-br from-neutral-950/20 to-transparent md:last:border-b-0 md:odd:border-r-0 md:even:border-b-0 md:nth-last-[-n+2]:border-b-0">
								{/* Subtle dot pattern */}
								<div className="absolute inset-0 size-full opacity-10">
									<div
										className="h-full w-full"
										style={{
											backgroundImage:
												'radial-gradient(circle, currentColor 1px, transparent 1px)',
											backgroundSize: '20px 20px',
										}}
									/>
								</div>

								{/* Content */}
								<div className="relative flex flex-col items-center justify-center p-4 text-center">
									<Terminal className="mb-3 size-8 text-neutral-800/40" />
									<p className="font-mono text-xs leading-relaxed text-neutral-700">
										More projects
										<br />
										<span className="text-neutral-800">
											coming soon
										</span>
									</p>
									<div className="mt-2 h-px w-8 bg-neutral-800/10" />
								</div>
							</div>
						)
					}

					// Regular project slot
					return (
						<article
							key={project.title}
							className="group bg-background relative cursor-pointer transition-colors duration-300 hover:bg-neutral-900/30"
							onClick={() => {
								setActiveProject(project)
								setIsPreviewOpen(true)
							}}>
							{/* Terminal Header Bar */}
							<div className="border-border flex items-center justify-between border-b border-dashed px-4 py-2">
								<div className="flex items-center gap-2">
									<div
										className={`h-1.5 w-1.5 rounded-full ${
											project.status === 'published'
												? 'bg-emerald-500'
												: project.status ===
													  'in-progress'
													? 'bg-amber-500'
													: 'bg-neutral-600'
										}`}
									/>
									<span className="text-10px font-mono text-neutral-600">
										{project.category.toLowerCase()}
									</span>
									<span className="text-neutral-700">/</span>
									<span
										className={`text-10px font-mono ${
											project.status === 'published'
												? 'text-emerald-500/80'
												: project.status ===
													  'in-progress'
													? 'text-amber-500/80'
													: 'text-neutral-500'
										}`}>
										{project.status}
									</span>
								</div>

								<div className="flex gap-1.5">
									{project.links.source && (
										<a
											href={project.links.source}
											target="_blank"
											rel="noopener noreferrer"
											className="text-neutral-600 transition-colors hover:text-neutral-400">
											<Heart className="h-3.5 w-3.5" />
										</a>
									)}
									{project.links.live && (
										<a
											href={project.links.live}
											target="_blank"
											rel="noopener noreferrer"
											className="text-neutral-600 transition-colors hover:text-neutral-400">
											<Globe className="h-3.5 w-3.5" />
										</a>
									)}
								</div>
							</div>

							{/* Project Content */}
							<div className="flex flex-col gap-y-4">
								{/* Preview Section */}
								{project.preview?.image && (
									<div className="relative overflow-hidden bg-neutral-900 max-md:h-32 md:aspect-video">
										<Image
											src={project.preview.image}
											alt={project.title}
											fill
											className="size-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
										/>
										{project.preview.video && (
											<div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[1px] transition-opacity duration-300 group-hover:opacity-100">
												<div className="flex items-center gap-2 border border-dashed border-neutral-600 bg-neutral-950/80 px-3 py-2 font-mono text-xs text-neutral-400">
													<Play className="h-3 w-3" />
													<span>play demo</span>
												</div>
											</div>
										)}
									</div>
								)}

								{/* Project Info */}
								<div className="space-y-3 p-4 pt-0">
									<h3 className="font-mono text-base font-normal text-neutral-200 transition-colors group-hover:text-emerald-400">
										{project.title}
									</h3>

									<p className="text-xs leading-relaxed text-neutral-500">
										{project.description}
									</p>

									<div className="flex flex-wrap gap-1.5">
										{project.stack.slice(0, 4).map(tech => (
											<span
												key={tech}
												className="text-10px border-border border border-dashed bg-neutral-900/50 px-2 py-0.5 font-mono text-neutral-500">
												{tech}
											</span>
										))}
										{project.stack.length > 4 && (
											<span className="text-10px border-border border border-dashed bg-neutral-900/50 px-2 py-0.5 font-mono text-neutral-600">
												+{project.stack.length - 4}
											</span>
										)}
									</div>
								</div>

								{/* Footer Actions */}
								<div className="border-border flex items-center justify-between border-t border-dashed p-3">
									<div className="text-10px flex items-center gap-3 text-neutral-600">
										{project.metadata.stars && (
											<span className="flex items-center gap-1">
												<span>
													<Star className="size-3" />
												</span>
												{project.metadata.stars}
											</span>
										)}
										{project.metadata.lastUpdated && (
											<span className="font-mono">
												{new Date(
													project.metadata.lastUpdated,
												).toLocaleDateString('en-US', {
													month: 'short',
													year: '2-digit',
												})}
											</span>
										)}
									</div>

									{project.timeline && (
										<button
											onClick={() => {
												setActiveTimeline(project)
											}}
											className="text-10px flex items-center gap-1 font-mono text-neutral-500 transition-colors hover:text-neutral-400">
											<span>
												timeline (
												{project.timeline.length})
											</span>
											<ArrowUpRight className="h-3 w-3" />
										</button>
									)}
								</div>
							</div>
						</article>
					)
				})}
			</div>

			<PreviewModal
				isOpen={isPreviewOpen}
				onClose={() => setIsPreviewOpen(false)}
				project={activeProject}
			/>

			<ProjectTimeline
				project={activeTimeline}
				onClose={() => setActiveTimeline(null)}
			/>
		</>
	)
}
