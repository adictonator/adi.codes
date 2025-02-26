export default function StickyTitle({
	children,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<header className="border-border bg-background sticky -top-1 z-10 border-y px-4 py-8 backdrop-blur-lg">
			<h3
				className="text-primary flex items-center justify-between font-mono text-sm font-bold tracking-widest uppercase"
				{...props}>
				{children}
			</h3>
		</header>
	)
}
