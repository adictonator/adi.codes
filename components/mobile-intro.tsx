'use client'

import { Download, Mail } from 'lucide-react'
import { mailto, siteConfig } from '@/lib/site'
import { trackHireClick, trackResumeClick } from '@/lib/ga'

/**
 * Phones never see the desktop hero (the left panel is md+ only), so without
 * this the first thing a mobile visitor saw was "Who? Me? Oh, okay" — no
 * name, no role, no sign of being available. Hidden from md up, where the
 * left panel does this job.
 */
export default function MobileIntro() {
	return (
		<section
			aria-labelledby="intro-heading"
			className="border-border border-b border-dashed px-4 pt-10 pb-6 md:hidden">
			<p className="font-mono text-xs text-emerald-500">~/adi.codes</p>

			<h1
				id="intro-heading"
				className="font-ibm text-primary mt-3 text-4xl leading-tight font-medium tracking-tight">
				{siteConfig.name}
			</h1>
			<p className="mt-3 text-lg text-neutral-400">
				Product engineer — iOS, React Native &amp; web.
			</p>
			<p className="mt-1 text-base text-neutral-500">
				I ship the whole thing: product, code, and App Store.
			</p>

			<a
				href="#hire"
				className="mt-5 inline-flex items-center gap-2.5 border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs text-emerald-400">
				<span className="relative flex size-2">
					<span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
					<span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
				</span>
				{siteConfig.availability.headline}
			</a>

			<div className="border-border mt-6 grid grid-cols-2 border border-dashed">
				<a
					href={mailto()}
					onClick={() => trackHireClick({ method: 'email' })}
					className="border-border text-primary flex items-center justify-center gap-2 border-r border-dashed py-3 text-sm">
					<Mail className="size-4" />
					Email me
				</a>
				<a
					href={siteConfig.resume}
					target="_blank"
					rel="noopener noreferrer"
					download
					onClick={() => trackResumeClick({ variant: 'mobile-intro' })}
					className="flex items-center justify-center gap-2 py-3 text-sm text-neutral-400">
					<Download className="size-4" />
					Résumé
				</a>
			</div>
		</section>
	)
}
