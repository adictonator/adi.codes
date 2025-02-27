import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect } from 'react'
export default function CalWidget() {
	useEffect(() => {
		;(async function () {
			const cal = await getCalApi({ namespace: '15min' })
			cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
		})()
	}, [])
	return (
		<Cal
			namespace="15min"
			calLink="adictonator/15min"
			style={{
				width: '100%',
				height: '500px',
				overflow: 'scroll',
				padding: 0,
				borderRadius: 0,
			}}
			config={{ layout: 'month_view' }}
		/>
	)
}
