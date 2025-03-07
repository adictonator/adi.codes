export interface ProjectTimelineEvent {
	date: string
	type: 'feature' | 'update' | 'milestone'
	title: string
	description?: string
}

export interface Project {
	title: string
	category: string
	description: string
	stack: string[]
	status: 'published' | 'in-progress' | 'archived' | 'concept'
	preview?: {
		image: string
		video?: string
		demo?: string
	}
	links: {
		live?: string
		source?: string
		demo?: string
	}
	metadata: {
		stars?: number
		forks?: number
		views?: number
		lastUpdated: string
		version?: string
		awards?: string[]
	}
	features?: string[]
	timeline?: ProjectTimelineEvent[]
	lastCommit?: string
	importance: 'primary' | 'secondary'
}

export const projects: Project[] = [
	{
		title: 'Particle Physics Playground',
		category: 'Experiment',
		description:
			'Interactive 3D particle system with real-time physics simulation',
		stack: ['WebGL', 'Three.js', 'React Three Fiber', 'TypeScript'],
		status: 'published',
		preview: {
			image: '/images/particle-sim.png',
			video: '/videos/particle-demo.mp4',
			demo: 'https://particle.demo.com',
		},
		links: {
			live: 'https://demo.com',
			source: 'https://github.com/user/project',
		},
		metadata: {
			stars: 142,
			forks: 23,
			views: 1542,
			lastUpdated: '2024-02-15',
			awards: ['Product Hunt #3', 'GitHub Trending'],
		},
		features: [
			'Real-time particle collisions',
			'Custom shader effects',
			'60+ FPS performance',
		],
		importance: 'primary',
		timeline: [
			{
				date: '2024-02-15',
				type: 'milestone',
				title: 'v1.0.0 Release',
				description: 'First stable release with core features',
			},
			{
				date: '2024-01-20',
				type: 'feature',
				title: 'Added custom shader support',
			},
		],
		lastCommit: '2 hours ago',
	},
	{
		title: 'CLI Tool Framework',
		category: 'Open Source',
		description:
			'A modern framework for building CLI applications with TypeScript',
		stack: ['Node.js', 'TypeScript', 'Commander.js'],
		status: 'in-progress',
		importance: 'secondary',
		links: {
			source: 'https://github.com/user/cli-tool',
		},
		metadata: {
			stars: 89,
			forks: 12,
			lastUpdated: '2024-02-10',
			version: '0.8.0',
		},
		features: ['Plugin system', 'Interactive prompts', 'Custom themes'],
	},
	// ... more projects
]
