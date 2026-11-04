import type { Metadata } from 'next'
import { siteConfig } from './site'

/**
 * One place that builds a page's metadata.
 *
 * Next.js merges metadata shallowly: a page that sets `openGraph` or
 * `alternates` *replaces* the root layout's object instead of extending it.
 * That is how pages ended up with no og:image or with the homepage's
 * canonical. Every route goes through this helper so each one gets a full,
 * self-contained set — canonical, Open Graph, Twitter/X, and the RSS link.
 */

export const defaultOgImage = {
	url: '/assets/og.png',
	width: 1200,
	height: 630,
	alt: `${siteConfig.name} — ${siteConfig.role} portfolio`,
}

type OgImage = { url: string; width: number; height: number; alt: string }

type PageMetadataInput = {
	/** Short page title; the root template appends " — Aditya Bhaskar Sharma". */
	title?: string
	description: string
	/** Path starting with "/", used for canonical and og:url. */
	path: string
	image?: OgImage
	/** Keep the page out of search results (it still passes link equity). */
	noIndex?: boolean
	keywords?: string[]
	/** Extra Open Graph fields, e.g. for articles. */
	openGraph?: Metadata['openGraph']
	other?: Metadata['other']
}

export function pageMetadata({
	title,
	description,
	path,
	image = defaultOgImage,
	noIndex,
	keywords,
	openGraph,
	other,
}: PageMetadataInput): Metadata {
	// Social cards don't get the <title> template, so build the full string.
	const fullTitle = title ? `${title} — ${siteConfig.name}` : siteConfig.title

	return {
		...(title ? { title } : { title: { absolute: siteConfig.title } }),
		description,
		...(keywords && { keywords }),
		alternates: {
			canonical: path,
			types: {
				'application/rss+xml': [
					{ url: siteConfig.feed, title: `${siteConfig.name} — Notes` },
				],
			},
		},
		...(noIndex && { robots: { index: false, follow: true } }),
		openGraph: {
			type: 'website',
			url: path,
			siteName: siteConfig.shortName,
			locale: 'en_US',
			title: fullTitle,
			description,
			images: [image],
			...openGraph,
		} as Metadata['openGraph'],
		twitter: {
			card: 'summary_large_image',
			title: fullTitle,
			description,
			creator: siteConfig.social.xHandle,
			images: [image.url],
		},
		...(other && { other }),
	}
}
