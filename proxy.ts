import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
	const response = NextResponse.next()

	// Add X-Robots-Tag headers to prevent AI indexing
	response.headers.set('X-Robots-Tag', 'noai, noimageai')

	// Add custom headers for AI crawlers
	response.headers.set('X-AI-Training', 'prohibited')
	response.headers.set(
		'X-Content-License',
		'CC-BY-NC-ND-4.0-with-AI-restrictions',
	)

	return response
}

// Apply middleware to all routes
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico).*)',
	],
}
