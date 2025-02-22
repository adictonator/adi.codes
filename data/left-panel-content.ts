export const sectionContent: Record<
	string,
	{ subheading?: string; title: string; items?: string[] }
> = {
	experience: {
		subheading: 'Experience',
		title: 'Career Highlights',
		//items: [
		//	'10+ Years Experience',
		//	'50+ Projects Delivered',
		//	'3 Industry Awards',
		//],
	},
	skills: {
		title: 'Core Skills',
		items: [
			'Frontend Development',
			'Backend Systems',
			'Cloud Infrastructure',
		],
	},
	projects: {
		title: 'Project Focus',
		items: ['Web Applications', 'API Design', 'System Architecture'],
	},
	opensource: {
		title: 'Open Source',
		items: ['Active Contributor', 'Project Maintainer', 'Community Member'],
	},
	uses: {
		title: 'Tech Stack',
		items: ['Modern Tools', 'Best Practices', 'Efficient Workflows'],
	},
	lab: {
		title: 'Experiments',
		items: ['Innovation', 'Research', 'Prototypes'],
	},
	blog: {
		title: 'Writing',
		items: ['Technical Guides', 'Industry Insights', 'Best Practices'],
	},
	hire: {
		title: 'Work With Me',
		items: [
			'Available for Projects',
			'Remote Collaboration',
			'Technical Leadership',
		],
	},
}
