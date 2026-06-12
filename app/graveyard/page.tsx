import type { Metadata } from 'next'
import GraveyardClient from './graveyard-client'

export const metadata: Metadata = {
	title: 'Project Graveyard — Lessons from Dead Side Projects',
	description:
		'Side projects that died, and what each one taught me. An honest post-mortem log by a product engineer — because shipped work only tells half the story.',
	alternates: {
		canonical: '/graveyard',
	},
	openGraph: {
		title: 'Project Graveyard — Lessons from Dead Side Projects',
		description:
			'Side projects that died, and what each one taught me. The honest half of a product engineer’s portfolio.',
		url: 'https://adi.codes/graveyard',
		type: 'website',
	},
}

export default function GraveyardPage() {
	return <GraveyardClient />
}
