// Links: write [text](href) anywhere in a description line, e.g.
//   'The rest live on the [projects page](/projects).'
// '/…' stays on the site, '#hire' jumps to a section, 'https://…' opens in a
// new tab. Rendered by components/inline-links.tsx.
export const sectionContent: Record<
	string,
	{ subheading?: string; title: string; description?: string[] }
> = {
	// The homepage "lab" section shows shipped, featured work.
	lab: {
		subheading: "Things I've",
		title: 'Shipped',
		description: [
			'iOS and macOS apps shipped solo from idea to App Store — product, design, code, and store releases, all one pair of hands.',
			'A WordPress plugin on 10,000 sites that I inherited at v9 and still ship releases for. Nothing teaches you caution like that.',
			"The rest live on the [projects page](/projects). The ones I killed are in the [graveyard](/graveyard), and I'd argue those are the more interesting read.",
		],
	},
	experience: {
		subheading: 'Chaos of',
		title: 'Corporate life',
		description: [
			'A coder with a Civil Engineer degree. Sounds crazy, right? Well, it is. Despite my formal "education", I\'ve always been a coder at heart (and now professionally).',
			" I have written more code than drafted construction plans, that's for sure. ",
			'Had a few stints at some small companies, learned a lot, taught a lot, and made a lot of mistakes. ',
			'Plot twist: now I run LazyCodeLab, a one-person app, Shopify and web studio. Life is weird. ',
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
			'Mobile-first these days: Swift, SwiftUI, and React Native, shipping real apps to real stores. The 13-ish years of full-stack web underneath is what keeps those apps standing.',
			'I\'ve had the good luck (and the bad luck) of stumbling into a lot of tech stacks I\'m "okay-ish" at now.',
			'I have a favorite tech stack, the one I\'d actually pick for a client, and a few I deeply despise (even though I can work with them). I think that\'s what you call an "occupational hazard."',
		],
	},
	blog: {
		subheading: 'Sometimes I write',
		title: 'Notes',
		description: [
			'Notes from actually shipping things — the decisions, the reversals, and the bits I got wrong first.',
			'No listicles, no "10 VS Code extensions." If I write it up, it cost me something to learn.',
			'Mostly iOS, React Native, and the occasional post-mortem on a project I killed.',
		],
	},
	uses: {
		subheading: 'The hard/soft—wares',
		title: 'I use',
		description: [
			'These are the tools that keep me sane during debugging sessions that make me question my life choices. ',
			"An almost clean and optimized development environment where I'm coding 12 hours straight. Yes, I take breaks. Sometimes. ",
			"To be fair, it's a very basic setup. I just like to keep things simple and efficient. ",
			"But hey, it gets the job done. And that's what matters the most, right? Right?",
		],
	},
	opensource: {
		subheading: 'Community Code',
		title: 'Public Work',
		description: [
			'A 15-year-old WordPress.org plugin I maintain, where every release has to not break someone else\'s live site.',
			'Less "open source hero," more "someone has to keep the lights on." I signed up for that.',
		],
	},
	hire: {
		subheading: 'We should',
		title: 'Work together',
		description: [
			'Open to full-time roles, contracts (short or long term), and freelance projects — the kind where someone hands me a real problem and steps back.',
			"I've inherited enough codebases held together by hope and outdated docs to know exactly what technical debt costs a team. ",
			'Product engineer, not a ticket-taker. I question the spec, make the product calls, and implement what I design.',
		],
	},
	connect: {
		subheading: 'Some of my',
		title: 'Social spaces',
		description: [
			'Threads is where I actually post. The rest are mostly claimed handles and good intentions.',
			'Happy to talk iOS, WordPress internals, or why I keep killing my own side projects.',
			'DMs open. I answer slowly but I answer.',
		],
	},
}
