export const createPlayer = phContext => {
	// Create and setup player sprite
	const player = phContext.physics.add.sprite(100, 450, 'dude')
	player.setBounce(0.2)
	player.setScale(3.5)
	//player.setCollideWorldBounds(true)

	// Player animations
	phContext.anims.create({
		key: 'left',
		frames: phContext.anims.generateFrameNumbers('dude', {
			start: 0,
			end: 3,
		}),
		frameRate: 10,
		repeat: -1,
	})

	phContext.anims.create({
		key: 'turn',
		frames: [{ key: 'dude', frame: 4 }],
		frameRate: 20,
	})

	phContext.anims.create({
		key: 'right',
		frames: phContext.anims.generateFrameNumbers('dude', {
			start: 5,
			end: 8,
		}),
		frameRate: 10,
		repeat: -1,
	})

	// Add colliders
	phContext.physics.add.collider(player, phContext.objectPools.platforms)
	phContext.physics.add.overlap(
		player,
		phContext.objectPools.stars,
		phContext.collectStar,
		null,
		phContext,
	)
	phContext.physics.add.collider(
		player,
		phContext.objectPools.spikes,
		phContext.hitSpike,
		null,
		phContext,
	)

	return player
}
