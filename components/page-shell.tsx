import type { ReactNode } from 'react'
import TerminalNav, { type NavItem } from '@/components/terminal-nav'
import FloatingQuickNav from '@/components/floating-quick-nav'
import AvailabilityCta from '@/components/availability-cta'
import SubpageFooter from '@/components/subpage-footer'
import { BackgroundEffect } from '@/components/ui/background-effect'

/**
 * The frame every page except the homepage sits in: same width, same
 * borders, same nav, same footer. Change it here and /blog, the posts,
 * /projects, /graveyard, /license and the 404 all follow.
 */
export default function PageShell({
	currentPath,
	breadcrumbs,
	children,
	availability = 'page',
}: {
	currentPath: string
	breadcrumbs: NavItem[]
	children: ReactNode
	/** Analytics label for the closing "I'm available" card; `false` hides it. */
	availability?: string | false
}) {
	return (
		<div className="mx-auto flex min-h-dvh w-full max-w-4xl flex-col bg-neutral-950 md:border-x md:border-dashed md:border-neutral-800">
			<TerminalNav currentPath={currentPath} breadcrumbs={breadcrumbs} />

			<main className="flex-1 px-4 py-8 sm:px-6 md:px-8">{children}</main>

			{availability !== false && (
				<div className="px-4 pb-10 sm:px-6 md:px-8">
					<AvailabilityCta variant={availability} />
				</div>
			)}

			<SubpageFooter />
			<FloatingQuickNav />
			<BackgroundEffect variant="grid" intensity={0.4} opacity={0.7} />
		</div>
	)
}
