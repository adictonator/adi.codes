'use client'

import { useEffect, useMemo } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { isGaEnabled, pageview } from '@/lib/ga'

export function GoogleAnalyticsListener() {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const search = useMemo(() => searchParams?.toString() ?? '', [searchParams])

	useEffect(() => {
		if (!isGaEnabled || !pathname) return

		const url = search ? `${pathname}?${search}` : pathname
		pageview(url)
	}, [pathname, search])

	return null
}
