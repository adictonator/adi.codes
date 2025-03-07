import { ReactNode } from 'react'
import StickyTitle from './sticky-title'

export default function Section({
	title,
	ariaTitle,
	children,
	headerChildren,
}: {
	title: string
	ariaTitle: string
	children: ReactNode
	headerChildren?: ReactNode
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
