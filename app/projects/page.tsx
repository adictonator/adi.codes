'use client'

import { motion } from 'framer-motion'
import {
	Terminal,
	Github,
	Globe,
	Play,
	Sparkles,
	TrendingUp,
	Code,
	ArrowUpRight,
	Filter,
	Rocket,
	Wrench,
	Star,
} from 'lucide-react'
import { useState, useMemo } from 'react'
import { projects, Project } from '@/data/projects'
import TerminalNav from '@/components/terminal-nav'
import { PreviewModal } from '@/components/ui/preview-modal'
import { BackgroundEffect } from '@/components/ui/background-effect'

type FilterType = 'all' | 'experiment' | 'open-source' | 'side-project'
type StatusFilter = 'all' | 'published' | 'in-progress' | 'archived' | 'concept'

export default function ProjectsPage() {
	const [categoryFilter, setCategoryFilter] = useState<FilterType>('all')
	const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
	const [activeProject, setActiveProject] = useState<Project | null>(null)
	const [isPreviewOpen, setIsPreviewOpen] = useState(false)

	// Filter and sort projects
	const filteredProjects = useMemo(() => {
		return projects
			.filter(p => {
				const categoryMatch =
					categoryFilter === 'all' ||
					p.category.toLowerCase().replace(' ', '-') ===
						categoryFilter
				const statusMatch =
					statusFilter === 'all' || p.status === statusFilter
				return categoryMatch && statusMatch
			})
			.sort((a, b) => {
				// Sort by priority first (1 = highest, 5 = lowest)
				if (a.priority !== b.priority) {
					return a.priority - b.priority
				}
				// Then by importance
				if (a.importance !== b.importance) {
					return a.importance === 'primary' ? -1 : 1
				}
				// Finally by date
				return (
					new Date(b.metadata.lastUpdated).getTime() -
					new Date(a.metadata.lastUpdated).getTime()
				)
			})
	}, [categoryFilter, statusFilter])

	const categoryFilters: {
		value: FilterType
		label: string
		icon: any
		count: number
	}[] = [
		{
			value: 'all',
			label: 'all projects',
			icon: Code,
			count: projects.length,
		},
		{
			value: 'side-project',
			label: 'live & deployed',
			icon: Rocket,
			count: projects.filter(p =>
				p.category.toLowerCase().includes('project'),
			).length,
		},
		{
			value: 'experiment',
			label: 'experiments & wip',
			icon: Sparkles,
			count: projects.filter(p => p.category === 'experiment').length,
		},
		//{
		//	value: 'open-source',
		//	label: 'open source',
		//	icon: Github,
		//	count: projects.filter(p => p.category === 'Open Source').length,
		//},
	]

	const statusFilters: { value: StatusFilter; label: string; icon: any }[] = [
		{ value: 'all', label: 'all', icon: Code },
		{ value: 'published', label: 'published', icon: Rocket },
		{ value: 'in-progress', label: 'in progress', icon: Wrench },
		{ value: 'concept', label: 'concept', icon: Sparkles },
		{ value: 'archived', label: 'archived', icon: Terminal },
	]

	const stats = {
		total: projects.length,
		published: projects.filter(p => p.status === 'published').length,
		inProgress: projects.filter(p => p.status === 'in-progress').length,
		totalStars: projects.reduce(
			(acc, p) => acc + (p.metadata.stars || 0),
			0,
		),
	}

	return (
		<div className="border-border mx-auto min-h-screen border-x border-dashed bg-neutral-950 md:max-w-4xl">
			<TerminalNav
				currentPath="~/projects"
				breadcrumbs={[
					{ label: 'projects', href: '/projects', command: 'cd' },
				]}
			/>

			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{/* Header Section */}
				<div className="mb-8 border-b border-dashed border-neutral-800 pb-8">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="space-y-4">
						<div className="flex items-center gap-3">
							<Terminal className="h-6 w-6 text-emerald-500" />
							<h1 className="font-mono text-2xl text-neutral-200 sm:text-3xl">
								projects/
							</h1>
						</div>
						<p className="max-w-2xl font-mono text-sm text-neutral-500">
							A collection of live projects, work-in-progress
							experiments, and open-source contributions.
							Showcasing everything from production apps to
							weekend hacks.
						</p>

						{/* Stats Bar */}
						<div className="flex flex-wrap items-center gap-4 border-t border-dashed border-neutral-800 pt-4 font-mono text-xs text-neutral-600">
							<span className="flex items-center gap-2">
								<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
								{filteredProjects.length} projects
							</span>
							<span>•</span>
							<span className="flex items-center gap-1.5">
								<Rocket className="size-3" />
								{stats.published} live
							</span>
							<span>•</span>
							<span className="flex items-center gap-1.5">
								<Wrench className="size-3" />
								{stats.inProgress} in progress
							</span>
							<span>•</span>
							<span className="flex items-center gap-1.5">
								<Star className="size-3" />
								{stats.totalStars} stars
							</span>
						</div>
					</motion.div>
				</div>

				{/* Filters Section */}
				<div className="mb-8 space-y-4">
					{/* Category Filters */}
					<div className="border border-dashed border-neutral-800 bg-neutral-950/50 p-4">
						<div className="mb-3 flex items-center gap-2">
							<Filter className="h-3.5 w-3.5 text-neutral-600" />
							<span className="font-mono text-xs text-neutral-600">
								filter by category
							</span>
						</div>
						<div className="flex flex-wrap gap-2">
							{categoryFilters.map(
								({ value, label, icon: Icon, count }) => (
									<motion.button
										key={value}
										onClick={() => setCategoryFilter(value)}
										whileHover={{ y: -1 }}
										whileTap={{ y: 0 }}
										className={`flex items-center gap-2 border border-dashed px-3 py-1.5 font-mono text-xs transition-all duration-200 ${
											categoryFilter === value
												? 'border-emerald-700 bg-emerald-950/30 text-emerald-400'
												: 'border-neutral-800 bg-neutral-900/30 text-neutral-500 hover:border-neutral-700 hover:text-neutral-400'
										}`}>
										<Icon className="h-3.5 w-3.5" />
										<span>{label}</span>
										<span
											className={`text-xxs rounded-full px-1.5 py-0.5 ${
												categoryFilter === value
													? 'bg-emerald-900/50 text-emerald-400'
													: 'bg-neutral-800 text-neutral-600'
											}`}>
											{count}
										</span>
									</motion.button>
								),
							)}
						</div>
					</div>

					{/* Status Filters */}
					<div className="border border-dashed border-neutral-800 bg-neutral-950/50 p-4">
						<div className="mb-3 flex items-center gap-2">
							<Terminal className="h-3.5 w-3.5 text-neutral-600" />
							<span className="font-mono text-xs text-neutral-600">
								filter by status
							</span>
						</div>
						<div className="flex flex-wrap gap-2">
							{statusFilters.map(
								({ value, label, icon: Icon }) => (
									<motion.button
										key={value}
										onClick={() => setStatusFilter(value)}
										whileHover={{ y: -1 }}
										whileTap={{ y: 0 }}
										className={`flex items-center gap-1.5 border border-dashed px-3 py-1 font-mono text-xs transition-all duration-200 ${
											statusFilter === value
												? 'border-amber-700 bg-amber-950/30 text-amber-400'
												: 'border-neutral-800 bg-neutral-900/30 text-neutral-500 hover:border-neutral-700 hover:text-neutral-400'
										}`}>
										<Icon className="size-3" />
										<span>{label}</span>
									</motion.button>
								),
							)}
						</div>
					</div>
				</div>

				{/* Projects Grid */}
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{filteredProjects.map((project, index) => (
						<motion.article
							key={project.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: index * 0.05 }}
							className="group relative flex flex-col border border-dashed border-neutral-800 bg-neutral-950/50 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/50">
							{/* Header Bar */}
							<div className="flex items-center justify-between border-b border-dashed border-neutral-800 bg-neutral-900/30 px-3 py-2">
								<div className="flex items-center gap-2">
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
									<span className="text-xxs font-mono text-neutral-600">
										{project.category.toLowerCase()}
									</span>
								</div>
								<div className="flex gap-1.5">
									{project.links.source && (
										<motion.a
											href={project.links.source}
											target="_blank"
											rel="noopener noreferrer"
											whileHover={{ scale: 1.1 }}
											className="text-neutral-600 transition-colors hover:text-neutral-400">
											<Github className="size-3" />
										</motion.a>
									)}
									{project.links.live && (
										<motion.a
											href={project.links.live}
											target="_blank"
											rel="noopener noreferrer"
											whileHover={{ scale: 1.1 }}
											className="text-neutral-600 transition-colors hover:text-neutral-400">
											<Globe className="size-3" />
										</motion.a>
									)}
								</div>
							</div>

							{/* Preview Image */}
							{project.preview?.image && (
								<motion.div
									className="relative aspect-video cursor-pointer overflow-hidden border-b border-dashed border-neutral-800 bg-neutral-900"
									onClick={() => {
										setActiveProject(project)
										setIsPreviewOpen(true)
									}}
									whileHover={{ scale: 0.98 }}>
									<img
										src={project.preview.image}
										alt={project.title}
										className="h-full w-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
									/>
									{project.preview.video && (
										<motion.div
											initial={{ opacity: 0 }}
											whileHover={{ opacity: 1 }}
											className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[1px]">
											<div className="flex items-center gap-2 border border-dashed border-neutral-600 bg-neutral-950/90 px-3 py-2 font-mono text-xs text-neutral-400">
												<Play className="size-3" />
												<span>play demo</span>
											</div>
										</motion.div>
									)}
								</motion.div>
							)}

							{/* Content */}
							<div className="flex flex-1 flex-col p-4">
								<div className="mb-3 space-y-2">
									<h3 className="font-mono text-sm font-normal text-neutral-200 transition-colors group-hover:text-emerald-400">
										{project.title}
									</h3>
									<p className="line-clamp-2 text-xs leading-relaxed text-neutral-500">
										{project.description}
									</p>
								</div>

								{/* Tech Stack */}
								<div className="mb-4 flex flex-wrap gap-1">
									{project.stack.slice(0, 3).map(tech => (
										<span
											key={tech}
											className="text-xxs border border-dashed border-neutral-800 bg-neutral-900/50 px-1.5 py-0.5 font-mono text-neutral-600">
											{tech}
										</span>
									))}
									{project.stack.length > 3 && (
										<span className="text-xxs border border-dashed border-neutral-800 bg-neutral-900/50 px-1.5 py-0.5 font-mono text-neutral-600">
											+{project.stack.length - 3}
										</span>
									)}
								</div>

								{/* Footer */}
								<div className="text-xxs mt-auto flex items-center justify-between border-t border-dashed border-neutral-800 pt-3 text-neutral-600">
									<div className="flex items-center gap-2">
										{project.metadata.stars && (
											<span>
												⭐ {project.metadata.stars}
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
									<motion.span
										whileHover={{ x: 2 }}
										className="text-neutral-700 transition-colors group-hover:text-neutral-500">
										<ArrowUpRight className="size-3" />
									</motion.span>
								</div>
							</div>
						</motion.article>
					))}
				</div>

				{/* Empty State */}
				{filteredProjects.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="flex flex-col items-center justify-center border border-dashed border-neutral-800 bg-neutral-950/30 py-16">
						<Terminal className="mb-4 h-12 w-12 text-neutral-700" />
						<p className="font-mono text-sm text-neutral-600">
							No projects found with current filters
						</p>
						<button
							onClick={() => {
								setCategoryFilter('all')
								setStatusFilter('all')
							}}
							className="mt-4 border border-dashed border-neutral-800 bg-neutral-900/30 px-4 py-2 font-mono text-xs text-neutral-500 transition-colors hover:border-neutral-700 hover:text-neutral-400">
							reset filters
						</button>
					</motion.div>
				)}
			</div>

			<PreviewModal
				isOpen={isPreviewOpen}
				onClose={() => setIsPreviewOpen(false)}
				project={activeProject}
			/>

			<BackgroundEffect variant="grid" intensity={0.4} opacity={0.7} />
		</div>
	)
}
