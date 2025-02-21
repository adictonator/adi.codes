export default function StickyTitle({
	children,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h2
			className="sticky top-0 z-10 flex items-center justify-between border-y border-neutral-700/80 bg-neutral-950 px-4 py-8 font-mono text-sm font-bold tracking-widest text-neutral-200 uppercase backdrop-blur-sm"
			{...props}>
			{children}
		</h2>
	)
}
