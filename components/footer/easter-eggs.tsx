import { easterEggMessages } from '@/data/easter-eggs'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Cat, Coffee, Skull, Sparkles, Terminal } from 'lucide-react'
import { useToast } from '../ui/toast'

export default function EasterEggs({
	showTerminal,
	hideEggs,
}: {
	showTerminal: () => void
	hideEggs: () => void
}) {
	const { showToast } = useToast()
	// Handle easter egg triggers
	const triggerEasterEgg = (type: string) => {
		const egg = easterEggMessages.find(e => e.trigger === type)
		if (egg) {
			showToast(egg.message)
		}
	}

	const handleHideEggs = () => {
		showToast('You got a bit too curious, huh?')
		hideEggs()
	}

	return (
		<div className="bg-secondary border-border flex w-fit flex-col items-end gap-4 justify-self-end border border-dashed p-3.5">
			<div className="flex flex-wrap items-end justify-end gap-4">
				<AnimatePresence>
					<>
						<motion.button
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.1 }}
							onClick={() => triggerEasterEgg('coffee')}
							className="rounded-full p-2 text-neutral-600 transition-colors hover:bg-neutral-900 hover:text-amber-500"
							aria-label="Coffee easter egg">
							<Coffee className="h-5 w-5" />
						</motion.button>

						<motion.button
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.2 }}
							onClick={() => triggerEasterEgg('skull')}
							className="rounded-full p-2 text-neutral-600 transition-colors hover:bg-neutral-900 hover:text-neutral-300"
							aria-label="Skull easter egg">
							<Skull className="h-5 w-5" />
						</motion.button>

						<motion.button
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.3 }}
							onClick={() => triggerEasterEgg('sparkles')}
							className="rounded-full p-2 text-neutral-600 transition-colors hover:bg-neutral-900 hover:text-yellow-400"
							aria-label="Sparkles easter egg">
							<Sparkles className="h-5 w-5" />
						</motion.button>

						<motion.button
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.4 }}
							onClick={() => triggerEasterEgg('robot')}
							className="rounded-full p-2 text-neutral-600 transition-colors hover:bg-neutral-900 hover:text-blue-400"
							aria-label="Robot easter egg">
							<Bot className="h-5 w-5" />
						</motion.button>

						<motion.button
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.5 }}
							onClick={showTerminal}
							className="rounded-full p-2 text-neutral-600 transition-colors hover:bg-neutral-900 hover:text-emerald-500"
							aria-label="Terminal easter egg">
							<Terminal className="h-5 w-5" />
						</motion.button>

						<motion.button
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							transition={{ delay: 0.5 }}
							onClick={handleHideEggs}
							className="rounded-full p-2 text-neutral-600 transition-colors hover:bg-neutral-900 hover:text-orange-300"
							title="Don't click me!"
							aria-label="Don't click me!">
							<Cat className="h-5 w-5" />
						</motion.button>
					</>
				</AnimatePresence>
			</div>
		</div>
	)
}
