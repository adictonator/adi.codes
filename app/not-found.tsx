import type { Metadata } from 'next'
import Link from 'next/link'
import PageShell from '@/components/page-shell'

// Next.js already marks 404s noindex; just don't claim the homepage's URL.
export const metadata: Metadata = {
	title: 'Page not found',
	alternates: { canonical: null },
	openGraph: null,
}

export default function NotFound() {
	const links = [
		{ href: '/', label: 'cd ~', note: 'who I am and what I do' },
		{ href: '/projects', label: 'ls projects/', note: 'everything I have shipped' },
		{ href: '/#hire', label: 'cat hire.md', note: 'how to work with me' },
	]

	return (
		<PageShell
			currentPath="~/404"
			breadcrumbs={[{ label: '404', href: '/404' }]}
			availability="not-found">
			<div className="space-y-6 font-mono">
				<div className="text-sm">
					<p className="text-neutral-400">
						<span className="text-emerald-500">$</span> cd ./this-page
					</p>
					<p className="mt-1 text-rose-400">
						bash: cd: no such file or directory
					</p>
				</div>

				<h1 className="text-3xl font-light tracking-tight text-neutral-200 sm:text-4xl">
					404 — nothing here.
				</h1>
				<p className="max-w-xl text-sm leading-relaxed text-neutral-500">
					Either the link is wrong, or this was a project I killed and
					forgot to give a headstone. Try one of these instead:
				</p>

				<ul className="divide-y divide-dashed divide-neutral-800 border border-dashed border-neutral-800">
					{links.map(link => (
						<li key={link.href}>
							<Link
								href={link.href}
								className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 py-3 text-sm transition-colors hover:bg-neutral-900/50">
								<span className="text-emerald-500">{link.label}</span>
								<span className="text-xs text-neutral-500">
									{link.note}
								</span>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</PageShell>
	)
}
