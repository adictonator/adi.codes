import './globals.css'
import { Space_Mono } from 'next/font/google'
import { Providers } from './providers'
import Script from 'next/script'
import { ToastProvider } from '@/components/ui/toast'

const spaceMono = Space_Mono({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-space',
})

export const metadata = {
	title: 'Aditya | Software Developer & Technical Writer',
	description:
		'Building developer-friendly experiences with React, TypeScript and modern JavaScript. Technical writer passionate about clear documentation and elegant code solutions.',
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
					<Providers>{children}</Providers>
				</ToastProvider>
				<Script
					src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
					strategy="afterInteractive"
				/>
				<Script id="google-analytics" strategy="afterInteractive">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-XXXXXXXXXX');
					`}
				</Script>
			</body>
		</html>
	)
}
