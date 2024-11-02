'use client'
import dynamic from 'next/dynamic'

const PhaserGame = dynamic(() => import('../components/game'), {
	ssr: false,
	loading: () => <p>Loading...</p>,
})

export default function Home() {
	return (
		<main className="min-h-screen size-full">
			<PhaserGame />
		</main>
	)
}
