'use client'

import { useEffect } from 'react'
import { isGaEnabled, trackNewsletterSignup } from '@/lib/ga'

const SIGNUP_ATTRIBUTE = 'data-analytics-signup'

export function AnalyticsInteractions() {
	useEffect(() => {
		if (!isGaEnabled) return

		const handleSubmit = (event: Event) => {
			const form = event.target as HTMLFormElement | null
			if (!form || !form.hasAttribute(SIGNUP_ATTRIBUTE)) return

			const method =
				form.getAttribute('data-analytics-method') ?? 'newsletter_form'
			const slug = form.getAttribute('data-analytics-slug') ?? undefined

			trackNewsletterSignup({ method, slug: slug ?? undefined })
		}

		document.addEventListener('submit', handleSubmit, true)

		return () => {
			document.removeEventListener('submit', handleSubmit, true)
		}
	}, [])

	return null
}
