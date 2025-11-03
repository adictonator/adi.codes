'use client'

import { motion } from 'framer-motion'
import { ShieldAlert, Scale, FileText, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface CopyrightNoticeProps {
	year?: number
	authorName?: string
	minimal?: boolean
}

export default function CopyrightNotice({
	year = new Date().getFullYear(),
	authorName = 'Aditya Bhaskar Sharma',
	minimal = false,
}: CopyrightNoticeProps) {
	if (minimal) {
		return (
			<div className="border-t border-dashed border-neutral-800 pt-6 font-mono text-xs text-neutral-500">
				<p>
					© {year} {authorName}. All rights reserved.{' '}
					<Link
						href="/license"
						className="text-blue-400 hover:underline">
						View License
					</Link>
				</p>
			</div>
		)
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
			className="mt-12 space-y-6 border-t border-dashed border-neutral-800 pt-8">
			{/* Terminal Header */}
			<div className="font-mono text-xs">
				<span className="text-emerald-500">&rarr;</span>
				<span className="text-neutral-500"> cat</span>
				<span className="text-blue-400"> LICENSE.md</span>
			</div>

			{/* License Information */}
			<div className="space-y-6 rounded-lg border border-neutral-800 bg-neutral-900/30 p-6">
				{/* Main Copyright */}
				<div className="flex items-start gap-3">
					<Scale className="mt-1 h-5 w-5 shrink-0 text-blue-400" />
					<div className="space-y-2">
						<h3 className="font-mono text-sm font-medium text-neutral-200">
							Copyright & Ownership
						</h3>
						<p className="text-sm leading-relaxed text-neutral-400">
							© {year} {authorName}. All rights reserved. This
							content is protected by copyright law and
							international treaties.
						</p>
					</div>
				</div>

				{/* AI Use Restriction */}
				<div className="flex items-start gap-3">
					<ShieldAlert className="mt-1 h-5 w-5 shrink-0 text-amber-400" />
					<div className="space-y-2">
						<h3 className="font-mono text-sm font-medium text-neutral-200">
							AI Training & Model Use Prohibited
						</h3>
						<p className="text-sm leading-relaxed text-neutral-400">
							This content may not be used for training,
							improving, or developing artificial intelligence
							models, language models, or machine learning systems
							without explicit written permission from the
							copyright holder.
						</p>
					</div>
				</div>

				{/* License Terms */}
				<div className="flex items-start gap-3">
					<FileText className="mt-1 h-5 w-5 shrink-0 text-purple-400" />
					<div className="space-y-2">
						<h3 className="font-mono text-sm font-medium text-neutral-200">
							License Terms
						</h3>
						<p className="text-sm leading-relaxed text-neutral-400">
							This work is licensed under a restricted Creative
							Commons Attribution-NonCommercial-NoDerivatives 4.0
							International License with additional AI use
							restrictions.
						</p>
					</div>
				</div>

				{/* Legal Notice */}
				<div className="space-y-3 border-t border-neutral-800 pt-4">
					<p className="text-xs leading-relaxed text-neutral-500">
						Unauthorized use of this content for AI training,
						scraping, or incorporation into machine learning
						datasets constitutes a violation of copyright and
						licensing terms. Such violations may result in legal
						action including, but not limited to, DMCA takedown
						notices, cease and desist orders, and participation in
						class action litigation.
					</p>

					<Link
						href="/license"
						className="group inline-flex items-center gap-2 text-xs text-blue-400 transition-colors hover:text-blue-300">
						<span>Read the full license terms</span>
						<ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</Link>
				</div>
			</div>

			{/* Footer Note */}
			<div className="font-mono text-xs text-neutral-600">
				<span className="text-neutral-700">#</span> For licensing
				inquiries or permission requests, please contact me through my
				social channels.
			</div>
		</motion.div>
	)
}
