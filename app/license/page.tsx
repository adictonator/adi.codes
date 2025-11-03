'use client'

import TerminalNav from '@/components/terminal-nav'
import { BackgroundEffect } from '@/components/ui/background-effect'
import FloatingQuickNav from '@/components/floating-quick-nav'
import {
	Scale,
	ShieldAlert,
	FileText,
	AlertTriangle,
	CheckCircle,
	XCircle,
	Mail,
} from 'lucide-react'

export default function LicensePage() {
	return (
		<div className="border-border/50 mx-auto min-h-screen border-x border-dashed bg-neutral-950 md:max-w-4xl">
			<TerminalNav
				currentPath="~/license"
				breadcrumbs={[{ label: 'license', href: '/license' }]}
			/>

			<div className="relative p-6 md:p-8">
				{/* Header */}
				<header className="mb-12 space-y-6">
					<div className="font-mono text-xs">
						<span className="text-emerald-500">&rarr;</span>
						<span className="text-neutral-500"> cat</span>
						<span className="text-blue-400"> LICENSE.md</span>
					</div>

					<div className="space-y-3">
						<h1 className="text-4xl font-light tracking-tight text-neutral-200 xl:text-5xl">
							Content License & Terms
						</h1>
						<p className="text-lg text-neutral-400">
							Understanding your rights and restrictions for
							content on this website
						</p>
					</div>

					<div className="border-t border-dashed border-neutral-800 pt-6">
						<div className="border border-dashed border-amber-800/50 bg-amber-950/20 p-4">
							<div className="flex items-start gap-3">
								<AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
								<div className="space-y-2">
									<h3 className="font-mono text-sm font-medium text-amber-200">
										Important Legal Notice
									</h3>
									<p className="text-sm leading-relaxed text-amber-300/80">
										All content on this website is protected
										by copyright law. Unauthorized use,
										particularly for AI training purposes,
										may result in legal action.
									</p>
								</div>
							</div>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<div className="space-y-12">
					{/* Copyright Section */}
					<section className="space-y-4">
						<div className="flex items-center gap-3">
							<Scale className="h-6 w-6 text-blue-400" />
							<h2 className="text-2xl font-light tracking-tight text-neutral-200">
								Copyright Notice
							</h2>
						</div>
						<div className="space-y-4 border border-neutral-800 bg-neutral-900/30 p-6">
							<p className="leading-relaxed text-neutral-300">
								&copy; 2024-{new Date().getFullYear()} Aditya
								Bhaskar Sharma. All rights reserved.
							</p>
							<p className="leading-relaxed text-neutral-400">
								Unless otherwise noted, all content on this
								website, including but not limited to text,
								graphics, code snippets, designs, and multimedia
								content, is the property of Aditya Bhaskar
								Sharma and is protected by United States and
								international copyright laws.
							</p>
						</div>
					</section>

					{/* AI Use Restrictions */}
					<section className="space-y-4">
						<div className="flex items-center gap-3">
							<ShieldAlert className="h-6 w-6 text-amber-400" />
							<h2 className="text-2xl font-light tracking-tight text-neutral-200">
								AI Training & Machine Learning Restrictions
							</h2>
						</div>
						<div className="space-y-6 border border-neutral-800 bg-neutral-900/30 p-6">
							<p className="leading-relaxed text-neutral-300">
								<strong className="text-neutral-200">
									Explicit Prohibition:
								</strong>{' '}
								The content on this website may NOT be used for
								any of the following purposes without explicit
								written permission:
							</p>

							<ul className="space-y-3 pl-4">
								{[
									'Training artificial intelligence models or machine learning systems',
									'Developing, improving, or fine-tuning language models (LLMs)',
									'Creating datasets for AI/ML training purposes',
									'Web scraping for AI training or model development',
									'Incorporating into any automated content generation systems',
									'Using as training data for chatbots, code generators, or similar tools',
								].map((item, index) => (
									<li
										key={index}
										className="flex items-start gap-3">
										<XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
										<span className="text-sm leading-relaxed text-neutral-400">
											{item}
										</span>
									</li>
								))}
							</ul>

							<div className="border-t border-neutral-800 pt-4">
								<p className="text-sm leading-relaxed text-neutral-500">
									This restriction applies to all AI
									companies, organizations, researchers, and
									individuals, regardless of whether the use
									is commercial or non-commercial.
								</p>
							</div>
						</div>
					</section>

					{/* License Terms */}
					<section className="space-y-4">
						<div className="flex items-center gap-3">
							<FileText className="h-6 w-6 text-purple-400" />
							<h2 className="text-2xl font-light tracking-tight text-neutral-200">
								License Terms (CC BY-NC-ND 4.0 + AI
								Restrictions)
							</h2>
						</div>
						<div className="space-y-6 border border-neutral-800 bg-neutral-900/30 p-6">
							<p className="leading-relaxed text-neutral-300">
								This work is licensed under a modified Creative
								Commons Attribution-NonCommercial-NoDerivatives
								4.0 International License with additional AI use
								restrictions.
							</p>

							<div className="space-y-6">
								<div>
									<h3 className="mb-3 flex items-center gap-2 font-mono text-sm text-emerald-400">
										<CheckCircle className="h-4 w-4" />
										You ARE allowed to:
									</h3>
									<ul className="space-y-2 pl-4">
										{[
											'Share - Copy and redistribute the material in any medium or format for non-commercial purposes',
											'Read and learn from the content for personal educational purposes',
											'Link to and reference the content with proper attribution',
										].map((item, index) => (
											<li
												key={index}
												className="text-sm leading-relaxed text-neutral-400">
												• {item}
											</li>
										))}
									</ul>
								</div>

								<div>
									<h3 className="mb-3 flex items-center gap-2 font-mono text-sm text-red-400">
										<XCircle className="h-4 w-4" />
										You are NOT allowed to:
									</h3>
									<ul className="space-y-2 pl-4">
										{[
											'Use the content for commercial purposes',
											'Create derivative works or modifications',
											'Use the content for AI/ML training (as detailed above)',
											'Remove or alter any copyright notices',
											'Republish or present the content as your own',
										].map((item, index) => (
											<li
												key={index}
												className="text-sm leading-relaxed text-neutral-400">
												• {item}
											</li>
										))}
									</ul>
								</div>
							</div>

							<div className="border-t border-neutral-800 pt-4">
								<p className="text-sm leading-relaxed text-neutral-500">
									The additional AI use restrictions in this
									license supersede any permissions that might
									otherwise be granted under CC BY-NC-ND 4.0.
								</p>
							</div>
						</div>
					</section>

					{/* Legal Enforcement */}
					<section className="space-y-4">
						<h2 className="text-2xl font-light tracking-tight text-neutral-200">
							Legal Enforcement
						</h2>
						<div className="space-y-4 border border-neutral-800 bg-neutral-900/30 p-6">
							<p className="leading-relaxed text-neutral-300">
								Violations of these terms may result in:
							</p>
							<ul className="space-y-2 pl-4 text-sm text-neutral-400">
								<li>• DMCA takedown notices</li>
								<li>• Cease and desist orders</li>
								<li>
									• Participation in class action litigation
									against AI companies
								</li>
								<li>
									• Individual legal action for copyright
									infringement
								</li>
								<li>• Claims for damages and legal fees</li>
							</ul>
							<p className="pt-4 text-sm leading-relaxed text-neutral-500">
								Evidence of unauthorized use, particularly for
								AI training purposes, will be documented and may
								be used in legal proceedings.
							</p>
						</div>
					</section>

					{/* Attribution Requirements */}
					<section className="space-y-4">
						<h2 className="text-2xl font-light tracking-tight text-neutral-200">
							Attribution Requirements
						</h2>
						<div className="space-y-4 border border-neutral-800 bg-neutral-900/30 p-6">
							<p className="leading-relaxed text-neutral-300">
								When sharing or referencing content from this
								website (within the allowed uses), you must
								provide proper attribution:
							</p>
							<div className="mt-4 space-y-3 border border-neutral-700 bg-neutral-950 p-4 font-mono text-sm">
								<p className="text-neutral-400">
									Author: Aditya Bhaskar Sharma
								</p>
								<p className="text-neutral-400">
									Source: adi.codes
								</p>
								<p className="text-neutral-400">
									License: CC BY-NC-ND 4.0 with AI
									restrictions
								</p>
							</div>
						</div>
					</section>

					{/* Permission Requests */}
					<section className="space-y-4">
						<div className="flex items-center gap-3">
							<Mail className="h-6 w-6 text-blue-400" />
							<h2 className="text-2xl font-light tracking-tight text-neutral-200">
								Permission Requests
							</h2>
						</div>
						<div className="space-y-4 border border-neutral-800 bg-neutral-900/30 p-6">
							<p className="leading-relaxed text-neutral-300">
								For uses outside the scope of this license,
								including commercial use, derivative works, or
								AI training purposes, you must obtain explicit
								written permission.
							</p>
							<p className="leading-relaxed text-neutral-400">
								To request permission, please contact me through
								my social media channels listed on the homepage
								with:
							</p>
							<ul className="space-y-2 pl-4 text-sm text-neutral-400">
								<li>
									• Detailed description of the intended use
								</li>
								<li>• Purpose and scope of the project</li>
								<li>• Specific content you wish to use</li>
								<li>
									• Your organization/company information (if
									applicable)
								</li>
							</ul>
						</div>
					</section>

					{/* Updates Notice */}
					<section className="space-y-4">
						<h2 className="text-2xl font-light tracking-tight text-neutral-200">
							Updates to This License
						</h2>
						<div className="border border-neutral-800 bg-neutral-900/30 p-6">
							<p className="leading-relaxed text-neutral-400">
								This license may be updated from time to time to
								address new technologies, legal requirements, or
								enforcement strategies. The most current version
								will always be available at this URL. Continued
								access to or use of the website constitutes
								acceptance of the current license terms.
							</p>
						</div>
					</section>

					{/* Footer */}
					<div className="border-t border-dashed border-neutral-800 pt-6">
						<div className="font-mono text-xs text-neutral-600">
							<p>Last Updated: October 24, 2025</p>
							<p className="mt-2">
								<span className="text-neutral-700">#</span> This
								page itself is also covered under the same
								license terms
							</p>
						</div>
					</div>
				</div>
			</div>

			<FloatingQuickNav />
			<BackgroundEffect variant="grid" intensity={0.4} opacity={0.7} />
		</div>
	)
}
