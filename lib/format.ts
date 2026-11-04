/**
 * Dates in this repo are written as plain 'YYYY-MM-DD' strings, which
 * `new Date()` reads as UTC midnight. Formatting that in the viewer's local
 * timezone shifts it back a day for anyone west of UTC (a post dated
 * 2025-11-03 showed "Nov 2" in the US) and makes server and client render
 * different text. Formatting in UTC keeps the date exactly as written.
 */
const formats = {
	long: { year: 'numeric', month: 'long', day: 'numeric' },
	medium: { year: 'numeric', month: 'short', day: 'numeric' },
	monthYear: { year: 'numeric', month: 'short' },
	monthDay: { month: 'short', day: '2-digit' },
} satisfies Record<string, Intl.DateTimeFormatOptions>

export function formatDate(
	date: string | Date,
	style: keyof typeof formats = 'medium',
): string {
	return new Date(date).toLocaleDateString('en-US', {
		...formats[style],
		timeZone: 'UTC',
	})
}
