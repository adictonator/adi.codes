// levels/config.js
export const LEVELS = {
	1: {
		name: 'Welcome',
		platforms: [
			{
				x: 0,
				y: window.innerHeight,
				scale: { x: window.innerWidth, y: 4 },
			},
			{ x: 600, y: 800 },
			{ x: 500, y: 280 },
			{ x: 100, y: 160 },
		],
		stars: { count: 12, minY: 100, maxY: 300 },
		spikes: [],
	},
	2: {
		name: 'About Me',
		platforms: [
			{ x: 400, y: 568, scale: 2 },
			{ x: 600, y: 400 },
			{ x: 300, y: 250 },
			{ x: 600, y: 100 },
		],
		stars: { count: 15, minY: 50, maxY: 350 },
		spikes: [{ x: 450, y: 368 }],
	},
	3: {
		name: 'Final Challenge',
		platforms: [
			{ x: 400, y: 568, scale: 2 },
			{ x: 200, y: 450 },
			{ x: 500, y: 350 },
			{ x: 300, y: 250 },
			{ x: 600, y: 150 },
			{ x: 400, y: 100 },
		],
		stars: { count: 25, minY: 50, maxY: 400 },
		spikes: [
			{ x: 350, y: 368 },
			{ x: 550, y: 268 },
			{ x: 250, y: 168 },
		],
	},
}
