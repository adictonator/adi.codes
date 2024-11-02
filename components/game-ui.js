export const gameUI = (phContext, LEVELS) => {
	// Score text
	phContext.scoreText = phContext.add.text(
		16,
		16,
		`Score: ${phContext.gameState.score}`,
		{
			fontSize: '32px',
			fill: '#fff',
			stroke: '#000',
			strokeThickness: 4,
		},
	)

	// Level text
	phContext.levelText = phContext.add.text(
		16,
		56,
		`Level ${phContext.currentLevel}: ${
			LEVELS[phContext.currentLevel].name
		}`,
		{
			fontSize: '32px',
			fill: '#fff',
			stroke: '#000',
			strokeThickness: 4,
		},
	)

	// Progress bar
	const progressBar = phContext.add.graphics()
	const progressBox = phContext.add.graphics()
	progressBox.fillStyle(0x222222, 0.8)
	progressBox.fillRect(phContext.game.config.width - 220, 16, 200, 20)

	// Update progress bar based on collected stars
	const progress =
		phContext.gameState.collectedStars[phContext.currentLevel].length /
		LEVELS[phContext.currentLevel].stars.count
	progressBar.fillStyle(0x00ff00, 1)
	progressBar.fillRect(
		phContext.game.config.width - 218,
		18,
		196 * progress,
		16,
	)
}
