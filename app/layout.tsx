import './globals.css'
import localFont from 'next/font/local'
import { Space_Mono } from 'next/font/google'
import { Providers } from './providers'
import Script from 'next/script'
import { ToastProvider } from '@/components/ui/toast'

const archivo = localFont({
	src: [
		{
			path: '/fonts/Archivo-Variable.woff2',
			style: 'normal',
		},
		{
			path: '/fonts/Archivo-VariableItalic.woff2',
			style: 'italic',
		},
	],
	variable: '--font-body',
})

const clash = localFont({
	src: '/fonts/ClashDisplay-Variable.woff2',
	variable: '--font-display',
})

const spaceMono = Space_Mono({
	subsets: ['latin'],
	weight: ['400', '700'],
	variable: '--font-space',
})

export const metadata = {
	title: 'Aditya - Technical Author & Developer from India',
	description:
		'Personal portfolio of Aditya, a passionate developer and technical author from India. Explore projects, read blogs, and subscribe to the newsletter.',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${spaceMono.variable} font-space bg-background h-full text-blue-400 antialiased`}>
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
