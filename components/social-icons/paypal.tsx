import { SVGProps } from 'react'

export default function PayPal(props: SVGProps<SVGSVGElement>) {
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
			<path d="M7 16.3c2.2 0 4.3-1.1 5.5-3l3.4-5.9c1.2-2.1-.4-4.6-2.8-4.6H9.3C8.1 2.8 6.9 3.1 6.1 3.8c-.8.7-1.3 1.8-1.3 3 0 .5.1 1.1.3 1.6l1.6 4.2" />
			<path d="M12.4 13.4l1.6 4.2c.1.5.3 1 .3 1.6 0 1.2-.4 2.3-1.3 3-.8.7-2 1-3.2 1H6c-2.4 0-4-2.5-2.8-4.6l3.4-5.9" />
		</svg>
	)
}
