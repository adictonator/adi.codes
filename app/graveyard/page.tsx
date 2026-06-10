'use client'

import { motion } from 'framer-motion'
import {
	Skull,
	Calendar,
	Clock,
	Globe,
	GlassWater,
	HeartCrack,
	Lightbulb,
	ArrowRight,
} from 'lucide-react'
import { graveyard, GraveyardProject } from '@/data/graveyard'
import TerminalNav from '@/components/terminal-nav'
import { BackgroundEffect } from '@/components/ui/background-effect'

// Turn two dates into a human lifespan: "18 days", "2 months", "1 year".
function lifespan(born: string, died: string): string {
	const ms = new Date(died).getTime() - new Date(born).getTime()
	const days = Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)))
	if (days < 31) return `${days} day${days === 1 ? '' : 's'}`
	const months = Math.round(days / 30)
	if (months < 12) return `${months} month${months === 1 ? '' : 's'}`
	const years = Math.round(months / 12)
	return `${years} year${years === 1 ? '' : 's'}`
}

function formatDate(d: string): string {
	return new Date(d).toLocaleDateString('en-US', {
		month: 'short',
		year: 'numeric',
	})
}

function Headstone({
	project,
	index,
}: {
	project: GraveyardProject
	index: number
}) {
	return (
		<motion.article
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.08 }}
			className="group relative flex flex-col border border-dashed border-neutral-800 bg-neutral-950/50 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/40">
			{/* Header bar — RIP + lifespan */}
			<div className="flex items-center justify-between border-b border-dashed border-neutral-800 bg-neutral-900/30 px-3 py-2">
				<div className="flex items-center gap-2">
					<Skull className="size-3.5 text-rose-500/70" />
					<span className="text-xxs font-mono uppercase tracking-wider text-neutral-600">
						{project.category}
					</span>
				</div>
				<span
					className={`text-xxs flex items-center gap-1 font-mono ${
						project.wasLive
							? 'text-amber-500/80'
							: 'text-neutral-600'
					}`}>
					<Globe className="size-3" />
					{project.wasLive ? 'shipped' : 'died in the workshop'}
				</span>
			</div>

			{/* Body */}
			<div className="flex flex-1 flex-col p-4">
				<div className="mb-3 space-y-1.5">
					<h3 className="font-mono text-sm text-neutral-200 transition-colors group-hover:text-rose-400">
						{project.title}
					</h3>
					<p className="font-mono text-xs italic text-neutral-500">
						“{project.tagline}”
					</p>
				</div>

				{/* Lifespan line */}
				<div className="text-xxs mb-4 flex flex-wrap items-center gap-3 border-y border-dashed border-neutral-800 py-2.5 font-mono text-neutral-600">
					<span className="flex items-center gap-1.5">
						<Calendar className="size-3" />
						{formatDate(project.born)} → {formatDate(project.died)}
					</span>
					<span className="flex items-center gap-1.5 text-neutral-500">
						<Clock className="size-3" />
						lived {lifespan(project.born, project.died)}
					</span>
				</div>

				{/* Epitaph */}
				<div className="mb-4 border-l-2 border-rose-900/60 bg-rose-950/10 px-3 py-2">
					<p className="font-mono text-xs leading-relaxed text-neutral-400">
						{project.epitaph}
					</p>
				</div>

				{/* Cause of death */}
				<div className="mb-4 space-y-1.5">
					<div className="text-xxs flex items-center gap-1.5 font-mono uppercase tracking-wider text-rose-500/60">
						<HeartCrack className="size-3" />
						cause of death
					</div>
					<p className="text-xs leading-relaxed text-neutral-500">
						{project.causeOfDeath}
					</p>
				</div>

				{/* Lessons */}
				{project.lessons && (
					<div className="mb-4 space-y-1.5">
						<div className="text-xxs flex items-center gap-1.5 font-mono uppercase tracking-wider text-emerald-500/50">
							<Lightbulb className="size-3" />
							what it taught me
						</div>
						<p className="text-xs leading-relaxed text-neutral-500">
							{project.lessons}
						</p>
					</div>
				)}

				{/* Tech stack */}
				<div className="mb-4 flex flex-wrap gap-1">
					{project.stack.map(tech => (
						<span
							key={tech}
							className="text-xxs border border-dashed border-neutral-800 bg-neutral-900/50 px-1.5 py-0.5 font-mono text-neutral-600 line-through decoration-neutral-700">
							{tech}
						</span>
					))}
				</div>

				{/* Successor */}
				{project.successor && (
					<div className="text-xxs mt-auto flex items-center gap-1.5 border-t border-dashed border-neutral-800 pt-3 font-mono text-neutral-600">
						<ArrowRight className="size-3 text-emerald-500/60" />
						<span>
							lived on as{' '}
							<span className="text-neutral-400">
								{project.successor}
							</span>
						</span>
					</div>
				)}
			</div>
		</motion.article>
	)
}

export default function GraveyardPage() {
	const buried = graveyard.length
	const everShipped = graveyard.filter(p => p.wasLive).length

	return (
		<div className="border-border mx-auto min-h-screen border-x border-dashed bg-neutral-950 md:max-w-4xl">
			<TerminalNav
				currentPath="~/graveyard"
				breadcrumbs={[
					{ label: 'projects', href: '/projects', command: 'cd' },
					{ label: 'graveyard', href: '/graveyard', command: 'cd' },
				]}
			/>

			<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mb-8 border-b border-dashed border-neutral-800 pb-8">
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="space-y-4">
						<div className="flex items-center gap-3">
							<Skull className="h-6 w-6 text-rose-500/80" />
							<h1 className="font-mono text-2xl text-neutral-200 sm:text-3xl">
								graveyard/
							</h1>
						</div>
						<p className="max-w-2xl font-mono text-sm leading-relaxed text-neutral-500">
							Not every project ships. These are the ones I started,
							learned from, and buried. I keep them here on purpose —
							the dead ends are part of the work, and pretending they
							never happened would be the dishonest version of this
							site.
						</p>

						{/* Stats */}
						<div className="text-xxs flex flex-wrap items-center gap-4 border-t border-dashed border-neutral-800 pt-4 font-mono text-neutral-600">
							<span className="flex items-center gap-2">
								<span className="h-1.5 w-1.5 rounded-full bg-rose-500/70" />
								{buried} buried
							</span>
							<span>•</span>
							<span className="flex items-center gap-1.5">
								<Globe className="size-3" />
								{everShipped} ever shipped
							</span>
							<span>•</span>
							<span className="flex items-center gap-1.5">
								<GlassWater className="size-3" />
								all gone but not wasted
							</span>
						</div>
					</motion.div>
				</div>

				{/* Headstones */}
				<div className="grid gap-4 sm:grid-cols-2">
					{graveyard.map((project, index) => (
						<Headstone
							key={project.title}
							project={project}
							index={index}
						/>
					))}
				</div>

				{/* Footer note */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.3 }}
					className="text-xxs mt-8 border-t border-dashed border-neutral-800 pt-6 text-center font-mono text-neutral-600">
					<p>
						$ git log --dead — {buried} entr
						{buried === 1 ? 'y' : 'ies'}. Looking for the living?{' '}
						<a
							href="/projects"
							className="text-emerald-500/70 underline-offset-2 hover:underline">
							cd ~/projects
						</a>
					</p>
				</motion.div>
			</div>

			<BackgroundEffect variant="grid" intensity={0.3} opacity={0.5} />
		</div>
	)
}
