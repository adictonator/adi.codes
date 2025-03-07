'use client'

import { useState } from 'react'
import { Copy, Check, ExternalLink } from 'lucide-react'
import { Dialog } from '../ui/dialog'

export default function DiscordInvite() {
	const inviteCode = process.env.NEXT_PUBLIC_DISCORD_INVITE_CODE
	const [isOpen, setIsOpen] = useState(false)
	const [copied, setCopied] = useState(false)

	const copyToClipboard = () => {
		navigator.clipboard
			.writeText(`https://discord.gg/${inviteCode}`)
			.then(() => {
				setCopied(true)
				setTimeout(() => setCopied(false), 2000)
			})
	}

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="flex size-full cursor-pointer items-center justify-center gap-2 border border-indigo-800/30 bg-indigo-500/10 px-4 py-2.5 text-sm text-indigo-400 transition-colors hover:bg-indigo-500/20">
				Join My Discord Server
			</button>

			<Dialog
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
				content={{
					category: 'discord',
					name: 'Official Discord Community',
					description:
						'Join our community of developers to share ideas, get feedback, and collaborate on projects. We discuss coding, design, career tips, and more.',
					list: [
						'Connect with like-minded developers',
						'Get help and share your knowledge',
						'Access exclusive resources and discussions',
					],
					extra: (
						<>
							<div className="bg-secondary mt-6 overflow-hidden rounded border border-neutral-700">
								<div className="flex items-center justify-between p-3">
									<span className="font-mono text-sm text-neutral-400">
										discord.gg/{inviteCode}
									</span>
									<button
										onClick={copyToClipboard}
										className="rounded-full bg-neutral-700 p-1.5 text-neutral-300 transition-colors hover:bg-neutral-600">
										{copied ? (
											<Check className="h-3.5 w-3.5" />
										) : (
											<Copy className="h-3.5 w-3.5" />
										)}
									</button>
								</div>
							</div>

							<div className="mt-3.5 flex border-t border-neutral-800">
								<a
									href={`https://discord.gg/${inviteCode}`}
									target="_blank"
									rel="noopener noreferrer"
									className="flex w-full items-center justify-center gap-2 rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700">
									<span>Join Now</span>
									<ExternalLink className="h-3.5 w-3.5" />
								</a>
							</div>
						</>
					),
				}}
			/>
		</>
	)
}
