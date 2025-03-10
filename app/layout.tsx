import './globals.css'
import { Space_Mono } from 'next/font/google'
import { Providers } from './providers'
import { ToastProvider } from '@/components/ui/toast'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

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
				className={`${spaceMono.variable} font-space bg-background h-full antialiased`}>
				<ToastProvider>
					<Providers>
						{children}
						<Analytics />
						<SpeedInsights />
					</Providers>
				</ToastProvider>
			</body>
		</html>
	)
}
