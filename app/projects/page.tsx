import type { Metadata } from 'next'
import ProjectsClient from './projects-client'

export const metadata: Metadata = {
	title: 'Projects — iOS Apps, Web Apps & Dev Tools',
	description:
		'Shipped work by Aditya Bhaskar Sharma, product engineer: iOS apps built solo from idea to App Store (Swift, SwiftUI), web apps and developer tools in Next.js, React, and TypeScript.',
	alternates: {
		canonical: '/projects',
	},
	openGraph: {
		title: 'Projects — iOS Apps, Web Apps & Dev Tools',
		description:
			'Shipped work by a product engineer: iOS apps from idea to App Store, web apps, and developer tools.',
		url: 'https://adi.codes/projects',
		type: 'website',
	},
}

export default function ProjectsPage() {
	return <ProjectsClient />
}
