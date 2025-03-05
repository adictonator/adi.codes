'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutMe() {
	return (
		<article className="relative">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="divide-border grid grid-cols-1 divide-x divide-dashed md:grid-cols-2">
				<div className="font-source text-primary space-y-16 p-6 text-xl leading-relaxed tracking-wide md:p-8">
					<h2 className="text-3xl">TL; DR</h2>

					<section className="space-y-5" aria-label="Introduction">
						<p>
							A guy who loves to code and has been coding for 15+
							years. Love building, learning, and experimenting.
						</p>
						<p>
							Current favorite stack: Next.js, Laravel, Tailwind
							CSS, React, TypeScript, Postgres, and MySQL, in no
							particular order. As an old-school guy, still got
							love for vanilla JS, CSS, and PHP.
						</p>
						<p>
							And of course, always experimenting with more cool{' '}
							<a
								href="#skills"
								className="border-border hover:border-primary-foreground border-b border-dashed">
								tech stuff
							</a>{' '}
							whenever possible.
						</p>
					</section>
				</div>

				<aside className="relative flex items-center justify-center">
					<div className="group border-border relative border border-dashed md:size-[450px]">
						{/* Corner Borders */}
						<div className="absolute -top-4 -left-4 size-4 rotate-180 border-t border-l border-dashed border-inherit" />
						<div className="absolute -top-4 -right-4 size-4 rotate-270 border-t border-l border-dashed border-inherit" />
						<div className="absolute -right-4 -bottom-4 size-4 rotate-270 border-t border-r border-dashed border-inherit" />
						<div className="absolute -bottom-4 -left-4 size-4 rotate-180 border-b border-l border-dashed border-inherit" />

						<div className="relative -z-[1] size-full overflow-hidden opacity-80 transition-opacity duration-300 group-hover:opacity-100">
							<Image
								src={'/assets/images/me.png'}
								alt="A photo of me in Manali, Himachal Pradesh, India"
								fill
								className="object-cover object-center"
							/>
						</div>
					</div>
				</aside>
			</motion.div>
		</article>
	)
}
