import './globals.css'
import { Suspense } from 'react'
import { Fira_Code, IBM_Plex_Mono } from 'next/font/google'
import Script from 'next/script'
import { Providers } from './providers'
import { ToastProvider } from '@/components/ui/toast'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalyticsListener } from '@/components/analytics/google-analytics-listener'
import { AnalyticsInteractions } from '@/components/analytics/analytics-interactions'
import { GA_MEASUREMENT_ID, isGaEnabled } from '@/lib/ga'
import { siteConfig } from '@/lib/site'

const firaCode = Fira_Code({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-fira',
})

const ibmPlex = IBM_Plex_Mono({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	variable: '--font-ibm',
})

export const metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.title,
		template: `%s — ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [...siteConfig.baseKeywords],
	authors: [{ name: siteConfig.name, url: siteConfig.url }],
	creator: siteConfig.name,
	alternates: {
		canonical: '/',
	},
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
	openGraph: {
		type: 'website',
		url: siteConfig.url,
		title: siteConfig.title,
		description: siteConfig.description,
		siteName: siteConfig.shortName,
		images: [
			{
				url: '/assets/og.png',
				width: 1200,
				height: 630,
				alt: `${siteConfig.name} — ${siteConfig.role} portfolio`,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.title,
		description: siteConfig.description,
		images: ['/assets/og.png'],
	},
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
			jobTitle: siteConfig.role,
			description: siteConfig.description,
			worksFor: {
				'@type': 'Organization',
				name: 'LazyCodeLab',
				url: 'https://lazycodelab.com',
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
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${firaCode.variable} ${ibmPlex.variable} font-fira bg-background h-full min-w-0 antialiased`}>
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
