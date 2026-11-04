'use client'

import { ArrowUpRight, Download, Mail } from 'lucide-react'
import LinkedIn from '@/components/social-icons/linked-in'
import { mailto, siteConfig } from '@/lib/site'
import { trackHireClick, trackResumeClick } from '@/lib/ga'

/**
 * The "I'm available" card that closes every sub-page (blog posts, projects,
 * graveyard). Someone who lands on a post from search should be one tap from
 * email, résumé and LinkedIn without hunting for the homepage's hire section.
 */
export default function AvailabilityCta({
	variant = 'page',
}: {
	/** Shown in analytics, so you can tell which page converted. */
	variant?: string
}) {
	const actions = [
		{
			label: 'Email me',
			href: mailto(),
			Icon: Mail,
			onClick: () => trackHireClick({ method: 'email' }),
		},
		{
			label: 'Résumé',
			href: siteConfig.resume,
			Icon: Download,
			download: true,
			onClick: () => trackResumeClick({ variant: `cta-${variant}` }),
		},
		{
			label: 'LinkedIn',
			href: siteConfig.social.linkedin,
			Icon: LinkedIn,
			external: true,
			filled: true,
			onClick: () => trackHireClick({ method: 'linkedin' }),
		},
	]

	return (
		<section
			aria-labelledby="availability-heading"
			className="border border-dashed border-neutral-800 bg-neutral-900/30">
			<div className="flex items-center justify-between gap-3 border-b border-dashed border-neutral-800 bg-neutral-900/50 px-4 py-2 font-mono text-xs">
				<span className="flex items-center gap-2 text-emerald-500">
					<span className="relative flex size-2">
						<span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
						<span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
					</span>
					status: open to work
				</span>
				<span className="text-neutral-600">~/hire</span>
			</div>

			<div className="space-y-2 p-4 sm:p-5">
				<h2
					id="availability-heading"
					className="text-xl font-light tracking-tight text-neutral-200 sm:text-2xl">
					Hiring? I&apos;m available.
				</h2>
				<p className="text-sm leading-relaxed text-neutral-400">
					{siteConfig.role} — iOS, React Native and full-stack web,
					13+ years. Open to full-time roles, contracts (short or long
					term) and freelance projects.{' '}
					<span className="text-neutral-500">
						Remote-first, {siteConfig.availability.timezone}.
					</span>
				</p>
			</div>

			<div className="grid grid-cols-1 divide-y divide-dashed divide-neutral-800 border-t border-dashed border-neutral-800 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
				{actions.map(
					({ label, href, Icon, onClick, download, external, filled }) => (
					<a
						key={label}
						href={href}
						onClick={onClick}
						{...(download && { download: true })}
						{...((external || download) && {
							target: '_blank',
							rel: 'noopener noreferrer',
						})}
						className="flex items-center justify-center gap-2 px-4 py-3 font-mono text-sm text-neutral-300 transition-colors hover:bg-neutral-900/60 hover:text-emerald-400">
						<Icon className={filled ? 'size-4 fill-current' : 'size-4'} />
						{label}
					</a>
				))}
			</div>

			<p className="border-t border-dashed border-neutral-800 px-4 py-3 text-xs leading-relaxed text-neutral-500">
				Got a project rather than a role?{' '}
				<a
					href={siteConfig.studio.start}
					target="_blank"
					rel="noopener noreferrer"
					onClick={() => trackHireClick({ method: 'lazycodelab' })}
					className="inline-flex items-center gap-0.5 border-b border-dashed border-neutral-700 text-neutral-300 hover:text-emerald-400">
					{siteConfig.studio.name}
					<ArrowUpRight className="size-3" />
				</a>
				, my {siteConfig.studio.tagline}, takes those on.
			</p>
		</section>
	)
}
