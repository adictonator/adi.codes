// Single source of truth for every kind of project link.
// Add a key here + render config in `components/project-links.tsx`, and it
// shows up everywhere automatically. Leave a key out of a project's `links`
// and it is simply hidden.
export type ProjectLinkType =
	| 'website' // dedicated landing page for the project
	| 'appStore' // Apple App Store / Mac App Store
	| 'playStore' // Google Play Store
	| 'chromeStore' // Chrome Web Store (extensions)
	| 'source' // public source repository
	| 'demo' // live/interactive demo
	| 'caseStudy' // long-form write-up (hosted on lazycodelab.com)

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
	links: Partial<Record<ProjectLinkType, string>>
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
			image: '/assets/images/projects/gita-essence/cover.svg',
		},
		links: {
			appStore: 'https://apps.apple.com/app/gita-essence',
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
			chromeStore: 'https://chrome.google.com/webstore/detail/checkmate',
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
			website: 'https://wpsnippets.ai',
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
			website: 'https://mudoapp.com',
			appStore: 'https://apps.apple.com/app/mudo-mood-journal',
			caseStudy: 'https://lazycodelab.com/work/mudo',
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
			website: 'https://shadyhumans.com',
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
		status: 'published',
		preview: {
			image: '/assets/images/projects/heckle/heckle-cover.png',
		},
		links: {
			appStore:
				'https://apps.apple.com/us/app/heckle-dev-focus-monitor/id6757296937',
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
	{
		title: 'Actionify',
		category: 'web-app',
		description:
			"AI that turns the messy brain-dump in your head into a clean, ordered list of things you can actually do. Paste the chaos, get a checklist. Built for students, devs, and solo founders who overthink instead of ship.",
		stack: [
			'Next.js',
			'TypeScript',
			'Supabase',
			'Gemini',
			'Lemon Squeezy',
			'Tailwind CSS',
		],
		status: 'published',
		preview: {
			image: '/assets/images/projects/actionify/cover.svg',
		},
		links: {
			website: 'https://actionify.adi.codes',
		},
		metadata: {
			lastUpdated: '2026-05-26',
			version: '1.0.0',
		},
		features: [
			'Thought-to-action in seconds',
			'AI provider fallbacks (Gemini / OpenAI / Anthropic)',
			'Credit-based usage via Lemon Squeezy',
			'Supabase auth & storage',
			'Privacy-first, no data hoarding',
		],
		importance: 'primary',
		priority: 2,
	},
	{
		title: 'Quotle',
		category: 'game',
		description:
			"Wordle, but for the iconic lines you can't stop quoting. Guess the quote in six tries, keep your streak alive, and argue with friends about which show said it first. Trimmed down to a tight v1 launch line.",
		stack: [
			'Expo',
			'React Native',
			'TypeScript',
			'Expo Router',
			'AsyncStorage',
		],
		status: 'published',
		preview: {
			image: '/assets/images/projects/quotle/cover.png',
		},
		links: {},
		metadata: {
			lastUpdated: '2026-06-05',
			version: '1.0.0',
		},
		features: [
			'Daily puzzle + endless practice mode',
			'Six guesses, streaks & stats',
			'Pro-gated hints',
			'Shareable results',
			'Fully offline, local-first',
		],
		importance: 'primary',
		priority: 2,
	},
	{
		title: 'YT Planner',
		category: 'web-app',
		description:
			'A planner that reads your own YouTube analytics (read-only, I promise) and tells you when to actually hit publish. Buckets Shorts and long-form separately and recommends post times based on how your last uploads really performed.',
		stack: [
			'Next.js',
			'TypeScript',
			'Google OAuth',
			'YouTube Data API',
			'Tailwind CSS',
		],
		status: 'in-progress',
		links: {},
		metadata: {
			lastUpdated: '2026-05-21',
		},
		features: [
			'Read-only YouTube Analytics OAuth',
			'Best-time-to-post by day & hour',
			'Shorts vs long-form split',
			'Driven by your own first-7-day numbers',
		],
		importance: 'secondary',
		priority: 3,
	},
	{
		title: 'Fmrkt',
		category: 'mobile-app',
		description:
			"A daily marketing 'playbook' for creators who hate marketing. Instead of a vague 'post more', it hands you one concrete task a day based on your platforms and stage, tracks the streak, and gives you Sundays off.",
		stack: ['Expo', 'React Native', 'TypeScript', 'Zustand'],
		status: 'in-progress',
		links: {},
		metadata: {
			lastUpdated: '2026-01-22',
		},
		features: [
			'One actionable task per day',
			'Tailored to your platforms + stage',
			'Streaks and completion tracking',
			'Built-in rest days',
		],
		importance: 'secondary',
		priority: 4,
	},
	{
		title: 'Weekly Planner',
		category: 'web-app',
		description:
			'A no-nonsense weekly planner I built for myself when every other one felt like overkill. Plan the week on a grid, sync it through a background worker so it survives a refresh, and get on with your life.',
		stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
		status: 'in-progress',
		links: {},
		metadata: {
			lastUpdated: '2026-05-13',
		},
		features: [
			'Week-at-a-glance grid',
			'Background sync worker',
			'Local-first and fast',
			'Zero-setup',
		],
		importance: 'secondary',
		priority: 4,
	},
	{
		title: 'Overreact',
		category: 'experiment',
		description:
			'A macOS app that roasts your code and reacts with a perfectly-timed GIF. Pure self-indulgence — I wanted to see how fast I could ship a dumb-but-delightful SwiftUI toy. Mission accomplished, then promptly shelved.',
		stack: ['SwiftUI', 'macOS', 'GIPHY API'],
		status: 'archived',
		preview: {
			image: '/assets/images/projects/overreact/cover.svg',
		},
		links: {},
		metadata: {
			lastUpdated: '2025-05-08',
		},
		features: [
			'Code "roasts" with personality',
			'GIPHY-powered reactions',
			'Native SwiftUI menu app',
		],
		importance: 'secondary',
		priority: 5,
	},
	{
		title: 'Daily Logs',
		category: 'experiment',
		description:
			'An Expo scratchpad for a frictionless daily-log app — the kind where you note what you did without it turning into a journaling chore. Barely past the skeleton, parked while better ideas jumped the queue.',
		stack: ['Expo', 'React Native', 'TypeScript'],
		status: 'concept',
		preview: {
			image: '/assets/images/projects/daily-logs/cover.svg',
		},
		links: {},
		metadata: {
			lastUpdated: '2025-02-17',
		},
		features: ['Quick daily entries', 'Tab-based navigation skeleton'],
		importance: 'secondary',
		priority: 5,
	},
]
