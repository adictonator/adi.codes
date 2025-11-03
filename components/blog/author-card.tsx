import Link from 'next/link'

interface AuthorCardProps {
	authorInfo: {
		name: string
		role: string
		bio: string
		socials: {
			icon: any
			url: string
			username: string
		}[]
	}
}

export default function AuthorCard({ authorInfo }: AuthorCardProps) {
	return (
		<div className="border border-dashed border-neutral-800 bg-neutral-900/50">
			<div className="border-b border-dashed border-neutral-800 bg-neutral-900/50 px-4 py-2">
				<div className="flex items-center justify-between">
					<span className="text-xs text-neutral-500">
						author.json
					</span>
					<span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
				</div>
			</div>

			<div className="p-4">
				<div className="flex gap-6">
					<div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
						{/* Add Image component if needed */}
					</div>

					<div className="space-y-3">
						<div>
							<div className="text-lg text-neutral-200">
								{authorInfo.name}
							</div>
							<div className="text-sm text-neutral-500">
								{authorInfo.role}
							</div>
						</div>
						<p className="text-sm text-neutral-400">
							{authorInfo.bio}
						</p>
					</div>
				</div>

				{/* Social Links */}
				<div className="mt-6">
					<div className="mb-2 text-xs text-neutral-500">
						<span className="text-emerald-500">$</span> ls socials/
					</div>
					<div className="divide-border border-border flex divide-x divide-dashed border-x border-dashed">
						{authorInfo.socials.map((social, index) => (
							<a
								key={index}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								className="group border-border flex min-h-20 flex-1 items-center gap-2 border-y border-dashed bg-neutral-900/50 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-300">
								<social.icon className="text-terminal-green size-3.5 fill-current" />
								<span className="font-mono">
									{social.username}
								</span>
							</a>
						))}
					</div>
					{/*<div className="flex flex-wrap gap-3">
						{authorInfo.socials.map((social, index) => (
							<a
								key={index}
								href={social.url}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex items-center gap-2 rounded border border-neutral-800 bg-neutral-900/50 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-300">
								<social.icon className="h-3.5 w-3.5" />
								<span className="font-mono">
									{social.username}
								</span>
							</a>
						))}
					</div>*/}
				</div>

				{/* More Articles */}
				<div className="mt-6 border-t border-dashed border-neutral-800 pt-4">
					<div className="mb-2 text-xs text-neutral-500">
						<span className="text-emerald-500">$</span> find
						more-articles/
					</div>
					<div className="space-y-2">
						{['Article 1', 'Article 2', 'Article 3'].map(
							(article, i) => (
								<div
									key={i}
									className="flex items-center gap-2 text-xs">
									<span className="text-emerald-500">
										└──
									</span>
									<Link
										href="#"
										className="text-neutral-400 hover:text-neutral-200">
										{article}.md
									</Link>
								</div>
							),
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
