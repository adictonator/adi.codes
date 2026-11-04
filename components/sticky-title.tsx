import type { ReactNode } from 'react'

export default function StickyTitle({
	id,
	title,
	children,
}: {
	id: string
	title: ReactNode
	/** Links or controls shown on the right; kept out of the heading itself. */
	children?: ReactNode
}) {
	return (
		<header className="border-border bg-background text-primary sticky -top-1 z-10 flex min-w-0 items-center justify-between gap-3 border-y px-3 py-4 text-xxs font-bold tracking-widest uppercase backdrop-blur-lg sm:px-4 sm:py-6 sm:text-xs md:py-5 lg:py-8 lg:text-sm">
			<h2 id={id} className="min-w-0">
				{title}
			</h2>
			{children && (
				<div className="flex shrink-0 items-center gap-3">{children}</div>
			)}
		</header>
	)
}
