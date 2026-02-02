'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutMe() {
	return (
		<article className="relative">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="divide-border grid min-w-0 grid-cols-1 gap-y-6 divide-dashed sm:gap-x-4 md:gap-x-0 md:divide-x lg:gap-x-0 lg:gap-y-8 2xl:grid-cols-2">
				<div className="text-primary space-y-6 p-3 text-base leading-relaxed tracking-wide sm:p-4 md:space-y-8 md:p-5 md:text-lg 2xl:space-y-16 2xl:p-6">
					<h2 className="text-xl 2xl:text-3xl">TL; DR</h2>

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

				<aside className="relative flex items-center justify-center p-3 sm:p-4 md:p-5">
					<div className="group border-border relative size-48 border border-dashed sm:size-56 md:size-[280px] lg:size-[450px]">
						{/* Corner Borders */}
						<div className="absolute -top-4 -left-4 size-4 rotate-180 border-t border-l border-dashed border-inherit" />
						<div className="absolute -top-4 -right-4 size-4 rotate-270 border-t border-l border-dashed border-inherit" />
						<div className="absolute -right-4 -bottom-4 size-4 rotate-270 border-t border-r border-dashed border-inherit" />
						<div className="absolute -bottom-4 -left-4 size-4 rotate-180 border-b border-l border-dashed border-inherit" />

						<div className="relative -z-1 size-full overflow-hidden opacity-80 transition-opacity duration-300 group-hover:opacity-100">
							<Image
								src={'/assets/images/me.jpeg'}
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
