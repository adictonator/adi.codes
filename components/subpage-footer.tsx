'use client'

import Link from 'next/link'
import { mailto, siteConfig } from '@/lib/site'
import { trackHireClick, trackResumeClick } from '@/lib/ga'

/** Footer for every page except the homepage, which has its own. */
export default function SubpageFooter() {
	const linkClass =
		'text-neutral-500 transition-colors hover:text-emerald-400'

	return (
		<footer className="border-t border-dashed border-neutral-800 px-4 pt-6 pb-24 font-mono text-xs sm:px-6 md:px-8 md:pb-6">
			<nav
				aria-label="Contact"
				className="flex flex-wrap items-center gap-x-5 gap-y-2">
				<span className="text-emerald-500">$ contact</span>
				<a
					href={mailto()}
					onClick={() => trackHireClick({ method: 'email' })}
					className={linkClass}>
					email
				</a>
				<a
					href={siteConfig.social.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					onClick={() => trackHireClick({ method: 'linkedin' })}
					className={linkClass}>
					linkedin
				</a>
				<a
					href={siteConfig.social.github}
					target="_blank"
					rel="noopener noreferrer"
					className={linkClass}>
					github
				</a>
				<a
					href={siteConfig.resume}
					target="_blank"
					rel="noopener noreferrer"
					download
					onClick={() => trackResumeClick({ variant: 'subpage-footer' })}
					className={linkClass}>
					résumé
				</a>
				<a href={siteConfig.feed} className={linkClass}>
					rss
				</a>
			</nav>
			<p className="mt-3 text-neutral-600">
				&copy; {new Date().getFullYear()} {siteConfig.name} ·{' '}
				<Link href="/license" className={linkClass}>
					license
				</Link>
			</p>
		</footer>
	)
}
