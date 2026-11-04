'use client'

import { Terminal, Play, ArrowUpRight } from 'lucide-react'
import { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Project, projects } from '@/data/projects'
import { ProjectLinks, getPrimaryProjectLink } from './project-links'
import { categoryLabels, statusStyles } from '@/lib/project-status'
import { formatDate } from '@/lib/format'
import { cn } from '@/lib/utils'

type FilterType = 'featured' | 'live' | 'wip'

const filters: { value: FilterType; label: string }[] = [
	{ value: 'featured', label: 'ls -la' },
	{ value: 'live', label: 'live/' },
	{ value: 'wip', label: 'wip/' },
]

const SLOTS = 4

const byPriority = (a: Project, b: Project) =>
	a.priority - b.priority ||
	new Date(b.metadata.lastUpdated).getTime() -
		new Date(a.metadata.lastUpdated).getTime()

export default function CreativeLab() {
	const [filter, setFilter] = useState<FilterType>('featured')

	const visible = useMemo(() => {
		const pool =
			filter === 'featured'
				? projects.filter(p => p.importance === 'primary')
				: filter === 'live'
					? projects.filter(p => p.status === 'published')
					: projects.filter(
							p => p.status === 'in-progress' || p.status === 'concept',
						)
		return [...pool].sort(byPriority).slice(0, SLOTS)
	}, [filter])

	// Always four cells so the grid keeps its shape.
	const slots: (Project | null)[] = [
		...visible,
		...Array(Math.max(0, SLOTS - visible.length)).fill(null),
	]

	return (
		<>
			<div className="border-border flex items-center justify-between gap-3 border-b border-dashed bg-neutral-900/30 px-3 py-3 sm:px-4">
				<div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
					<Terminal className="size-3.5 text-emerald-500" />
					~/projects
					<span className="text-neutral-700">$</span>
				</div>

				<div className="flex gap-1.5" role="group" aria-label="Filter projects">
					{filters.map(({ value, label }) => (
						<button
							key={value}
							type="button"
							aria-pressed={filter === value}
							onClick={() => setFilter(value)}
							className={cn(
								'border border-dashed px-2 py-1 font-mono text-xxs transition-colors sm:px-3 sm:text-xs',
								filter === value
									? 'border-emerald-700 bg-emerald-500/10 text-emerald-400'
									: 'border-neutral-800 bg-neutral-950/30 text-neutral-500 hover:border-neutral-700 hover:text-neutral-400',
							)}>
							{label}
						</button>
					))}
				</div>
			</div>

			{/* Each cell draws its own right/bottom border; the wrapper clips the
			    ones on the outer edge, so it stays correct at any column count. */}
			<div className="overflow-hidden">
				<div className="-mr-px -mb-px grid min-w-0 md:grid-cols-2">
					{slots.map((project, index) =>
						project ? (
							<ProjectCard key={project.title} project={project} />
						) : (
							<div
								key={`empty-${index}`}
								className="border-border relative flex min-h-56 flex-col items-center justify-center border-r border-b border-dashed p-4 text-center">
								<Terminal className="mb-3 size-8 text-neutral-700" />
								<p className="font-mono text-xs leading-relaxed text-neutral-600">
									Nothing else here yet.
									<br />
									<Link
										href="/projects"
										className="text-neutral-500 underline-offset-2 hover:underline">
										See all projects
									</Link>
								</p>
							</div>
						),
					)}
				</div>
			</div>
		</>
	)
}

function ProjectCard({ project }: { project: Project }) {
	const primaryLink = getPrimaryProjectLink(project)
	const status = statusStyles[project.status]

	return (
		<article className="group border-border relative flex h-full flex-col border-r border-b border-dashed transition-colors duration-300 hover:bg-neutral-900/30">
			{/* Whole-card link to the project's best destination. */}
			{primaryLink ? (
				<a
					href={primaryLink}
					target="_blank"
					rel="noopener noreferrer"
					className="absolute inset-0 z-0"
					aria-label={`${project.title} — open project`}
				/>
			) : (
				<Link
					href="/projects"
					className="absolute inset-0 z-0"
					aria-label={`${project.title} — see on the projects page`}
				/>
			)}

			<div className="border-border relative flex items-center justify-between gap-2 border-b border-dashed px-3 py-2 sm:px-4">
				<span className="flex items-center gap-2 font-mono text-xxs">
					<span className={cn('size-2 rounded-full', status.dot)} />
					<span className="text-neutral-600">
						{categoryLabels[project.category]}
					</span>
					<span className="text-neutral-700">/</span>
					<span className={status.text}>{status.label}</span>
				</span>
				<ProjectLinks project={project} variant="icon" className="relative z-10" />
			</div>

			<div className="pointer-events-none relative z-0 flex flex-1 flex-col gap-y-4">
				{project.preview?.image && (
					<div className="relative aspect-video overflow-hidden bg-neutral-900">
						<Image
							src={project.preview.image}
							alt=""
							fill
							sizes="(min-width: 768px) 25vw, 100vw"
							className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
						/>
						{project.preview.video && (
							<div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
								<span className="flex items-center gap-2 border border-dashed border-neutral-600 bg-neutral-950/80 px-3 py-2 font-mono text-xs text-neutral-400">
									<Play className="size-3" />
									play demo
								</span>
							</div>
						)}
					</div>
				)}

				<div className="flex flex-1 flex-col space-y-3 px-3 pb-4 sm:px-4">
					<h3 className="font-mono text-base font-normal text-neutral-200 transition-colors group-hover:text-emerald-400">
						{project.title}
					</h3>
					<p className="flex-1 text-xs leading-relaxed text-neutral-500 sm:text-sm">
						{project.description}
					</p>
					<div className="flex flex-wrap gap-1.5">
						{project.stack.slice(0, 4).map(tech => (
							<span
								key={tech}
								className="border-border border border-dashed bg-neutral-900/50 px-2 py-0.5 font-mono text-xxs text-neutral-500">
								{tech}
							</span>
						))}
						{project.stack.length > 4 && (
							<span className="border-border border border-dashed bg-neutral-900/50 px-2 py-0.5 font-mono text-xxs text-neutral-600">
								+{project.stack.length - 4}
							</span>
						)}
					</div>
				</div>
			</div>

			<div className="border-border pointer-events-none relative flex shrink-0 items-center justify-between border-t border-dashed px-3 py-2.5 font-mono text-xxs text-neutral-600 sm:px-4">
				<span>
					{project.metadata.version && `v${project.metadata.version} · `}
					{formatDate(project.metadata.lastUpdated, 'monthYear')}
				</span>
				<ArrowUpRight className="size-3 transition-colors group-hover:text-neutral-400" />
			</div>
		</article>
	)
}
