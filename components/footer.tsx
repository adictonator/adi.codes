'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import RandomThought from './footer/random-thought'
import EasterEggs from './footer/easter-eggs'
import TerminalEasterEgg from './footer/terminal-easter-egg'
import KeySequenceDialog from './footer/key-sequence-dialog'
import { Heart } from 'lucide-react'
import Link from 'next/link'

export default function Footer() {
	const [easterEggsUnlocked, setEasterEggsUnlocked] = useState(false)
	const [showSequenceDialog, setShowSequenceDialog] = useState(false)
	const [showTerminalEgg, setShowTerminalEgg] = useState(false)

	return (
		<>
			<footer
				className={cn(
					'border-border bg-background relative border-t border-dashed',
					{
						'pt-12 md:pt-16': easterEggsUnlocked,
						'py-6 sm:py-8 md:py-12 2xl:py-16': !easterEggsUnlocked,
					},
				)}>
				<div className="px-3 sm:px-4 md:mx-auto md:max-w-full md:px-5 lg:px-6">
					<div className="grid gap-6 md:grid-cols-2 lg:gap-8">
						<div className="space-y-4 md:space-y-6">
							<RandomThought />

							<div className="text-10px text-neutral-600 sm:text-xs">
								<p className="mb-1">
									&copy; {new Date().getFullYear()} - All
									rights reserved and stuff.{' '}
									<Link
										href="/license"
										className="text-blue-400 hover:underline">
										License
									</Link>
								</p>
								<p>
									No cookies were harmed in the making of this
									website. I don't even like sweet stuff.
								</p>
							</div>
						</div>

						<div className="hidden space-y-4 md:block md:space-y-6">
							<div className="text-10px flex items-center justify-end gap-2 text-right text-neutral-600 sm:text-xs">
								<span>Made with</span>
								<button
									onClick={() => setShowSequenceDialog(true)}
									className="group relative -m-2 flex cursor-help items-center justify-center p-2"
									aria-label="Activate secret mode">
									<Heart
										className={`heart-icon h-4 w-4 transition-colors ${
											showSequenceDialog
												? 'animate-pulse text-red-500'
												: 'text-neutral-500 group-hover:text-red-400'
										}`}
									/>
									{showSequenceDialog && (
										<span className="absolute -top-1 -right-1 h-2 w-2 animate-ping rounded-full bg-rose-500" />
									)}
								</button>
								<span>by a human (probably)</span>
							</div>
							{easterEggsUnlocked && (
								<EasterEggs
									showTerminal={() =>
										setShowTerminalEgg(true)
									}
									hideEggs={() =>
										setEasterEggsUnlocked(false)
									}
								/>
							)}

							<div
								className={cn(
									'hover:text-muted text-xxs relative text-right',
									{
										'text-neutral-500': easterEggsUnlocked,
										'text-neutral-800 grayscale hover:grayscale-0':
											!easterEggsUnlocked,
									},
								)}>
								{easterEggsUnlocked
									? 'v420.69 - tomfoolery mode activated 😈'
									: 'v1.0.0 - lame mode activated 😴'}
							</div>
						</div>
					</div>

					{easterEggsUnlocked && showTerminalEgg && (
						<TerminalEasterEgg
							onClose={() => setShowTerminalEgg(false)}
						/>
					)}
				</div>

				{easterEggsUnlocked && (
					<div
						className="relative mt-40 hidden h-60 w-full grayscale md:mt-48 md:block md:h-72 lg:mt-64 lg:h-80"
						title="WAAAAZZZZZUUUUUP!!!!!">
						<Image
							src="/assets/images/wazzup.gif"
							alt="Wazzup!"
							fill
							className="size-full object-cover"
						/>
					</div>
				)}
			</footer>

			{showSequenceDialog && (
				<KeySequenceDialog
					onClose={() => setShowSequenceDialog(false)}
					unlockEasterEggs={() => setEasterEggsUnlocked(true)}
				/>
			)}
		</>
	)
}
