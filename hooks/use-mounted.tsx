'use client'

import { useEffect, useState } from 'react'

/**
 * False during SSR and hydration, true after mount.
 *
 * Gate framer-motion `initial` props with this so server HTML renders
 * content visible (`initial={false}`) instead of at opacity 0. Content
 * then never depends on JS to appear, while anything mounted after
 * hydration (filter changes, modals, overlays) still animates in.
 */
export function useMounted() {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])
	return mounted
}
