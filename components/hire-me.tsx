'use client'

import { Mail, Download, ArrowUpRight, Briefcase, Clock3, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import LinkedIn from '@/components/social-icons/linked-in'
import { trackHireClick, trackResumeClick } from '@/lib/ga'
import { mailto, siteConfig } from '@/lib/site'
import { featuredQuote, trackRecord, trackRecordNote } from '@/data/track-record'
import { useMounted } from '@/hooks/use-mounted'

const engagements = [
	{
		Icon: Briefcase,
		title: 'Full-time roles',
		body: 'Senior product engineer, iOS or full-stack. I own the whole loop: product calls, architecture, code, and the App Store release.',
	},
	{
		Icon: Clock3,
		title: 'Contract work',
		body: 'Short or long term. Embed with your team for a feature, a rescue, or a few months of steady shipping, on your tools and your process.',
	},
	{
		Icon: Rocket,
		title: 'Freelance projects',
		body: null, // rendered below with the LazyCodeLab link
	},
]

export default function HireMe() {
	const mounted = useMounted()
	const fade = {
		initial: mounted ? { opacity: 0 } : false,
		animate: { opacity: 1 },
	} as const

	return (
		<div className="relative">
			{/* Track record */}
			<motion.div {...fade} className="border-border border-b border-dashed">
				<div className="overflow-hidden">
					<dl className="-mr-px -mb-px grid grid-cols-2 md:grid-cols-4">
						{trackRecord.map(stat => (
							<div
								key={stat.label}
								className="border-border flex flex-col-reverse gap-1 border-r border-b border-dashed p-3 sm:p-4 md:p-5">
								<dt className="font-mono text-xxs tracking-wider text-neutral-500 uppercase sm:text-xs">
									{stat.label}
								</dt>
								<dd className="text-xl font-light text-neutral-200 tabular-nums sm:text-2xl lg:text-3xl">
									{stat.value}
								</dd>
							</div>
						))}
					</dl>
				</div>
				<figure className="border-border space-y-2 border-t border-dashed p-3 sm:p-4 md:p-5">
					<blockquote className="text-sm leading-relaxed text-neutral-300 sm:text-base">
						&ldquo;{featuredQuote.quote}&rdquo;
					</blockquote>
					<figcaption className="font-mono text-xs text-neutral-500">
						— {featuredQuote.author}, {featuredQuote.context}
					</figcaption>
				</figure>
				<p className="border-border border-t border-dashed p-3 text-xs text-neutral-500 sm:p-4 sm:text-sm md:p-5">
					{trackRecordNote}
				</p>
			</motion.div>

			{/* What I'm open to */}
			<motion.div {...fade} className="overflow-hidden">
				<div className="-mr-px -mb-px grid min-w-0 md:grid-cols-3">
					{engagements.map(({ Icon, title, body }) => (
						<div
							key={title}
							className="border-border space-y-3 border-r border-b border-dashed p-3 sm:p-4 md:p-5 lg:p-6">
							<h3 className="flex items-center gap-2 text-lg font-light text-neutral-200 sm:text-xl">
								<Icon className="size-4 shrink-0 text-emerald-500" strokeWidth={1.5} />
								{title}
							</h3>
							<p className="text-sm leading-relaxed text-neutral-400 lg:text-base">
								{body ?? (
									<>
										Got a project rather than a role? Scoped builds and
										stalled projects go through{' '}
										<a
											href={siteConfig.studio.start}
											target="_blank"
											rel="noopener noreferrer"
											onClick={() => trackHireClick({ method: 'lazycodelab' })}
											className="border-border hover:border-primary-foreground inline-flex items-center gap-0.5 border-b border-dashed text-neutral-300">
											{siteConfig.studio.name}
											<ArrowUpRight className="size-3" />
										</a>
										, my {siteConfig.studio.tagline}.
									</>
								)}
							</p>
						</div>
					))}
				</div>
			</motion.div>

			{/* Logistics */}
			<ul className="border-border flex flex-wrap gap-x-6 gap-y-2 border-b border-dashed p-3 font-mono text-xs text-neutral-500 sm:p-4 md:px-5">
				<li>{siteConfig.availability.location}</li>
				<li>{siteConfig.availability.timezone}</li>
				<li>{siteConfig.availability.workMode}</li>
				<li>Replies within 1–2 business days</li>
			</ul>

			{/* Contact */}
			<div className="border-border grid grid-cols-2 border-b border-dashed md:grid-cols-4">
				<a
					href={mailto()}
					onClick={() => trackHireClick({ method: 'email' })}
					className="border-border col-span-2 flex items-center justify-center gap-2 border-b border-dashed py-4 text-base text-neutral-200 transition-colors hover:text-emerald-400 sm:text-lg md:border-r md:border-b-0 md:text-xl">
					<Mail className="size-4" />
					email me
				</a>
				<a
					href={siteConfig.resume}
					target="_blank"
					rel="noopener noreferrer"
					download
					onClick={() => trackResumeClick({ variant: 'hire-section' })}
					className="border-border flex items-center justify-center gap-2 border-r border-dashed py-3 text-sm text-neutral-400 transition-colors hover:text-neutral-200 md:py-4 md:text-base">
					<Download className="size-3.5" />
					résumé
				</a>
				<a
					href={siteConfig.social.linkedin}
					target="_blank"
					rel="noopener noreferrer"
					onClick={() => trackHireClick({ method: 'linkedin' })}
					className="flex items-center justify-center gap-2 py-3 text-sm text-neutral-400 transition-colors hover:text-neutral-200 md:py-4 md:text-base">
					<LinkedIn className="size-3.5 fill-current" />
					linkedin
				</a>
			</div>
			<p className="px-3 py-3 font-mono text-xs break-all text-neutral-600 sm:px-4 md:px-5">
				{siteConfig.email}
			</p>
		</div>
	)
}
