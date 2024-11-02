import './globals.css'

export const metadata = {
	title: 'Personal Portfolio',
	description: 'A gamified personal portfolio built with Phaser and Next.js',
}

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="antialiased">{children}</body>
		</html>
	)
}
