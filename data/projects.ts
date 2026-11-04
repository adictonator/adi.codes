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
		| 'client-work'
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
			"A daily verse from the Bhagavad Gita, in Sanskrit, Hindi and English. Shipped it in SwiftUI first as my 'can I actually get through App Review' test, then tore it down and rebuilt the whole thing in React Native and Expo when I wanted one codebase again. Now on v2.3 with paid subscriptions.",
		stack: [
			'React Native',
			'Expo',
			'TypeScript',
			'RevenueCat',
			'Notifications',
		],
		status: 'published',
		preview: {
			image: '/assets/images/projects/gita-essence/cover.svg',
		},
		links: {
			appStore:
				'https://apps.apple.com/us/app/gita-essence-daily-verse/id6745466583',
		},
		metadata: {
			lastUpdated: '2026-07-15',
			version: '2.3.0',
		},
		features: [
			'Daily verse notifications',
			'Sanskrit, Hindi & English with transliterations',
			'Offline access to all verses',
			'Subscriptions via RevenueCat',
			'Rewritten from SwiftUI to React Native',
		],
		importance: 'primary',
		priority: 2,
	},
	{
		title: 'CheckMate',
		category: 'browser-extension',
		description:
			"Highlight a claim anywhere on the web, right-click, and get a verdict with real sources in a side panel. The listing had gone quiet, so I rewrote the whole thing from scratch and relaunched it at v1.0.0. Sources come from Google's search grounding, not the model, so a citation can't be invented: no sources, no verdict.",
		stack: [
			'Chrome MV3',
			'React',
			'TypeScript',
			'Cloudflare Workers',
			'D1',
			'Gemini',
		],
		status: 'published',
		preview: {
			image: '/assets/images/projects/checkmate/checkmate-cover.webp',
		},
		links: {
			chromeStore:
				'https://chromewebstore.google.com/detail/checkmate-ai-fact-checker/dakejmpmagfgfofgfmnlnbdkmiccaaba',
		},
		metadata: {
			lastUpdated: '2026-09-04',
			version: '1.0.0',
		},
		features: [
			'Side-panel fact checks on any selected text',
			'Citations from search grounding, never from the model',
			'Cloudflare Worker on D1 holds the AI key, meters the free tier, runs billing',
			'No content script, no all-URLs access — it only sees what you send it',
			'Full rewrite of an existing Chrome Web Store listing',
		],
		importance: 'primary',
		priority: 3,
	},
	{
		title: 'WP Snippets AI',
		category: 'tool',
		description:
			"A WordPress plugin that writes, refines and places your code snippets for you — four AI providers behind one interface, a React admin with revision history and diffing, and conditional placement across 20+ hook locations. It's what CSS & JavaScript Toolbox could never safely grow into, so the plugin's owner and I started it fresh: product calls shared, the engineering all mine.",
		stack: [
			'PHP',
			'WordPress',
			'React',
			'TypeScript',
			'WP REST API',
			'Tailwind CSS',
		],
		status: 'published',
		preview: {
			image: '/assets/images/projects/wpsai/wpsai-cover.webp',
		},
		links: {
			website: 'https://wpsnippets.ai',
			caseStudy: 'https://lazycodelab.com/work/wp-snippets-ai',
		},
		metadata: {
			lastUpdated: '2026-08-17',
			version: '2.3.0',
		},
		features: [
			'OpenAI, Anthropic, Gemini and xAI behind one provider factory',
			'Generate, refine and explain snippets in place',
			'Revision history with diffing',
			'Conditional placement across 20+ hooks',
			'Elementor + Gutenberg support',
			'Self-hosted licensing and update server (WPSAI Hub)',
		],
		importance: 'primary',
		priority: 1,
	},
	{
		title: 'Mudo: Anxiety & Mood Tracker',
		category: 'mobile-app',
		description:
			"The app that made me learn Swift properly. Every mood tracker I tried wanted a paragraph and a photo; I wanted to log how I felt and put the phone down. Ten seconds, no streak guilt, everything stays on your device. A year on the App Store and fourteen minor versions in, it's still the thing I'm proudest of.",
		stack: [
			'Swift',
			'SwiftUI',
			'CoreData',
			'CloudKit',
			'Foundation Models',
			'RevenueCat',
			'WidgetKit',
		],
		status: 'published',
		preview: {
			image: '/assets/images/projects/mudo/mudo-cover.webp',
		},
		links: {
			website: 'https://mudoapp.com',
			appStore:
				'https://apps.apple.com/us/app/mudo-anxiety-mood-tracker/id6746933711',
			caseStudy: 'https://lazycodelab.com/work/mudo',
		},
		metadata: {
			lastUpdated: '2026-09-24',
			version: '2.14.0',
		},
		features: [
			'< 10 second check-ins',
			'On-device insights via Foundation Models',
			'Mood dip and recovery tracking',
			'Home screen widgets',
			'Data export (CSV & JSON)',
			'iCloud sync',
			'Privacy-first — nothing leaves the device',
		],
		importance: 'primary',
		priority: 1,
	},
	{
		title: 'HypeFlags',
		category: 'client-work',
		description:
			'Three-year run (2020-2023) as core developer on a D2C Shopify store — two custom product designers and an order-management backend built from scratch, in-house features replacing paid apps, and a checkout upsell that lifted sales ~13%',
		stack: ['Shopify', 'Liquid', 'JavaScript', 'Custom Storefront Apps'],
		status: 'published',
		preview: {
			image: '/assets/images/projects/hypeflags/cover.webp',
		},
		links: {
			website: 'https://hypeflags.com',
			caseStudy: 'https://lazycodelab.com/work/hypeflags',
		},
		metadata: {
			lastUpdated: '2023-12-31',
		},
		features: [
			'Two custom product designers built from scratch',
			'Order-management backend',
			'In-house features replacing paid Shopify apps',
			'Checkout upsell flow (~13% sales lift)',
		],
		importance: 'primary',
		priority: 2,
	},
	{
		title: 'Scope Creep',
		category: 'game',
		description:
			"2D puzzle-platformer where every level bolts on a mechanic you didn't ask for — a game about project management that ironically lost to scope creep. Parked since late 2025 while newer Godot projects jumped the queue. The joke wrote itself; the levels did not.",
		stack: ['Godot', 'GDScript', 'Aseprite'],
		status: 'stale',
		links: {},
		metadata: {
			lastUpdated: '2025-09-29',
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
		title: 'Bug Off!',
		category: 'game',
		description:
			"You're a cockroach on a floor full of feet. Bait a swat, dodge on the last frame, keep the chain alive. Single-screen arcade score-attack in Godot — the loop is closed, it's playable end to end, and the itch.io export preset has been sitting configured for weeks. It isn't unfinished, it's un-shipped, and I've written myself a whole document about the difference.",
		stack: ['Godot 4.7', 'GDScript', 'Aseprite'],
		status: 'in-progress',
		links: {},
		metadata: {
			lastUpdated: '2026-07-28',
		},
		features: [
			'Score by brushing past danger, not avoiding it',
			'One hit kills — fast-restart arcade loop',
			'PC + HTML5 export for itch.io',
			'GDD, backlog and cut list kept as separate docs',
		],
		importance: 'secondary',
		priority: 3,
	},
	{
		title: 'Totally Normal Browsing',
		category: 'game',
		description:
			'You work a desk job reading other people\'s browsing history and deciding who gets flagged. Fifteen suspect profiles, a week-by-week directive system, an upgrade shop, and multiple endings — the biggest Godot thing I\'ve built, and the one where the writing matters more than the code.',
		stack: ['Godot 4.6', 'GDScript'],
		status: 'in-progress',
		links: {},
		metadata: {
			lastUpdated: '2026-04-09',
		},
		features: [
			'15 suspect profiles with branching evidence',
			'Week/day directive structure',
			'Upgrade shop and multiple endings',
			'Autoload-driven state architecture',
		],
		importance: 'secondary',
		priority: 3,
	},
	{
		title: 'Almost Perfect',
		category: 'game',
		description:
			"A mobile game where perfection is failure. Stop the slider at exactly 0.5 and you lose; get close but not perfect and you advance. Twenty levels, ten task types, all built around one tolerance check that inverts everything you've been trained to do in a game.",
		stack: ['Godot 4.3', 'GDScript'],
		status: 'in-progress',
		links: {},
		metadata: {
			lastUpdated: '2026-03-01',
		},
		features: [
			'"Perfect" is a fail state',
			'10 task types across 20 data-driven levels',
			'Configurable tolerance evaluator',
		],
		importance: 'secondary',
		priority: 4,
	},
	{
		title: 'Ship It',
		category: 'game',
		description:
			'A card-driven game about shipping software under pressure — briefs, meters, and a debug minigame that punishes you for the shortcuts you took three cards ago. Playable skeleton, design doc written, parked while Bug Off! hogs the finish line.',
		stack: ['Godot', 'GDScript'],
		status: 'in-progress',
		links: {},
		metadata: {
			lastUpdated: '2026-04-11',
		},
		features: [
			'Card stage with brief → outcome loop',
			'Competing meters as the core tension',
			'Debug minigame',
		],
		importance: 'secondary',
		priority: 4,
	},
	{
		title: 'Tether',
		category: 'game',
		description:
			"A one-button arcade game about momentum — you're a spark falling through the dark, hold to swing around an anchor, release to fling onward. Right now it is exactly one file: a design doc that opens with \"draft the itch.io page before writing code.\" After Scope Creep, I'm trying the fence-first approach.",
		stack: ['Godot', 'GDScript'],
		status: 'concept',
		links: {},
		metadata: {
			lastUpdated: '2026-07-22',
		},
		features: [
			'One mechanic: swing and release',
			'Endless + procedural, no level pipeline',
			'Scope fenced by the pitch before any code',
		],
		importance: 'secondary',
		priority: 5,
	},
	{
		title: 'ShadyHumans',
		category: 'game',
		description:
			'Narrative-driven PC game exploring the grey areas of human morality. Currently in pre-production phase',
		stack: ['Godot', 'GDScript', 'Blender'],
		status: 'concept',
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
			"A WordPress plugin published in 2011 — older than most of my career — that I've been the developer on since 2019, for Wipeout Media. 10,000 sites run it right now. That number is the whole job: every release is a security patch or a PHP compat fix that cannot break someone else's live site, and there's no rewrite-it-from-scratch option when 10,000 people are already standing on it. Least glamorous thing I do, and the thing that taught me the most caution.",
		stack: ['WordPress', 'PHP', 'JavaScript', 'Gutenberg'],
		status: 'published',
		links: {
			website: 'https://wordpress.org/plugins/css-javascript-toolbox/',
		},
		metadata: {
			lastUpdated: '2026-08-26',
			version: '12.0.7',
		},
		features: [
			'10,000 active installs, 550k+ downloads',
			'96/100 rating across 84 reviews',
			'On the plugin since v9.4 (2019), now shipping v12.0.7',
			'Security hardening & PHP compatibility across major WP releases',
			'Premium PLUS edition with a custom Gutenberg block',
		],
		importance: 'primary',
		priority: 2,
	},
	{
		title: 'AI Blackout',
		category: 'tool',
		description:
			"A free WordPress plugin for site owners who are done with AI companies training on their work for nothing. Blocks 26 AI crawlers, publishes a formal reservation of rights against AI training, and switches off the AI that WordPress core and other plugins keep quietly adding. Setup is one question. Then it asks your own site for a page while pretending to be a crawler, so you can see it actually works.",
		stack: ['WordPress', 'PHP', 'robots.txt', 'Content Signals'],
		status: 'published',
		links: {
			website: 'https://wordpress.org/plugins/ai-blackout/',
		},
		metadata: {
			lastUpdated: '2026-09-12',
			version: '2.0.0',
		},
		features: [
			'Blocks 26 AI crawlers, leaves Google search untouched',
			'Formal reservation of rights against AI training',
			'Switches off the AI in WordPress core and in other plugins',
			'One-question setup that writes every layer the server allows',
			'Self-test that requests a page as a crawler and shows the result',
		],
		importance: 'primary',
		priority: 2,
	},
	{
		title: 'Heckle: Dev Focus Monitor',
		category: 'desktop-app',
		description:
			"A menu bar gremlin that heckles you while you code. Zero productivity value, shipped on the Mac App Store anyway, because sometimes the point is finding out how fast you can take a stupid idea from Xcode to a live listing. Answer: faster than you'd think.",
		stack: ['SwiftUI', 'macOS', 'AppKit', 'Combine'],
		status: 'published',
		preview: {
			image: '/assets/images/projects/heckle/heckle-cover.webp',
		},
		links: {
			appStore:
				'https://apps.apple.com/us/app/heckle-dev-focus-monitor/id6757296937',
		},
		metadata: {
			lastUpdated: '2026-02-09',
			version: '1.0.0',
		},
		features: [
			'Native SwiftUI menu bar app',
			'Random jokes and remarks while you code',
			'Customizable distraction settings',
			'Signed, notarized, through Mac App Store review',
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
			"Wordle, but for the iconic lines you can't stop quoting. Guess the quote in six tries, keep your streak alive, and argue with friends about which show said it first. On both stores — and yes, I did round up the twelve Android testers Google demands.",
		stack: [
			'Expo',
			'React Native',
			'TypeScript',
			'Expo Router',
			'AsyncStorage',
		],
		status: 'published',
		preview: {
			image: '/assets/images/projects/quotle/cover.webp',
		},
		links: {
			appStore:
				'https://apps.apple.com/us/app/quotle-tv-quote-word-game/id6758567850',
			playStore:
				'https://play.google.com/store/apps/details?id=com.lazycodelab.quotle',
		},
		metadata: {
			lastUpdated: '2026-06-21',
			version: '1.2.0',
		},
		features: [
			'Daily puzzle + endless practice mode',
			'Six guesses, streaks & stats',
			'Pro-gated hints via RevenueCat',
			'Shareable results',
			'Fully offline, local-first',
		],
		importance: 'primary',
		priority: 2,
	},
	{
		title: 'Practix',
		category: 'web-app',
		description:
			"An 11-week pixel art curriculum you can actually check off. Learning pixel art doesn't fail on talent, it fails on structure — a wall of tutorials and no idea what to draw today. So every drill names its subject, its canvas size, and two or three tips, and nothing else. Built it because I was the student who needed it.",
		stack: ['Vite', 'React', 'Tailwind CSS', 'localStorage'],
		status: 'in-progress',
		links: {
			source: 'https://github.com/lazycodelab/practix',
		},
		metadata: {
			lastUpdated: '2026-08-11',
			version: '1.0.0',
		},
		features: [
			'33 drills across 6 phases, each with a named subject',
			'Filter every drill by the concept it teaches',
			'Per-week notes and a running journal',
			'Fork it and rewrite curriculum.md — the app reshapes itself',
			'localStorage only — no account, no server, no telemetry',
		],
		importance: 'secondary',
		priority: 3,
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
