export const sectionContent: Record<
	string,
	{ subheading?: string; title: string; description?: string[] }
> = {
	lab: {
		subheading: 'Curiosity driven',
		title: 'Experiments',
		description: [
			'Local test environment for bleeding-edge tech. Currently breaking things with AI and WebAssembly.',
			"Personal playground for testing architecture patterns that aren't in Medium articles yet.",
			'Proving ground for performance optimizations that actually make a difference in production.',
		],
	},
	experience: {
		subheading: 'Chaos of',
		title: 'Corporate life',
		description: [
			'A coder with a Civil Engineer degree. Sounds crazy, right? Well, it is. Despite my formal "education", I\'ve always been a coder at heart (and now professionally).',
			" I have written more code than drafted construction plans, that's for sure. ",
			'Had a few stints at some small companies, learned a lot, taught a lot, and made a lot of mistakes. ',
			'Plot twist: Now I run a tech company that focuses on helping Shopify merchants. Life is weird. ',
			'Apart from that, I created some cool shit, broke some production servers, fixed them before anyone noticed. You know, the usual.',
		],
	},
	testimonials: {
		subheading: 'People who',
		title: 'Vouch for me',
		description: [
			"Don't just take my word for it. Here's what colleagues, managers, and clients have to say about working with me.",
			'I treat every project like a partnership. Communication, reliability, and technical excellence are the baseline.',
			'Zero-ego collaboration. I write code for humans to read and machines to execute, in that order.',
		],
	},
	skills: {
		subheading: 'The galore of my',
		title: 'Tech skills',
		description: [
			'Being a full-stack dev is crazy on its own, but my itch to learn new things always keeps me busy. I like logic. But I also like minimalistic design.',
			'Over the past 13-ish years, I\'ve had the opportunities (and bad luck) of stumbling upon various tech stacks that I am "okay-ish" at now. ',
			'I have a favorite tech-stack, a preferred tech-stack, and tech-stacks that I deeply despise (even though I can work with them). I think this what you call a "work hazard."',
		],
	},
	blog: {
		subheading: 'Sometimes I write',
		title: 'Articles',
		description: [
			'Deep dives into system architecture decisions that kept me up at night so you can sleep better.',
			'Performance optimization war stories with actual metrics and reproducible results.',
			"Tutorial hell survivor writing guides that won't waste your time with hello world examples.",
		],
	},
	uses: {
		subheading: 'The hard/soft—wares',
		title: 'I Use',
		description: [
			'These are the tools that keep me sane during debugging sessions that make me question my life choices. ',
			"An almost clean and optimized development environment where I'm coding 12 hours straight. Yes, I take breaks. Sometimes. ",
			"To be fair, it's a very basic setup. I just like to keep things simple and efficient. ",
			"But hey, it gets the job done. And that's what matters the most, right? Right?",
		],
	},
	projects: {
		subheading: 'Portfolio',
		title: 'Live work',
		description: [
			"Architect of high-performance web apps that don't die under load. Production tested, user approved.",
			'Creator of dev tools that make other developers question their file structure choices. In a good way.',
			'Builder of systems that scale horizontally without breaking the bank. Your AWS bill will thank me.',
		],
	},
	opensource: {
		subheading: 'Community Code',
		title: 'Public Work',
		description: [
			'Core contributor to projects you probably use. Check your package.json, I might be in there.',
			'Author of npm packages with actual documentation. Shocking, I know.',
			"Active GitHub presence with PRs that don't just fix typos. Although I fix those too.",
		],
	},
	hire: {
		subheading: 'We should',
		title: 'Work together',
		description: [
			'Specialized in unfucking codebases that make senior devs quit. Version control history is my documentation.',
			'Expert at optimizing systems that grew too fast for their own good. Your startup might need this.',
			'Technical architect who writes code, not just Miro boards. I implement what I design.',
		],
	},
	connect: {
		subheading: 'Some of my',
		title: 'Social spaces',
		description: [
			'Open to discussing tech architecture, performance optimization, or why tabs are better than spaces.',
			'Active in dev communities where actual coding happens, not just meme sharing (though I enjoy those too).',
			'Regular at tech meetups where the coffee is decent and the discussions are better.',
		],
	},
}
