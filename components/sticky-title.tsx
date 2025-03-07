export default function StickyTitle({
	children,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<header className="border-border bg-background sticky -top-1 z-10 border-y px-2 py-6 backdrop-blur-lg md:px-4 md:py-8">
			<h3
				className="text-primary flex items-center justify-between text-xs font-bold tracking-widest uppercase md:text-sm"
				{...props}>
				{children}
			</h3>
		</header>
	)
}
