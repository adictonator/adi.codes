export const sectionContent: Record<
	string,
	{ subheading?: string; title: string; description?: string[] }
> = {
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
	skills: {
		subheading: 'I like to experiment with',
		title: 'Best stacks',
		description: [
			'Being a full-stack dev IS as crazy as it sounds, but it keeps me busy. I understand both ends, thus, I like to learn more about both ends.',
			'Over the past 13-something years, I\'ve had the opportunity and (bad luck) of stumbling upon various tech stacks that I am "okay-ish" at now. ',
			'I obviously have a favorite stack, preferred stack, and the stack that I deeply despise (even though I can work with it). Is this what you call a "work hazard"?',
		],
	},
	projects: {
		subheading: 'Portfolio',
		title: 'Live Work',
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
	uses: {
		subheading: 'The toolbox of',
		title: 'Cool stuff',
		description: [
			'These are the tools that keep me sane during debugging sessions that make me question my life choices. ',
			"An almost clean and optimized development environment where I'm coding 12 hours straight. Yes, I take breaks. Sometimes. ",
			"To be fair, it's a very basic setup. I just like to keep things simple and efficient. ",
			"But hey, it gets the job done. And that's what matters the most, right? Right?",
		],
	},
	lab: {
		subheading: 'R&D Zone',
		title: 'Experiments',
		description: [
			'Local test environment for bleeding-edge tech. Currently breaking things with AI and WebAssembly.',
			"Personal playground for testing architecture patterns that aren't in Medium articles yet.",
			'Proving ground for performance optimizations that actually make a difference in production.',
		],
	},
	blog: {
		subheading: 'Tech Writing',
		title: 'Knowledge Base',
		description: [
			'Deep dives into system architecture decisions that kept me up at night so you can sleep better.',
			'Performance optimization war stories with actual metrics and reproducible results.',
			"Tutorial hell survivor writing guides that won't waste your time with hello world examples.",
		],
	},
	hire: {
		subheading: 'You know you want to',
		title: 'Work with me',
		description: [
			'Specialized in unfucking codebases that make senior devs quit. Version control history is my documentation.',
			'Expert at optimizing systems that grew too fast for their own good. Your startup might need this.',
			'Technical architect who writes code, not just Miro boards. I implement what I design.',
		],
	},
	connect: {
		subheading: 'We should for sure',
		title: 'Connect online',
		description: [
			'Open to discussing tech architecture, performance optimization, or why tabs are better than spaces.',
			'Active in dev communities where actual coding happens, not just meme sharing (though I enjoy those too).',
			'Regular at tech meetups where the coffee is decent and the discussions are better.',
		],
	},
}
