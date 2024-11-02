import Phaser from 'phaser'
import { LEVELS } from './config'

export default class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' })
		this.objectPools = {}
		this.currentLevel = 1
		this.maxLevel = 10
		this.levelText = null
	}

	init() {
		this.gameState = this.loadGameState()
	}

	preload() {
		// Load sprite atlas instead of individual images
		this.load.atlas(
			'gameSprites',
			'assets/sprites.png',
			'assets/sprites.json',
		)

		this.load.image(
			'ground',
			'https://labs.phaser.io/assets/sprites/platform.png',
		)

		this.load.spritesheet(
			'dude',
			'https://labs.phaser.io/assets/sprites/dude.png',
			{ frameWidth: 32, frameHeight: 48 },
		)
	}

	create() {
		this.setupUI()
		this.initializePools()
		this.createPlayer()
		this.setupControls()
		this.createLevel(this.currentLevel)
	}

	initializePools() {
		// Object pools for better performance
		this.objectPools = {
			platforms: this.physics.add.staticGroup({
				defaultKey: 'ground',
				maxSize: 30,
			}),
			stars: this.physics.add.group({
				defaultKey: 'star',
				maxSize: 50,
				allowGravity: false,
			}),
			spikes: this.physics.add.staticGroup({
				defaultKey: 'spike',
				maxSize: 20,
			}),
		}
	}

	createPlayer() {
		// Create and setup player sprite
		this.player = this.physics.add.sprite(100, 450, 'dude')
		this.player.setBounce(0.2)
		this.player.setScale(3.5)
		//this.player.setCollideWorldBounds(true)

		// Player animations
		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('dude', {
				start: 0,
				end: 3,
			}),
			frameRate: 10,
			repeat: -1,
		})

		this.anims.create({
			key: 'turn',
			frames: [{ key: 'dude', frame: 4 }],
			frameRate: 20,
		})

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('dude', {
				start: 5,
				end: 8,
			}),
			frameRate: 10,
			repeat: -1,
		})

		// Add colliders
		this.physics.add.collider(this.player, this.objectPools.platforms)
		this.physics.add.overlap(
			this.player,
			this.objectPools.stars,
			this.collectStar,
			null,
			this,
		)
		this.physics.add.collider(
			this.player,
			this.objectPools.spikes,
			this.hitSpike,
			null,
			this,
		)
	}

	setupControls() {
		this.controls = {
			left: false,
			right: false,
			up: false,
			dash: false,
			interact: false,
		}

		// Keyboard controls
		this.cursors = this.input.keyboard.createCursorKeys()

		// Additional keyboard controls
		this.keys = this.input.keyboard.addKeys({
			A: Phaser.Input.Keyboard.KeyCodes.A,
			D: Phaser.Input.Keyboard.KeyCodes.D,
			W: Phaser.Input.Keyboard.KeyCodes.W,
			SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
			E: Phaser.Input.Keyboard.KeyCodes.E,
		})

		this.input.keyboard.on('keydown', event => {
			switch (event.code) {
				case 'ArrowLeft':
				case 'KeyA':
					this.controls.left = true
					break
				case 'ArrowRight':
				case 'KeyD':
					this.controls.right = true
					break
				case 'ArrowUp':
				case 'KeyW':
				case 'Space':
					this.controls.up = true
					break
				case 'KeyE':
					this.controls.interact = true
					break
			}
		})

		this.input.keyboard.on('keyup', event => {
			switch (event.code) {
				case 'ArrowLeft':
				case 'KeyA':
					this.controls.left = false
					break
				case 'ArrowRight':
				case 'KeyD':
					this.controls.right = false
					break
				case 'ArrowUp':
				case 'KeyW':
				case 'Space':
					this.controls.up = false
					break
				case 'KeyE':
					this.controls.interact = false
					break
			}
		})

		// Touch controls optimization
		if (this.game.device.touch) {
			// Initialize control state once
			this.virtualControls = {
				left: false,
				right: false,
				up: false,
				touchZones: new Map(),
			}
			// Add minimal required pointers
			this.input.addPointer(1)

			// Create touch zones using sprite atlas
			const buttonConfig = [
				{ key: 'left', x: 50, y: 550 },
				{ key: 'right', x: 170, y: 550 },
				{ key: 'up', x: 750, y: 550 },
			]

			buttonConfig.forEach(({ key, x, y }) => {
				// Use sprite from atlas instead of rectangle
				const button = this.add
					.sprite(x, y, 'ui-atlas', `button-${key}`)
					.setAlpha(0.5)
					.setInteractive({ useHandCursor: true })
					.setDepth(100)

				// Cache touch zone
				this.virtualControls.touchZones.set(key, button)

				// Optimize event listeners with single handler
				button.on('pointerdown', () => {
					if (!this.virtualControls[key]) {
						this.virtualControls[key] = true
					}
				})

				button.on('pointerup', () => {
					if (this.virtualControls[key]) {
						this.virtualControls[key] = false
					}
				})

				// Handle pointer out of bounds
				button.on('pointerout', () => {
					if (this.virtualControls[key]) {
						this.virtualControls[key] = false
					}
				})
			})

			// Optimize touch event processing
			this.input.on('gameobjectdown', (pointer, gameObject) => {
				if (!pointer.wasTouch) return

				// Use hit area optimization
				gameObject.setTint(0x999999)
			})

			this.input.on('gameobjectup', (pointer, gameObject) => {
				if (!pointer.wasTouch) return

				gameObject.clearTint()
			})

			// Handle multi-touch
			this.input.on('pointermove', pointer => {
				if (!pointer.isDown) return

				// Check if pointer is still within valid touch zone
				for (const [key, zone] of this.virtualControls.touchZones) {
					const bounds = zone.getBounds()
					this.virtualControls[key] = Phaser.Geom.Rectangle.Contains(
						bounds,
						pointer.x,
						pointer.y,
					)
				}
			})

			// Cleanup method for scene transition
			this.events.once('shutdown', () => {
				this.virtualControls.touchZones.forEach(zone => zone.destroy())
				this.virtualControls.touchZones.clear()
			})
		}
	}

	setupUI() {
		// Score text
		this.scoreText = this.add.text(
			16,
			16,
			`Score: ${this.gameState.score}`,
			{
				fontSize: '32px',
				fill: '#fff',
				stroke: '#000',
				strokeThickness: 4,
			},
		)

		// Level text
		this.levelText = this.add.text(
			16,
			56,
			`Level ${this.currentLevel}: ${LEVELS[this.currentLevel].name}`,
			{
				fontSize: '32px',
				fill: '#fff',
				stroke: '#000',
				strokeThickness: 4,
			},
		)

		// Progress bar
		const progressBar = this.add.graphics()
		const progressBox = this.add.graphics()
		progressBox.fillStyle(0x222222, 0.8)
		progressBox.fillRect(this.game.config.width - 220, 16, 200, 20)

		// Update progress bar based on collected stars
		const progress =
			this.gameState.collectedStars[this.currentLevel].length /
			LEVELS[this.currentLevel].stars.count
		progressBar.fillStyle(0x00ff00, 1)
		progressBar.fillRect(
			this.game.config.width - 218,
			18,
			196 * progress,
			16,
		)
	}

	clearLevel() {
		// Clear all object pools
		Object.values(this.objectPools).forEach(pool => {
			pool.getChildren().forEach(child => {
				child.setActive(false).setVisible(false).destroy()
			})
			pool.clear(true, true)
		})

		// Reset player position if exists
		if (this.player) {
			this.player.setPosition(100, 450)
			this.player.setVelocity(0, 0)
		}

		// Clear any existing tweens
		this.tweens.killAll()

		// Clear any temporary physics bodies
		this.physics.world.bodies.getArray().forEach(body => {
			if (
				!body.gameObject ||
				(body.gameObject !== this.player &&
					!Object.values(this.objectPools).some(pool =>
						pool.contains(body.gameObject),
					))
			) {
				body.destroy()
			}
		})

		// Clear any level-specific timers
		this.time.removeAllEvents()

		// Reset camera
		this.cameras.main.setScroll(0, 0)
		this.cameras.main.fadeIn(500, 0, 0, 0)

		// Update UI for level transition
		if (this.progressBar) {
			this.progressBar.clear()
		}

		// Save current game state
		this.saveGameState()
	}

	createLevel(levelNum) {
		const level = LEVELS[levelNum]
		if (!level) return

		this.clearLevel()

		// add base ground.
		//this.objectPools.platforms
		//	.create(0, window.innerHeight, 'ground')
		//	.setScale(window.innerWidth, 6)
		//	.refreshBody()

		// Create platforms
		level.platforms.forEach(platform => {
			const p = this.objectPools.platforms
				.create(platform.x, platform.y, 'ground')
				?.setActive(true)
				?.setVisible(true)
			if (platform.scale) p?.setScale(platform.scale.x, platform.scale.y)
			p?.refreshBody()
		})

		// Create stars efficiently
		this.createStars(level.stars)

		// Create spikes
		level.spikes.forEach(spike => {
			this.objectPools.spikes
				.get(spike.x, spike.y, 'gameSprites', 'spike')
				?.setActive(true)
				?.setVisible(true)
		})
	}

	createStars({ count, minY, maxY }) {
		const spacing = {
			x: this.game.config.width / (Math.sqrt(count) + 1),
			y: (maxY - minY) / (Math.sqrt(count) + 1),
		}

		for (let i = 0; i < count; i++) {
			const x = spacing.x * (1 + (i % Math.sqrt(count)))
			const y = minY + spacing.y * (1 + Math.floor(i / Math.sqrt(count)))

			if (
				!this.gameState.collectedStars[this.currentLevel].includes(
					`${x}-${y}`,
				)
			) {
				this.objectPools.stars
					.get(x, y, 'gameSprites', 'star')
					?.setActive(true)
					?.setVisible(true)
			}
		}
	}

	handleLevelTransition(direction) {
		if (direction === 'right' && this.currentLevel < this.maxLevel) {
			this.currentLevel++
			this.player.x = 50
		} else if (direction === 'left' && this.currentLevel > 1) {
			this.currentLevel--
			this.player.x = 750
		}

		this.createLevel(this.currentLevel)
		this.saveGameState()
	}

	collectStar(player, star) {
		const starId = `${star.x}-${star.y}`
		if (
			!this.gameState.collectedStars[this.currentLevel].includes(starId)
		) {
			this.gameState.collectedStars[this.currentLevel].push(starId)
			this.gameState.score += 10
			//this.setupUI()
			this.saveGameState()
		}
		star.setActive(false).setVisible(false)
	}

	loadGameState() {
		return (
			JSON.parse(localStorage.getItem('gameState')) || {
				score: 0,
				collectedStars: Array(11)
					.fill([])
					.reduce(
						(acc, _, i) => ({
							...acc,
							[i]: [],
						}),
						{},
					),
				currentLevel: 1,
			}
		)
	}

	saveGameState() {
		localStorage.setItem('gameState', JSON.stringify(this.gameState))
	}

	update() {
		if (!this.player) return

		const PLAYER_SPEED = 560
		const JUMP_VELOCITY = -330

		// Horizontal movement
		if (this.controls.left) {
			this.player.setVelocityX(-PLAYER_SPEED)
			this.player.anims.play('left', true)
		} else if (this.controls.right) {
			this.player.setVelocityX(PLAYER_SPEED)
			this.player.anims.play('right', true)
		} else {
			this.player.setVelocityX(0)
			this.player.anims.play('turn')
		}

		// Jump
		//console.log('cddd', this.player.body)

		if (this.controls.up && this.player.body.touching.down) {
			this.player.setVelocityY(JUMP_VELOCITY)
		}

		// Level boundaries
		if (this.currentLevel === 1 && this.player.x <= 50) {
			this.player.setVelocityX(0)
			this.player.x = 50
		} else if (
			this.currentLevel === this.maxLevel &&
			this.player.x >= window.innerWidth
		) {
			this.player.setVelocityX(0)
			this.player.x = window.innerWidth
		}

		// Level transition check
		if (
			this.player.x >= window.innerWidth &&
			this.currentLevel < this.maxLevel
		) {
			this.handleLevelTransition('right')
		} else if (this.player.x <= 20 && this.currentLevel > 1) {
			this.handleLevelTransition('left')
		}

		this.updateUI()
	}

	updateUI() {
		if (!LEVELS[this.currentLevel]) {
			//this.player.setCollideWorldBounds(true)
			return
		}

		this.scoreText.setText(`Score: ${this.gameState.score}`)
		this.levelText.setText(
			`Level ${this.currentLevel}: ${LEVELS[this.currentLevel].name}`,
		)
	}
}
