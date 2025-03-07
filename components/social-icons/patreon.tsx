import { SVGProps } from 'react'

export default function Patreon(props: SVGProps<SVGSVGElement>) {
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
			<circle cx="14" cy="9" r="7" />
			<path d="M4 21V5" />
		</svg>
	)
}
