export default function StickyTitle({
	children,
	...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<header className="border-border bg-background sticky -top-1 z-10 border-y px-3 py-4 backdrop-blur-lg sm:px-4 sm:py-6 md:py-5 lg:py-8">
			<h3
				className="text-primary text-xxs flex items-center justify-between font-bold tracking-widest uppercase sm:text-xs md:text-xs lg:text-sm"
				{...props}>
				{children}
			</h3>
		</header>
	)
}
