import './globals.css'
import { Suspense } from 'react'
import { preload } from 'react-dom'
import Script from 'next/script'
import { Providers } from './providers'
import { ToastProvider } from '@/components/ui/toast'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalyticsListener } from '@/components/analytics/google-analytics-listener'
import { AnalyticsInteractions } from '@/components/analytics/analytics-interactions'
import { GA_MEASUREMENT_ID, isGaEnabled } from '@/lib/ga'
import { siteConfig } from '@/lib/site'
import { pageMetadata } from '@/lib/metadata'
import type { Metadata, Viewport } from 'next'

// Fonts are self-hosted, see the @font-face rules in globals.css. Preload the
// latin files every page renders with, as next/font/google used to.
const preloadedFonts = [
	'/fonts/fira-code-latin.woff2',
	'/fonts/ibm-plex-mono-400-latin.woff2',
	'/fonts/ibm-plex-mono-500-latin.woff2',
	'/fonts/ibm-plex-mono-700-latin.woff2',
]

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	...pageMetadata({ description: siteConfig.description, path: '/' }),
	title: {
		default: siteConfig.title,
		template: `%s — ${siteConfig.name}`,
	},
	keywords: [...siteConfig.baseKeywords],
	authors: [{ name: siteConfig.name, url: siteConfig.url }],
	creator: siteConfig.name,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large' as const,
			'max-snippet': -1,
		},
	},
}

// Colours the mobile browser's toolbar to match the page background.
export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#f5f5f3' },
		{ media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
	],
}

const personJsonLd = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'Person',
			'@id': `${siteConfig.url}/#person`,
			name: siteConfig.name,
			alternateName: 'Aditya Sharma',
			url: siteConfig.url,
			image: `${siteConfig.url}${siteConfig.image}`,
			email: `mailto:${siteConfig.email}`,
			jobTitle: siteConfig.role,
			description: siteConfig.longDescription,
			worksFor: {
				'@type': 'Organization',
				name: 'LazyCodeLab',
				url: siteConfig.studio.url,
			},
			homeLocation: {
				'@type': 'Place',
				name: siteConfig.availability.location,
			},
			alumniOf: {
				'@type': 'CollegeOrUniversity',
				name: 'Chandigarh University',
			},
			address: {
				'@type': 'PostalAddress',
				addressRegion: 'Punjab',
				addressCountry: 'IN',
			},
			knowsAbout: [
				'Product Engineering',
				'iOS Development',
				'Swift',
				'SwiftUI',
				'React Native',
				'Next.js',
				'React',
				'TypeScript',
				'Laravel',
				'PHP',
				'Shopify',
				'WordPress plugin development',
				'App Store Optimization',
			],
			sameAs: [...siteConfig.sameAs],
		},
		{
			'@type': 'WebSite',
			'@id': `${siteConfig.url}/#website`,
			url: siteConfig.url,
			name: siteConfig.shortName,
			description: `Portfolio and blog of ${siteConfig.name}, ${siteConfig.role}.`,
			publisher: { '@id': `${siteConfig.url}/#person` },
		},
	],
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	for (const href of preloadedFonts)
		preload(href, { as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' })

	return (
		<html lang="en" suppressHydrationWarning>
			<body className="font-fira bg-background h-full min-w-0 antialiased">
				<Script
					id="json-ld-person"
					type="application/ld+json"
					strategy="beforeInteractive"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(personJsonLd),
					}}
				/>
				{isGaEnabled && (
					<>
						<Script
							src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
							strategy="afterInteractive"
						/>
						<Script
							id="ga-init"
							strategy="afterInteractive"
							dangerouslySetInnerHTML={{
								__html: `window.dataLayer = window.dataLayer || [];
									function gtag(){dataLayer.push(arguments);}
									gtag('js', new Date());
									gtag('config', '${GA_MEASUREMENT_ID}', {
										send_page_view: false,
										anonymize_ip: true
									});`,
							}}
						/>
					</>
				)}
				<ToastProvider>
					<Providers>
						{children}
						{isGaEnabled ? (
							<Suspense fallback={null}>
								<GoogleAnalyticsListener />
								<AnalyticsInteractions />
							</Suspense>
						) : null}
						<Analytics />
						<SpeedInsights />
					</Providers>
				</ToastProvider>
			</body>
		</html>
	)
}
