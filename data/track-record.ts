// The freelance record, kept as plain numbers rather than a testimonial wall.
// Source of truth is the verified Upwork profile (mirrored in lazycodelab's
// `lib/testimonials-data.ts`). Update both when the numbers move.

export type TrackRecordStat = {
	value: string
	label: string
}

export const trackRecord: TrackRecordStat[] = [
	{ value: '49', label: 'contracts delivered' },
	{ value: '4,073', label: 'hours billed' },
	{ value: '$90K+', label: 'earned freelancing' },
	{ value: '5.0★', label: 'average rating' },
]

// One line of context so the numbers don't read as decoration.
export const trackRecordNote =
	'Nine years of client work on Upwork before the products. Every number here is on the profile, not rounded up for the website.'

// One verified review, same wording as on lazycodelab.com. A single quote from
// a repeat client says more than a carousel of them.
export const featuredQuote = {
	quote: "I have been working with Aditya for many years now and I'd have to say he is one of the most talented and professional developers on Upwork.",
	author: 'Damian',
	context: 'Repeat client since 2019 · Upwork, 2021',
}
