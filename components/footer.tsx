'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import RandomThought from './footer/random-thought'
import EasterEggs from './footer/easter-eggs'
import TerminalEasterEgg from './footer/terminal-easter-egg'
import KeySequenceDialog from './footer/key-sequence-dialog'
import { Heart } from 'lucide-react'

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
						'pt-16': easterEggsUnlocked,
						'py-8 md:py-16': !easterEggsUnlocked,
					},
				)}>
				<div className="px-4 md:mx-auto md:max-w-7xl md:px-6">
					<div className="grid gap-8 md:grid-cols-2">
						<div className="space-y-6">
							<RandomThought />

							<div className="text-xs text-neutral-600">
								<p className="mb-1">
									&copy; {new Date().getFullYear()} - All
									rights reserved and stuff
								</p>
								<p>
									No cookies were harmed in the making of this
									website. I don't even like sweet stuff.
								</p>
							</div>
						</div>

						<div className="hidden space-y-6 md:block">
							<div className="flex items-center justify-end gap-2 text-right text-xs text-neutral-600">
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
									'hover:text-muted relative text-right text-[8px]',
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
						className="relative mt-64 hidden h-80 w-full grayscale md:block"
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
