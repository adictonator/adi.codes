// The graveyard. Not every project gets a happy ending — and that's the most
// honest part of building solo. These are the ones I started, learned from, and
// buried. Kept here on purpose: the path matters as much as the wins.

export interface GraveyardProject {
	title: string
	// What it was trying to be, in one line.
	tagline: string
	category:
		| 'web-app'
		| 'mobile-app'
		| 'desktop-app'
		| 'tool'
		| 'extension'
		| 'game'
		| 'experiment'
	stack: string[]
	// ISO dates. `born` = first commit, `died` = when I called it.
	born: string
	died: string
	// Did real users ever touch it, or did it die in the workshop?
	wasLive: boolean
	// The short line on the headstone.
	epitaph: string
	// Why it got killed. The honest post-mortem.
	causeOfDeath: string
	// What I walked away with.
	lessons?: string
	// Where the idea (or its corpse) lives on, if anywhere.
	successor?: string
}

export const graveyard: GraveyardProject[] = [
	{
		title: 'OurStars',
		tagline: 'Personalized star maps of any moment in time.',
		category: 'web-app',
		stack: ['Next.js', 'Three.js', 'TypeScript', 'Stripe', 'Vercel'],
		born: '2023-09-01', // TODO: confirm real start date
		died: '2024-10-20',
		wasLive: true,
		epitaph: 'Sold a few skies. Couldn’t keep the lights on.',
		causeOfDeath:
			'A star-map gifting store — pick a date and place, get the night sky from that exact moment as a poster. It actually shipped and made sales, but it was deeply seasonal, low-margin, and every sale was a one-off that demanded constant marketing. The upkeep outweighed the return, so I let it sunset.',
		lessons:
			'One-off gifting products are a treadmill — you market hard for every single sale with no retention to bank on. Recurring value beats novelty.',
	},
	{
		title: 'ShopHealth',
		tagline: 'Store health monitoring for Shopify merchants.',
		category: 'tool',
		stack: ['React Router', 'Shopify', 'Prisma', 'Polaris', 'Fly.io'],
		born: '2025-10-26',
		died: '2025-11-09', // TODO: confirm real end date
		wasLive: false,
		epitaph: 'Great scanner. Brutal neighbourhood.',
		causeOfDeath:
			'A Shopify app that audited stores for speed, SEO and UX issues and explained the fixes in plain English. The MVP came together well — but it landed in a crowded category against well-funded incumbents, and out-marketing established store-audit apps as a solo dev was a different game entirely. Shelved before launch.',
		lessons:
			'A good product in a saturated category still needs a distribution edge. Building it was never the hard part — being found was.',
	},
	{
		title: 'Codiflow',
		tagline: 'Reusable product blueprints for Shopify.',
		category: 'tool',
		stack: ['React Router', 'Shopify', 'Prisma', 'Polaris'],
		born: '2026-01-15', // TODO: confirm real start date
		died: '2026-02-17',
		wasLive: false,
		epitaph: 'Solved a real problem too few people had.',
		causeOfDeath:
			'Let merchants define a product "blueprint" once and spin up consistent products from it. Genuinely useful, but niche enough that the addressable market never justified maintaining a full Shopify app. Parked once it was clear too few merchants would pay for it.',
		lessons:
			'"Useful" isn’t "fundable." Pain has to be both real and widespread enough to support the cost of being a maintained product.',
	},
	{
		title: 'XRay',
		tagline: 'Xcode preview crash monitor for macOS.',
		category: 'desktop-app',
		stack: ['SwiftUI', 'macOS', 'AppKit', 'Combine'],
		born: '2025-12-30',
		died: '2026-01-10', // TODO: confirm real end date
		wasLive: false,
		epitaph: 'A dev tool for an audience of exactly me.',
		causeOfDeath:
			'A menu-bar app that caught Xcode preview crashes and handed me an AI explanation with the line to fix. Genuinely handy during SwiftUI work — but too narrow to be a product, and not worth maintaining as Xcode kept shifting the ground underneath it. Scratched my own itch, then stopped.',
		lessons:
			'Scratching your own itch is a great reason to build and a weak reason to maintain. Know which one you’re doing.',
	},
	{
		title: 'Emberline',
		tagline: 'A calm, pixel-art breathing companion.',
		category: 'mobile-app',
		stack: ['Expo', 'React Native', 'Skia', 'TypeScript'],
		born: '2025-04-17',
		died: '2025-04-26',
		wasLive: false,
		epitaph: 'Beautiful to build. Invisible in the store.',
		causeOfDeath:
			'A guided breathing app with a pixel-art skin and session streaks. The Skia rendering was a joy to build, but the calm/breathing category is brutally saturated with polished, well-funded apps, and the retro angle was charm, not a real wedge. Stayed a prototype.',
		lessons:
			'A fun visual hook isn’t a differentiator users will switch for. In a crowded category you need a reason to be chosen, not just admired.',
	},
	{
		title: 'Resist',
		tagline: 'Put the apps you doom-scroll behind a speed bump.',
		category: 'mobile-app',
		stack: ['Expo', 'React Native', 'TypeScript'],
		born: '2026-02-10', // TODO: confirm real start date
		died: '2026-02-17',
		wasLive: false,
		epitaph: 'The OS owns the off switch, not me.',
		causeOfDeath:
			'An app-blocking focus tool — pick the offenders, gate them, track your relapses. The problem: iOS hands that power to Screen Time / Family Controls behind tight entitlements, so a third-party version was always going to be hobbled. Killed once the platform limits made the core promise undeliverable.',
		lessons:
			'Check what the platform will actually let you do before building the feature it’s all built around. Some walls don’t move.',
	},
	{
		title: 'Samskritam',
		tagline: 'A Duolingo-shaped path for learning Sanskrit.',
		category: 'mobile-app',
		stack: ['Expo', 'React Native', 'TypeScript'],
		born: '2026-02-10', // TODO: confirm real start date
		died: '2026-02-17',
		wasLive: false,
		epitaph: 'Built the engine. Never wrote the lessons.',
		causeOfDeath:
			'A lesson-based Sanskrit learning app — alphabet, greetings, verbs, the usual path. The mechanics came together fast, but for a language app the content *is* the product, and building a real curriculum solo was a mountain I didn’t have the bandwidth for. Stalled at the skeleton.',
		lessons:
			'For content-driven apps, the code is the easy 20%. If you can’t commit to the content, the app was never the real project.',
	},
	{
		title: 'Tweetwit',
		tagline: 'Authentic Twitter growth, minus the guesswork.',
		category: 'web-app',
		stack: [
			'Next.js',
			'TypeScript',
			'Drizzle ORM',
			'Auth.js',
			'Flask',
			'Tailwind CSS',
		],
		born: '2024-11-21',
		died: '2024-12-09',
		wasLive: false,
		epitaph: 'Built the growth engine. Couldn’t afford the fuel.',
		causeOfDeath:
			'A Twitter/X growth tool that needed the X API to do anything useful — daily tasks, analytics, a Python niche-detector, the whole thing. By late 2024 that API had become an enterprise-priced toll booth on top of a hobby-scale idea. The product worked; the economics never would. Pulled the plug before launch and salvaged the idea into Twitalyst.',
		lessons:
			'Don’t build a business on a platform that can change your unit economics overnight. Validate the cost of your hardest dependency before writing the fun parts.',
		successor: 'Twitalyst',
	},
	{
		title: 'Twitalyst',
		tagline: 'Track and analyze your Twitter performance.',
		category: 'web-app',
		stack: ['Next.js', 'TypeScript', 'Drizzle ORM', 'Tailwind CSS'],
		born: '2024-12-25',
		died: '2024-12-26',
		wasLive: false,
		epitaph: 'The leaner reboot that hit the exact same wall.',
		causeOfDeath:
			'Tweetwit, stripped down and rebuilt to be cheaper to run. Same X API, same enterprise pricing, same dead end — just confirmed faster this time. Killed within days once it was clear a lighter codebase doesn’t fix a broken dependency. That was the end of the Twitter-tools chapter for me.',
		lessons:
			'Rewriting the code doesn’t fix a problem that lives outside the code. Sometimes the right move is to stop, not to refactor.',
	},
]
