'use client'

import { Globe, Apple, Smartphone, Puzzle, Play, BookOpen } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import GitHub from '@/components/social-icons/github'
import { Project, ProjectLinkType } from '@/data/projects'
import { trackProjectClick } from '@/lib/ga'
import { cn } from '@/lib/utils'

type LinkConfig = {
	label: string
	Icon: LucideIcon
}

// The one place that decides how each link type looks. Add a key to
// `ProjectLinkType` in data/projects.ts and give it an entry here — it then
// renders consistently everywhere a project's links are shown.
const LINK_CONFIG: Record<ProjectLinkType, LinkConfig> = {
	website: { label: 'Website', Icon: Globe },
	appStore: { label: 'App Store', Icon: Apple },
	playStore: { label: 'Google Play', Icon: Smartphone },
	chromeStore: { label: 'Chrome Store', Icon: Puzzle },
	source: { label: 'Source', Icon: GitHub as unknown as LucideIcon },
	demo: { label: 'Demo', Icon: Play },
	caseStudy: { label: 'Case Study', Icon: BookOpen },
}

// Fixed display order, independent of how keys are written in the data.
const LINK_ORDER: ProjectLinkType[] = [
	'website',
	'appStore',
	'playStore',
	'chromeStore',
	'demo',
	'source',
	'caseStudy',
]

// Priority order for the single "primary" destination of a project (used by
// stretched/whole-card links). Highest priority first.
const PRIMARY_ORDER: ProjectLinkType[] = [
	'caseStudy',
	'website',
	'appStore',
	'playStore',
	'chromeStore',
	'demo',
	'source',
]

export function getProjectLinks(project: Project): ProjectLinkType[] {
	return LINK_ORDER.filter(type => Boolean(project.links[type]))
}

export function getPrimaryProjectLink(project: Project): string | null {
	for (const type of PRIMARY_ORDER) {
		const url = project.links[type]
		if (url) return url
	}
	return null
}

type ProjectLinksProps = {
	project: Project
	/** `icon` = bare icon row (cards/headers); `button` = labelled chips (modals). */
	variant?: 'icon' | 'button'
	className?: string
}

export function ProjectLinks({
	project,
	variant = 'icon',
	className,
}: ProjectLinksProps) {
	const types = getProjectLinks(project)
	if (types.length === 0) return null

	return (
		<div
			className={cn(
				'flex flex-wrap items-center',
				variant === 'icon' ? 'gap-4' : 'gap-2',
				className,
			)}>
			{types.map(type => {
				const { label, Icon } = LINK_CONFIG[type]
				const url = project.links[type]!
				const onClick = () =>
					trackProjectClick({
						project: project.title,
						linkType: type,
						url,
					})

				if (variant === 'button') {
					return (
						<a
							key={type}
							href={url}
							target="_blank"
							rel="noopener noreferrer"
							onClick={onClick}
							className="flex items-center gap-2 border border-dashed border-neutral-800 bg-neutral-900/50 px-3 py-2 font-mono text-xs text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-300">
							<Icon className="h-3.5 w-3.5" />
							<span className="hidden sm:inline">{label}</span>
						</a>
					)
				}

				return (
					<a
						key={type}
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						onClick={onClick}
						title={label}
						aria-label={label}
						className="text-neutral-600 transition-colors hover:text-neutral-400">
						<Icon className="size-3.5" />
					</a>
				)
			})}
		</div>
	)
}
