import { pageMetadata } from '@/lib/metadata'
import PageShell from '@/components/page-shell'
import GraveyardClient from './graveyard-client'

export const metadata = pageMetadata({
	title: 'Project Graveyard — Lessons from Dead Side Projects',
	description:
		'Side projects that died, and what each one taught me. An honest post-mortem log by a product engineer, because shipped work only tells half the story.',
	path: '/graveyard',
})

export default function GraveyardPage() {
	return (
		<PageShell
			currentPath="~/graveyard"
			breadcrumbs={[
				{ label: 'projects', href: '/projects', command: 'cd' },
				{ label: 'graveyard', href: '/graveyard', command: 'cd' },
			]}
			availability="graveyard">
			<GraveyardClient />
		</PageShell>
	)
}
