'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Terminal, Play, ArrowUpRight, Filter, Rocket, Wrench, Skull } from 'lucide-react'
import { useState, useMemo } from 'react'
import { projects, Project } from '@/data/projects'
import { ProjectLinks } from '@/components/project-links'
import { PreviewModal } from '@/components/ui/preview-modal'
import { categoryGroups, categoryLabels, statusStyles } from '@/lib/project-status'
import { formatDate } from '@/lib/format'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/use-mounted'

type Status = Project['status']

const statusOrder: Status[] = ['published', 'in-progress', 'stale', 'concept', 'archived']

function chipClass(active: boolean, tone: 'emerald' | 'amber') {
	return cn(
		'flex items-center gap-2 border border-dashed px-3 py-1.5 font-mono text-xs transition-colors',
		active
			? tone === 'emerald'
				? 'border-emerald-700 bg-emerald-500/10 text-emerald-400'
				: 'border-amber-700 bg-amber-500/10 text-amber-400'
			: 'border-neutral-800 bg-neutral-900/30 text-neutral-500 hover:border-neutral-700 hover:text-neutral-400',
	)
}

export default function ProjectsClient() {
	const mounted = useMounted()

	const [group, setGroup] = useState('all')
	const [status, setStatus] = useState<Status | 'all'>('all')
	const [activeProject, setActiveProject] = useState<Project | null>(null)

	const inGroup = (p: Project, value: string) =>
		value === 'all' ||
		categoryGroups.find(g => g.value === value)?.categories.includes(p.category)

	// Only offer filters that match something.
	const groups = [
		{ value: 'all', label: 'all', count: projects.length },
		...categoryGroups
			.map(g => ({
				value: g.value,
				label: g.label,
				count: projects.filter(p => g.categories.includes(p.category)).length,
			}))
			.filter(g => g.count > 0),
	]
	const statuses = statusOrder
		.map(s => ({ value: s, count: projects.filter(p => p.status === s).length }))
		.filter(s => s.count > 0)

	const filteredProjects = useMemo(
		() =>
			projects
				.filter(p => inGroup(p, group) && (status === 'all' || p.status === status))
				.sort(
					(a, b) =>
						a.priority - b.priority ||
						(a.importance === b.importance ? 0 : a.importance === 'primary' ? -1 : 1) ||
						new Date(b.metadata.lastUpdated).getTime() -
							new Date(a.metadata.lastUpdated).getTime(),
				),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[group, status],
	)

	const live = projects.filter(p => p.status === 'published').length
	const inProgress = projects.filter(p => p.status === 'in-progress').length

	return (
		<>
			{/* Header */}
			<div className="mb-8 border-b border-dashed border-neutral-800 pb-8">
				<motion.div
					initial={mounted ? { opacity: 0, y: -20 } : false}
					animate={{ opacity: 1, y: 0 }}
					className="space-y-4">
					<div className="flex items-center gap-3">
						<Terminal className="size-6 text-emerald-500" />
						<h1 className="font-mono text-2xl text-neutral-200 sm:text-3xl">
							projects/
						</h1>
					</div>
					<p className="max-w-2xl font-mono text-sm leading-relaxed text-neutral-500">
						Everything I&apos;ve built that&apos;s still breathing: apps
						on the App Store, WordPress plugins other people&apos;s
						sites depend on, client builds, and the half-finished
						things I haven&apos;t given up on yet. Tap a card for the
						details.
					</p>

					<Link
						href="/graveyard"
						className="group inline-flex w-fit flex-wrap items-center gap-2 border border-dashed border-neutral-800 bg-neutral-950/50 px-3 py-1.5 font-mono text-xs text-neutral-500 transition-colors hover:border-rose-900/60 hover:text-rose-400">
						<Skull className="size-3.5 text-rose-500/60 transition-colors group-hover:text-rose-400" />
						<span>visit the graveyard</span>
						<span className="text-xxs text-neutral-700 group-hover:text-rose-500/60">
							{'//'} projects that didn&apos;t make it
						</span>
					</Link>

					<div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-dashed border-neutral-800 pt-4 font-mono text-xs text-neutral-600">
						<span className="flex items-center gap-2">
							<span className="size-1.5 rounded-full bg-emerald-500" />
							{projects.length} projects
						</span>
						<span aria-hidden="true">•</span>
						<span className="flex items-center gap-1.5">
							<Rocket className="size-3" />
							{live} live
						</span>
						<span aria-hidden="true">•</span>
						<span className="flex items-center gap-1.5">
							<Wrench className="size-3" />
							{inProgress} in progress
						</span>
					</div>
				</motion.div>
			</div>

			{/* Filters */}
			<div className="mb-8 space-y-4">
				<fieldset className="border border-dashed border-neutral-800 bg-neutral-950/50 p-4">
					<legend className="sr-only">Filter by type</legend>
					<div className="mb-3 flex items-center gap-2 font-mono text-xs text-neutral-600">
						<Filter className="size-3.5" />
						filter by type
					</div>
					<div className="flex flex-wrap gap-2">
						{groups.map(g => (
							<button
								key={g.value}
								type="button"
								aria-pressed={group === g.value}
								onClick={() => setGroup(g.value)}
								className={chipClass(group === g.value, 'emerald')}>
								{g.label}
								<span className="text-xxs text-neutral-600">{g.count}</span>
							</button>
						))}
					</div>
				</fieldset>

				<fieldset className="border border-dashed border-neutral-800 bg-neutral-950/50 p-4">
					<legend className="sr-only">Filter by status</legend>
					<div className="mb-3 flex items-center gap-2 font-mono text-xs text-neutral-600">
						<Terminal className="size-3.5" />
						filter by status
					</div>
					<div className="flex flex-wrap gap-2">
						<button
							type="button"
							aria-pressed={status === 'all'}
							onClick={() => setStatus('all')}
							className={chipClass(status === 'all', 'amber')}>
							all
						</button>
						{statuses.map(s => (
							<button
								key={s.value}
								type="button"
								aria-pressed={status === s.value}
								onClick={() => setStatus(s.value)}
								className={chipClass(status === s.value, 'amber')}>
								<span className={cn('size-1.5 rounded-full', statusStyles[s.value].dot)} />
								{statusStyles[s.value].label}
								<span className="text-xxs text-neutral-600">{s.count}</span>
							</button>
						))}
					</div>
				</fieldset>
			</div>

			{/* Grid */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{filteredProjects.map((project, index) => (
					<motion.article
						key={project.title}
						initial={mounted ? { opacity: 0, y: 20 } : false}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: index * 0.03 }}
						className="group relative flex flex-col border border-dashed border-neutral-800 bg-neutral-950/50 transition-colors hover:border-neutral-700 hover:bg-neutral-900/50">
						{/* Header bar */}
						<div className="flex items-center justify-between gap-2 border-b border-dashed border-neutral-800 bg-neutral-900/30 px-3 py-2">
							<span className="flex items-center gap-2 font-mono text-xxs">
								<span className={cn('size-1.5 rounded-full', statusStyles[project.status].dot)} />
								<span className="text-neutral-600">{categoryLabels[project.category]}</span>
								<span className="text-neutral-700">/</span>
								<span className={statusStyles[project.status].text}>
									{statusStyles[project.status].label}
								</span>
							</span>
							{/* Above the card's stretched button, so these stay clickable. */}
							<ProjectLinks project={project} variant="icon" className="relative z-10" />
						</div>

						{project.preview?.image && (
							<div className="relative aspect-video overflow-hidden border-b border-dashed border-neutral-800 bg-neutral-900">
								{/* eslint-disable-next-line @next/next/no-img-element */}
								<img
									src={project.preview.image}
									alt=""
									loading="lazy"
									decoding="async"
									className="size-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
								/>
								{project.preview.video && (
									<div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
										<span className="flex items-center gap-2 border border-dashed border-neutral-600 bg-neutral-950/90 px-3 py-2 font-mono text-xs text-neutral-400">
											<Play className="size-3" />
											play demo
										</span>
									</div>
								)}
							</div>
						)}

						<div className="flex flex-1 flex-col p-4">
							<h2 className="mb-2 font-mono text-sm font-normal text-neutral-200 transition-colors group-hover:text-emerald-400">
								{/* Stretched button: the whole card opens the details. */}
								<button
									type="button"
									onClick={() => setActiveProject(project)}
									className="text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-emerald-500/40">
									{project.title}
								</button>
							</h2>
							<p className="mb-4 line-clamp-3 text-xs leading-relaxed text-neutral-500">
								{project.description}
							</p>

							<div className="mb-4 flex flex-wrap gap-1">
								{project.stack.slice(0, 3).map(tech => (
									<span
										key={tech}
										className="border border-dashed border-neutral-800 bg-neutral-900/50 px-1.5 py-0.5 font-mono text-xxs text-neutral-600">
										{tech}
									</span>
								))}
								{project.stack.length > 3 && (
									<span className="border border-dashed border-neutral-800 bg-neutral-900/50 px-1.5 py-0.5 font-mono text-xxs text-neutral-600">
										+{project.stack.length - 3}
									</span>
								)}
							</div>

							<div className="mt-auto flex items-center justify-between border-t border-dashed border-neutral-800 pt-3 font-mono text-xxs text-neutral-600">
								<span>
									{project.metadata.version && `v${project.metadata.version} · `}
									{formatDate(project.metadata.lastUpdated, 'monthYear')}
								</span>
								<ArrowUpRight className="size-3 text-neutral-700 transition-colors group-hover:text-neutral-500" />
							</div>
						</div>
					</motion.article>
				))}
			</div>

			{filteredProjects.length === 0 && (
				<div className="flex flex-col items-center justify-center border border-dashed border-neutral-800 bg-neutral-950/30 py-16">
					<Terminal className="mb-4 size-12 text-neutral-700" />
					<p className="font-mono text-sm text-neutral-600">
						No projects match both filters
					</p>
					<button
						type="button"
						onClick={() => {
							setGroup('all')
							setStatus('all')
						}}
						className="mt-4 border border-dashed border-neutral-800 bg-neutral-900/30 px-4 py-2 font-mono text-xs text-neutral-500 transition-colors hover:border-neutral-700 hover:text-neutral-400">
						reset filters
					</button>
				</div>
			)}

			<PreviewModal
				isOpen={activeProject !== null}
				onClose={() => setActiveProject(null)}
				project={activeProject}
			/>
		</>
	)
}
