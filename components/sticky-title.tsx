export default function StickyTitle({
	children,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<header className="sticky -top-1 z-10 border-y border-neutral-700/80 bg-neutral-950 px-4 py-8 backdrop-blur-lg">
			<h3
				className="flex items-center justify-between font-mono text-sm font-bold tracking-widest text-neutral-200 uppercase"
				{...props}>
				{children}
			</h3>
		</header>
	)
}
