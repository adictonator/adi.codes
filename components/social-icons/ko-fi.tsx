import { SVGProps } from 'react'

export default function Ko(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}>
			<path d="M8 3H6a2 2 0 0 0-2 2v16" />
			<path d="M18 3h2a2 2 0 0 1 2 2v16" />
			<path d="M6 7h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2z" />
		</svg>
	)
}
