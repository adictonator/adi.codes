import Image from 'next/image'
import Link from 'next/link'
import type { Post } from '@/lib/mdx'
import { siteConfig } from '@/lib/site'
import { formatDate } from '@/lib/format'
import Threads from '@/components/social-icons/threads'
import GitHub from '@/components/social-icons/github'
import LinkedIn from '@/components/social-icons/linked-in'
import Twitter from '@/components/social-icons/twitter'

const socials = [
	{ Icon: LinkedIn, url: siteConfig.social.linkedin, label: 'in/-abs-' },
	{ Icon: GitHub, url: siteConfig.social.github, label: 'adictonator' },
	{ Icon: Threads, url: siteConfig.social.threads, label: '@adictonator' },
	{ Icon: Twitter, url: siteConfig.social.x, label: '@adictonator' },
]

export default function AuthorCard({ related = [] }: { related?: Post[] }) {
	return (
		<div className="border border-dashed border-neutral-800 bg-neutral-900/50">
			<div className="flex items-center justify-between border-b border-dashed border-neutral-800 bg-neutral-900/50 px-4 py-2">
				<span className="text-xs text-neutral-500">author.json</span>
				<span className="size-2 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none" />
			</div>

			<div className="p-4">
				<div className="flex gap-4 sm:gap-6">
					<div className="relative size-16 shrink-0 overflow-hidden border border-dashed border-neutral-800 bg-neutral-900">
						<Image
							src={siteConfig.avatar}
							alt={siteConfig.name}
							fill
							sizes="64px"
							className="object-cover"
						/>
					</div>

					<div className="min-w-0 space-y-2">
						<div>
							<Link
								href="/"
								className="text-lg text-neutral-200 hover:text-emerald-400">
								{siteConfig.name}
							</Link>
							<div className="text-sm text-neutral-500">
								{siteConfig.role} · iOS, React Native &amp; web
							</div>
						</div>
						<p className="text-sm leading-relaxed text-neutral-400">
							I ship the whole thing: product, code, and App Store.
							13+ years in, founder of {siteConfig.studio.name}, and
							open to full-time, contract and freelance work.
						</p>
					</div>
				</div>

				<div className="mt-6">
					<div className="mb-2 text-xs text-neutral-500">
						<span className="text-emerald-500">$</span> ls socials/
					</div>
					<div className="grid grid-cols-2 border-t border-l border-dashed border-neutral-800 sm:grid-cols-4">
						{socials.map(({ Icon, url, label }) => (
							<a
								key={url}
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex min-w-0 items-center gap-2 border-r border-b border-dashed border-neutral-800 px-3 py-3 text-xs text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-neutral-200">
								<Icon className="text-terminal-green size-3.5 shrink-0 fill-current" />
								<span className="truncate">{label}</span>
							</a>
						))}
					</div>
				</div>

				{related.length > 0 && (
					<div className="mt-6 border-t border-dashed border-neutral-800 pt-4">
						<div className="mb-2 text-xs text-neutral-500">
							<span className="text-emerald-500">$</span> find
							more-articles/
						</div>
						<ul className="space-y-2">
							{related.map(post => (
								<li
									key={post.slug}
									className="flex items-baseline gap-2 text-xs">
									<span className="shrink-0 text-emerald-500">
										└──
									</span>
									<Link
										href={`/blog/${post.slug}`}
										className="min-w-0 text-neutral-400 hover:text-neutral-200">
										<span className="block truncate">
											{post.title}
										</span>
										<span className="text-neutral-600">
											{formatDate(post.date)} ·{' '}
											{post.readingTime} min read
										</span>
									</Link>
								</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}
