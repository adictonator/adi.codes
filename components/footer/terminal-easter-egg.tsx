import { motion, AnimatePresence } from 'framer-motion'
import { Terminal } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function TerminalEasterEgg({
	onClose,
}: {
	onClose: () => void
}) {
	const [terminalOpen, setTerminalOpen] = useState(false)
	const [terminalText, setTerminalText] = useState('')
	const [blinkCursor, setBlinkCursor] = useState(true)

	// Terminal typing effect
	useEffect(() => {
		let text = ''
		const fullText = `> Initializing footer sequence...\n> Running diagnostics...\n> All systems operational\n> Secret functionality loaded\n> Hello human, thanks for visiting my site!\n> Copyright © ${new Date().getFullYear()} - Made with questionable code decisions`
		let index = 0

		const interval = setInterval(() => {
			if (index < fullText.length) {
				text += fullText.charAt(index)
				setTerminalText(text)
				index++
			} else {
				clearInterval(interval)
			}
		}, 40)

		return () => clearInterval(interval)
	}, [terminalOpen])

	return (
		<AnimatePresence>
			<motion.div
				initial={{ height: 0, opacity: 0 }}
				animate={{ height: 'auto', opacity: 1 }}
				exit={{ height: 0, opacity: 0 }}
				className="mt-6 overflow-hidden rounded border border-neutral-800 bg-neutral-900">
				<div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-2">
					<div className="flex items-center gap-2">
						<Terminal className="h-4 w-4 text-green-500" />
						<span className="text-xs text-neutral-400">
							terminal
						</span>
					</div>
					<button
						onClick={onClose}
						className="text-xs text-neutral-500 hover:text-neutral-300">
						close
					</button>
				</div>
				<div className="text-sm">
					<div className="p-4 text-green-500">
						{terminalText.split('\n').map((line, i) => (
							<div key={i}>{line}</div>
						))}
						{blinkCursor && (
							<motion.span
								animate={{ opacity: [0, 1, 0] }}
								transition={{
									repeat: Infinity,
									duration: 1,
								}}
								className="inline-block h-4 w-2 bg-green-500"
							/>
						)}
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	)
}
