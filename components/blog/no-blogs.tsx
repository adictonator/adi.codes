import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { blogs } from '@/data/blogs'
import { ArrowUpRight, Terminal } from 'lucide-react'

export default function NoBlogs() {
	const [isTyping, setIsTyping] = useState(true)
	const [showCursor, setShowCursor] = useState(true)
	const [terminalText, setTerminalText] = useState('')

	// Typing effect for empty state
	useEffect(() => {
		if (isTyping) {
			const terminalLines = [
				"$ find ./blog -type f -name '*.md'",
				'',
				'$ echo $?',
				'0',
				'',
				'$ ls -la ./blog',
				'total 0',
				'drwxr-xr-x 2 user user 68 Feb 25 09:14 .',
				'drwxr-xr-x 8 user user 272 Feb 25 09:14 ..',
				'',
				"$ echo 'No blog posts found. Content coming soon!'",
			]

			let currentText = ''
			let lineIndex = 0
			let charIndex = 0

			const typingInterval = setInterval(() => {
				if (lineIndex < terminalLines.length) {
					if (charIndex < terminalLines[lineIndex].length) {
						currentText += terminalLines[lineIndex][charIndex]
						setTerminalText(currentText)
						charIndex++
					} else {
						currentText += '\n'
						setTerminalText(currentText)
						lineIndex++
						charIndex = 0
					}
				} else {
					setIsTyping(false)
					clearInterval(typingInterval)

					// Start cursor blinking after typing is complete
					const cursorInterval = setInterval(() => {
						setShowCursor(prev => !prev)
					}, 530)

					return () => clearInterval(cursorInterval)
				}
			}, 30)

			return () => clearInterval(typingInterval)
		}
	}, [isTyping, blogs.length])

	const comingSoonASCII = `
   _____                _              ____
  / ____|              (_)            / ___|
 | |     ___  _ __ ___  _ _ __   __ _\\___ \\ ___   ___  _ __
 | |    / _ \\| '_ \` _ \\| | '_ \\ / _\` |___) / _ \\ / _ \\| '_ \\
 | |___| (_) | | | | | | | | | | (_| |____/ (_) | (_) | | | |
  \\_____\\___/|_| |_| |_|_|_| |_|\\__, |     \\___/ \\___/|_| |_|
								 __/ |
								|___/
`
	return (
		<div className="min-h-[400px] border border-dashed border-neutral-700/80 bg-neutral-950">
			<div className="h-full p-6">
				<div className="flex h-full flex-col">
					{/* Terminal Header */}
					<div className="mb-3 flex items-center gap-1.5 rounded-t border-b border-dashed border-neutral-700/50 bg-neutral-900/50 px-3 py-2">
						<span className="h-2.5 w-2.5 rounded-full bg-red-500/70"></span>
						<span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70"></span>
						<span className="h-2.5 w-2.5 rounded-full bg-green-500/70"></span>
						<span className="ml-3 flex items-center gap-2 text-xs text-neutral-400">
							<Terminal className="h-3.5 w-3.5 text-emerald-500" />
							blog-status.sh
						</span>
					</div>

					{/* Terminal Content */}
					<div className="flex-1 bg-neutral-900/30 px-4 py-3 font-mono text-sm">
						<pre className="text-neutral-300">
							{terminalText}
							{/*{showCursor && (
									<span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-emerald-500"></span>
								)}*/}
						</pre>
					</div>

					{/* ASCII Art */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 3, duration: 1 }}
						className="mt-4 font-mono text-xs text-blue-400/80">
						<pre className="overflow-x-auto">{comingSoonASCII}</pre>
					</motion.div>

					{/* Coming Soon Message */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 4, duration: 0.6 }}
						className="mt-6 flex items-center justify-between">
						<div className="space-y-1">
							<div className="text-sm text-neutral-300">
								Blog posts will be published soon.
							</div>
							<div className="text-xs text-neutral-500">
								Check back for insights on web development,
								design patterns, and tech tutorials.
							</div>
						</div>

						<Link
							href="/rss"
							className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/50 px-3 py-1.5 text-sm text-neutral-400 hover:bg-neutral-900 hover:text-neutral-300">
							<span>Subscribe</span>
							<ArrowUpRight className="h-3.5 w-3.5" />
						</Link>
					</motion.div>
				</div>
			</div>
		</div>
	)
}
