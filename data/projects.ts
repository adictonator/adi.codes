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
	priority: 1 | 2 | 3 | 4 | 5 // Internal sorting: 1 = highest, 5 = lowest
}

export const projects: Project[] = [
	{
		title: 'Gita Essence',
		category: 'Project',
		description:
			'iOS app bringing timeless wisdom from the Bhagavad Gita with daily verses, meditation guides, and personalized spiritual insights',
		stack: ['Swift', 'SwiftUI', 'CoreData', 'WidgetKit'],
		status: 'published',
		preview: {
			image: '/images/gita-essence.png',
		},
		links: {
			live: 'https://apps.apple.com/app/gita-essence',
		},
		metadata: {
			lastUpdated: '2024-10-15',
			version: '2.1.0',
		},
		features: [
			'Daily verse notifications',
			'Home screen widgets',
			'Offline access to all verses',
			'Audio narration support',
		],
		importance: 'primary',
		priority: 3,
	},
	{
		title: 'CheckMate',
		category: 'Project',
		description:
			'Real-time fact-checking Chrome extension that verifies claims as you browse, powered by AI and multiple data sources',
		stack: ['TypeScript', 'Chrome API', 'OpenAI', 'React'],
		status: 'published',
		preview: {
			image: '/images/checkmate.png',
		},
		links: {
			live: 'https://chrome.google.com/webstore/detail/checkmate',
		},
		metadata: {
			lastUpdated: '2024-09-28',
			version: '1.5.2',
		},
		features: [
			'Instant fact verification',
			'Source credibility scoring',
			'Context-aware detection',
			'Privacy-first design',
		],
		importance: 'primary',
		priority: 3,
	},
	{
		title: 'OurStars',
		category: 'Project',
		description:
			'Create personalized star maps of any moment in time. Perfect for anniversaries, birthdays, and special memories',
		stack: ['Next.js', 'Three.js', 'TypeScript', 'Stripe', 'Vercel'],
		status: 'published',
		preview: {
			image: '/images/ourstars.png',
			demo: 'https://ourstars.co/demo',
		},
		links: {
			live: 'https://ourstars.co',
		},
		metadata: {
			lastUpdated: '2024-10-20',
			version: '3.0.0',
		},
		features: [
			'Custom date & location picker',
			'High-resolution downloads',
			'Multiple poster styles',
			'Gift certificate support',
		],
		importance: 'primary',
		priority: 5,
	},
	{
		title: 'WP Snippets AI',
		category: 'Project',
		description:
			'Premium WordPress plugin that generates custom code snippets using AI. Extends functionality without bloat',
		stack: [
			'PHP',
			'WordPress',
			'React',
			'MySQL',
			'Tailwind CSS',
			'Shadcn UI',
		],
		status: 'published',
		preview: {
			image: '/images/wp-snippets.png',
		},
		links: {
			live: 'https://wpsnippets.ai',
		},
		metadata: {
			lastUpdated: '2025-10-26',
			version: '1.3.0',
		},
		features: [
			'AI-powered snippet generation',
			'Built-in code editor',
			'Version control & rollback',
			'Security scanning',
		],
		importance: 'primary',
		priority: 2,
	},
	{
		title: 'Mudo',
		category: 'Experiment',
		description:
			'Minimalist micro mood journal for iOS. Track emotional patterns with quick check-ins and beautiful data visualizations',
		stack: ['Swift', 'SwiftUI', 'HealthKit', 'Charts'],
		status: 'in-progress',
		preview: {
			image: '/images/mudo.png',
		},
		links: {
			source: 'https://github.com/adictonator/mudo',
		},
		metadata: {
			lastUpdated: '2024-10-22',
			version: '0.9.0 Beta',
		},
		features: [
			'< 10 second check-ins',
			'Mood pattern insights',
			'Export to Health app',
			'No cloud - privacy first',
		],
		importance: 'primary',
		priority: 1,
		timeline: [
			{
				date: '2024-10-22',
				type: 'update',
				title: 'Beta testing phase',
				description: 'Internal testing with 25 users',
			},
			{
				date: '2024-09-15',
				type: 'milestone',
				title: 'MVP Complete',
				description: 'Core journaling features implemented',
			},
		],
	},
	{
		title: 'Scope Creep',
		category: 'Experiment',
		description:
			"2D puzzle-platformer where every level adds a new mechanic you didn't ask for. A satirical take on project management",
		stack: ['Godot', 'GDScript', 'Aseprite'],
		status: 'in-progress',
		preview: {
			image: '/images/scope-creep.png',
		},
		links: {},
		metadata: {
			lastUpdated: '2024-10-10',
		},
		features: [
			'Progressive mechanic overload',
			'Retro pixel art style',
			'Meta game design commentary',
		],
		importance: 'secondary',
		priority: 3,
	},
	{
		title: 'ShadyHumans',
		category: 'Experiment',
		description:
			'Narrative-driven PC game exploring the grey areas of human morality. Currently in pre-production phase',
		stack: ['Godot', 'GDScript', 'Blender'],
		status: 'concept',
		preview: {
			image: '/images/shadyhumans.png',
		},
		links: {
			live: 'https://shadyhumans.com',
		},
		metadata: {
			lastUpdated: '2024-08-05',
		},
		features: [
			'Branching narrative system',
			'Moral ambiguity mechanics',
			'Multiple endings',
		],
		importance: 'secondary',
		priority: 5,
	},
]
