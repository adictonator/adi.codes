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
	title: 'Founder/Builder/Innovator | 13+ Years of Experience',
	description:
		"Building cool stuff with code for over a decade. From PHP to Next.js, I mix old-school skills with new-school stuff and I'm always down to try something different.",
	openGraph: {
		type: 'website',
		url: siteConfig.url,
		title: 'Founder/Builder/Innovator | 13+ Years of Experience',
		description:
			"Building cool stuff with code for over a decade. From PHP to Next.js, I mix old-school skills with new-school stuff and I'm always down to try something different.",
		siteName: siteConfig.name,
		images: [
			{
				url: '/og.png',
				width: 1200,
				height: 630,
				alt: `${siteConfig.name} portfolio site`,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Founder/Builder/Innovator | 13+ Years of Experience',
		description:
			"Building cool stuff with code for over a decade. From PHP to Next.js, I mix old-school skills with new-school stuff and I'm always down to try something different.",
		images: ['/og.png'],
	},
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
