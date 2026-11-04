import Link from 'next/link'
import type { ReactNode } from 'react'

/**
 * Renders `[text](href)` inside a plain string as a link, so copy in `data/`
 * can stay plain strings. Only links are parsed — no other markdown.
 *
 *   '/projects' or '/blog/post' → next/link (client-side navigation)
 *   '#hire'                     → same-page jump
 *   'mailto:…'                  → plain link
 *   'https://…'                 → opens in a new tab
 */
const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g

const linkClass =
	'text-neutral-200 underline decoration-neutral-600 underline-offset-4 transition-colors hover:decoration-neutral-300'

function renderLink(label: string, href: string, key: number) {
	if (href.startsWith('/'))
		return (
			<Link key={key} href={href} className={linkClass}>
				{label}
			</Link>
		)
	if (/^https?:\/\//.test(href))
		return (
			<a
				key={key}
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className={linkClass}>
				{label}
			</a>
		)
	return (
		<a key={key} href={href} className={linkClass}>
			{label}
		</a>
	)
}

export function InlineLinks({ text }: { text: string }) {
	const parts: ReactNode[] = []
	let last = 0
	for (const match of text.matchAll(linkPattern)) {
		const [whole, label, href] = match
		if (match.index > last) parts.push(text.slice(last, match.index))
		parts.push(renderLink(label, href, match.index))
		last = match.index + whole.length
	}
	if (last < text.length) parts.push(text.slice(last))
	return <>{parts}</>
}
