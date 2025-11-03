import './globals.css'
import { Space_Mono } from 'next/font/google'
import Script from 'next/script'
import { Providers } from './providers'
import { ToastProvider } from '@/components/ui/toast'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalyticsListener } from '@/components/analytics/google-analytics-listener'
import { AnalyticsInteractions } from '@/components/analytics/analytics-interactions'
import { GA_MEASUREMENT_ID, isGaEnabled } from '@/lib/ga'

const spaceMono = Space_Mono({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-space',
})

export const metadata = {
	title: 'Full Stack Developer/Creator/Innovator | 13+ Years of Experience',
	description:
		"Building cool stuff with code for over a decade. From PHP to Next.js, I mix old-school skills with new-school stuff and I'm always down to try something different.",
	openGraph: {
		title: 'Full Stack Developer/Creator/Innovator | 13+ Years of Experience',
		description:
			"Building cool stuff with code for over a decade. From PHP to Next.js, I mix old-school skills with new-school stuff and I'm always down to try something different.",
		url: 'https://hstl.pro',
		siteName: "Aditya's Portfolio",
		images: [
			{
				url: '/assets/images/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Aditya - Software Developer & Technical Writer',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Full Stack Developer/Creator/Innovator | 13+ Years of Experience',
		description:
			"Building cool stuff with code for over a decade. From PHP to Next.js, I mix old-school skills with new-school stuff and I'm always down to try something different.",
		images: ['/assets/images/og-image.jpg'],
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
				className={`${spaceMono.variable} font-space bg-background h-full min-w-0 antialiased`}>
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
							<>
								<GoogleAnalyticsListener />
								<AnalyticsInteractions />
							</>
						) : null}
						<Analytics />
						<SpeedInsights />
					</Providers>
				</ToastProvider>
			</body>
		</html>
	)
}
