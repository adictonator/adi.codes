import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import GameScene from './game-scene'

export default function PhaserGame() {
	const gameRef = useRef(null)

	useEffect(() => {
		const config = {
			type: Phaser.AUTO,
			width: window.innerWidth,
			height: window.innerHeight,
			parent: gameRef.current,
			scale: {
				mode: Phaser.Scale.RESIZE,
				autoCenter: Phaser.Scale.CENTER_BOTH,
			},
			physics: {
				default: 'arcade',
				arcade: {
					gravity: { y: 300 },
					debug: true,
				},
			},
			scene: GameScene,
		}

		const game = new Phaser.Game(config)

		const handleResize = () => {
			game.scale.resize(window.innerWidth, window.innerHeight)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			game.destroy(true)
		}
	}, [])

	return <div ref={gameRef} className="w-screen h-screen overflow-hidden" />
}
