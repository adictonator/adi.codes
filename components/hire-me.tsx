'use client'

import { Mail, Download, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { trackHireClick, trackResumeClick } from '@/lib/ga'
import { siteConfig } from '@/lib/site'

export default function HireMe() {
	return (
		<div className="relative">
			<div className="divide-border border-border grid min-w-0 grid-cols-1 divide-dashed border-b border-dashed sm:gap-x-4 md:gap-x-6 md:grid-cols-2 md:divide-x lg:gap-x-8">
				<motion.div
					className="space-y-3 p-3 sm:p-4 md:p-5 lg:p-6"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}>
					<h3 className="text-lg font-light text-neutral-200 sm:text-xl md:text-xl lg:text-2xl">
						Full-time & contract roles
					</h3>
					<p className="text-xs text-neutral-400 sm:text-sm md:text-sm lg:text-base">
						iOS, React Native, or full-stack web — I own the whole
						loop: product calls, architecture, code, App Store
						release. Remote-first, based in GMT+5:30, open to
						relocation for the right role.
					</p>
				</motion.div>
				<motion.div
					className="space-y-3 p-3 sm:p-4 md:p-5 lg:p-6"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}>
					<h3 className="text-lg font-light text-neutral-200 sm:text-xl md:text-xl lg:text-2xl">
						Hiring for a project instead?
					</h3>
					<p className="text-xs text-neutral-400 sm:text-sm md:text-sm lg:text-base">
						Client and contract work lives at{' '}
						<a
							href="https://lazycodelab.com/start"
							target="_blank"
							rel="noopener noreferrer"
							onClick={() =>
								trackHireClick({ method: 'lazycodelab' })
							}
							className="border-border hover:border-primary-foreground inline-flex items-center gap-0.5 border-b border-dashed text-neutral-300">
							LazyCodeLab
							<ArrowUpRight className="size-3" />
						</a>
						, my product studio — scoped builds, not this résumé.
					</p>
				</motion.div>
			</div>

			<div className="divide-border border-border flex items-stretch justify-stretch divide-dashed border-t border-dashed max-md:flex-col max-md:divide-y md:h-14 md:divide-x lg:h-16">
				<a
					href={`mailto:${siteConfig.email}?subject=Role Inquiry`}
					onClick={() => trackHireClick({ method: 'email' })}
					className="flex flex-1 cursor-pointer items-center justify-center gap-2 py-3 text-center text-base text-neutral-300 transition-colors hover:text-emerald-400 sm:text-lg md:py-0 md:text-xl">
					<Mail className="size-4" />
					email me
				</a>
				<a
					href={siteConfig.resume}
					target="_blank"
					rel="noopener noreferrer"
					download
					onClick={() => trackResumeClick({ variant: 'hire-section' })}
					className="flex flex-1 items-center justify-center gap-2 py-2.5 text-xs text-neutral-400 transition-colors hover:text-neutral-200 sm:text-sm md:py-0 md:text-lg">
					<Download className="size-3.5" />
					résumé
				</a>
			</div>
		</div>
	)
}
