import './globals.css'
import localFont from 'next/font/local'
import { Providers } from './providers'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Script from 'next/script'

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

export const metadata = {
	title: 'Aditya - Technical Author & Developer from India',
	description:
		'Personal portfolio of Aditya, a passionate developer and technical author from India. Explore projects, read blogs, and subscribe to the newsletter.',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${clash.variable} ${archivo.variable} font-body relative flex min-h-screen flex-col bg-background text-foreground antialiased transition-colors duration-300`}>
				<Providers>
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
				</Providers>
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
