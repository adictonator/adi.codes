import { pageMetadata } from '@/lib/metadata'
import PageShell from '@/components/page-shell'
import ProjectsClient from './projects-client'

export const metadata = pageMetadata({
	title: 'Projects — iOS Apps, WordPress Plugins & Web Apps',
	description:
		'Shipped work by Aditya Bhaskar Sharma: iOS and macOS apps built solo, idea to App Store, WordPress plugins on 10,000+ sites, client builds, and what is in progress.',
	path: '/projects',
})

export default function ProjectsPage() {
	return (
		<PageShell
			currentPath="~/projects"
			breadcrumbs={[{ label: 'projects', href: '/projects', command: 'cd' }]}
			availability="projects">
			<ProjectsClient />
		</PageShell>
	)
}
