import StickyTitle from './sticky-title'

export default function Section({
	title,
	ariaTitle,
	headerChildren,
	children,
}: {
	title: string
	ariaTitle: string
	headerChildren?: React.ReactNode
	children: React.ReactNode
}) {
	return (
		<section
			aria-labelledby={`${ariaTitle}-heading`}
			data-section={ariaTitle}
			id={`${ariaTitle}-heading`}>
			<StickyTitle>
				{title}

				{headerChildren && headerChildren}
			</StickyTitle>

			{children}
		</section>
	)
}
