import type { Project } from '@/data/projects'

type Status = Project['status']
type Category = Project['category']

/** One colour per status, shared by the homepage lab, /projects and the modal. */
export const statusStyles: Record<Status, { dot: string; text: string; label: string }> = {
	published: { dot: 'bg-success', text: 'text-success', label: 'live' },
	'in-progress': { dot: 'bg-warning', text: 'text-warning', label: 'in progress' },
	stale: { dot: 'bg-stale', text: 'text-stale', label: 'parked' },
	concept: { dot: 'bg-neutral-600', text: 'text-neutral-500', label: 'concept' },
	archived: { dot: 'bg-error', text: 'text-error', label: 'archived' },
}

/** Human labels for the category slugs used in data/projects.ts. */
export const categoryLabels: Record<Category, string> = {
	'mobile-app': 'mobile app',
	'desktop-app': 'macOS app',
	'web-app': 'web app',
	'browser-extension': 'extension',
	tool: 'wordpress plugin',
	library: 'library',
	project: 'project',
	game: 'game',
	experiment: 'experiment',
	'client-work': 'client work',
}

/** Groups for the /projects type filter. Empty groups are hidden. */
export const categoryGroups: { value: string; label: string; categories: Category[] }[] = [
	{ value: 'apps', label: 'apps', categories: ['mobile-app', 'desktop-app'] },
	{ value: 'plugins', label: 'wordpress', categories: ['tool', 'library'] },
	{ value: 'web', label: 'web & extensions', categories: ['web-app', 'browser-extension', 'project'] },
	{ value: 'client', label: 'client work', categories: ['client-work'] },
	{ value: 'games', label: 'games', categories: ['game'] },
	{ value: 'experiments', label: 'experiments', categories: ['experiment'] },
]
