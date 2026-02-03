export interface ProjectTimelineEvent {
	date: string
	type: 'feature' | 'update' | 'milestone'
	title: string
	description?: string
}

export interface Project {
	title: string
	category:
		| 'mobile-app'
		| 'web-app'
		| 'library'
		| 'tool'
		| 'project'
		| 'browser-extension'
		| 'desktop-app'
		| 'game'
		| 'experiment'
	description: string
	stack: string[]
	status: 'published' | 'in-progress' | 'archived' | 'concept' | 'stale'
	preview?: {
		image: string
		video?: string
		demo?: string
	}
	links: {
		live?: string
		source?: string
		storeLink?: string
		demo?: string
		caseStudy?: string
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
		category: 'mobile-app',
		description:
			'iOS app bringing timeless wisdom from the Bhagavad Gita with daily verses, meditation guides, and personalized spiritual insights',
		stack: ['SwiftUI', 'Notifications', 'UIKit'],
		status: 'published',
		preview: {
			image: '/images/gita-essence.png',
		},
		links: {
			storeLink: 'https://apps.apple.com/app/gita-essence',
		},
		metadata: {
			lastUpdated: '2025-06-15',
			version: '1.0.0',
		},
		features: [
			'Daily verse notifications',
			'Hindi & English translations',
			'Transliterations for pronunciation',
			'Offline access to all verses',
		],
		importance: 'secondary',
		priority: 3,
	},
	{
		title: 'CheckMate',
		category: 'browser-extension',
		description:
			'Real-time fact-checking Chrome extension that verifies claims as you browse, powered by AI and multiple data sources',
		stack: ['TypeScript', 'Chrome API', 'OpenAI', 'React'],
		status: 'stale',
		preview: {
			image: '/assets/images/projects/checkmate/checkmate-cover.png',
		},
		links: {
			live: 'https://chrome.google.com/webstore/detail/checkmate',
			storeLink: 'https://chrome.google.com/webstore/detail/checkmate',
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
		category: 'web-app',
		description:
			'Create personalized star maps of any moment in time. Perfect for anniversaries, birthdays, and special memories',
		stack: ['Next.js', 'Three.js', 'TypeScript', 'Stripe', 'Vercel'],
		status: 'archived',
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
		importance: 'secondary',
		priority: 5,
	},
	{
		title: 'WP Snippets AI',
		category: 'tool',
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
			image: '/assets/images/projects/wpsai/wpsai-cover.png',
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
		title: 'Mudo: Anxiety & Mood Tracker',
		category: 'mobile-app',
		description:
			'Minimalist anxiety & mood tracker I built for iOS. It reduces friction and helps you track emotional patterns with quick check-ins and beautiful data visualizations',
		stack: [
			'Swift',
			'SwiftUI',
			'CoreData',
			'Charts',
			'WidgetKit',
			'iCloud',
			'UIKit',
			'Combine',
		],
		status: 'published',
		preview: {
			image: '/assets/images/projects/mudo/mudo-cover.png',
		},
		links: {
			live: 'https://mudoapp.com',
			caseStudy: '/case-studies/mudo',
			storeLink: 'https://apps.apple.com/app/mudo-mood-journal',
		},
		metadata: {
			lastUpdated: '2026-01-27',
			version: '2.2.0',
		},
		features: [
			'< 10 second check-ins',
			'Mood pattern insights',
			'Smart notifications',
			'Weekly reports',
			'Mood dip and recovery tracking',
			'Data export (CSV & JSON)',
			'iCloud sync',
			'Privacy-first design',
		],
		importance: 'primary',
		priority: 1,
		timeline: [
			{
				date: '2025-10-27',
				type: 'update',
				title: 'v1.0 Released',
				description: 'Internal testing with 25 users',
			},
			{
				date: '2025-12-15',
				type: 'milestone',
				title: 'MVP Complete',
				description: 'Core journaling features implemented',
			},
		],
	},
	{
		title: 'Scope Creep',
		category: 'game',
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
		category: 'game',
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
	{
		title: 'CSS & JavaScript Toolbox',
		category: 'tool',
		description:
			'A curated collection of reusable CSS snippets and JavaScript utilities for rapid web development',
		stack: ['HTML', 'CSS', 'JavaScript', 'Vite', 'Tailwind CSS'],
		status: 'archived',
		preview: {
			image: '/images/css-js-toolbox.png',
		},
		links: {
			source: 'https://github.com/adictonator/css-js-toolbox',
		},
		metadata: {
			lastUpdated: '2023-12-01',
			version: '1.0.0',
		},
		features: [
			'Modular CSS components',
			'Vanilla JS utilities',
			'Responsive design patterns',
		],
		importance: 'secondary',
		priority: 4,
	},
	{
		title: 'Heckle: Dev Focus Monitor',
		category: 'desktop-app',
		description:
			'A mischievous desktop companion that pops up with random jokes, remarks, and distractions to keep you productive (or on your toes).',
		stack: ['SwiftUI', 'macOS', 'NSApplication', 'Combine', 'UIKit'],
		status: 'in-progress',
		preview: {
			image: '/assets/images/projects/heckle/heckle-cover.png',
		},
		links: {
			storeLink: 'app-store-link-placeholder',
		},
		metadata: {
			lastUpdated: '2026-02-01',
			version: '1.0.0',
		},
		features: [
			'Random jokes/remarks pop-up',
			'Developer productivity',
			'Customizable distraction settings',
		],
		importance: 'primary',
		priority: 2,
	},
]
