export interface ServiceCard {
	type: 'consultation' | 'project-discovery'
	title: string
	description: string
	features: string[]
	process: { title: string; description: string }[]
	expertise: string[]
	benefits: string[]
}

export const services: ServiceCard[] = [
	{
		type: 'project-discovery',
		title: 'Full Project Development',
		description:
			'End-to-end development of web applications that are performant, secure, and scalable',
		features: [
			'Complete technical ownership',
			'Collaborative roadmap planning',
			'Regular progress updates',
			'Post-launch support period',
			'Documentation & knowledge transfer',
		],
		process: [
			{
				title: 'Discovery',
				description: 'Deep dive into requirements and objectives',
			},
			{
				title: 'Architecture',
				description: 'System design and technical planning',
			},
			{
				title: 'Development',
				description: 'Iterative development with regular demos',
			},
			{
				title: 'Launch',
				description: 'Deployment and performance optimization',
			},
		],
		expertise: [
			'Full-stack web development',
			'React/Next.js applications',
			'API design and development',
			'Database architecture',
			'Performance optimization',
		],
		benefits: [
			'Future-proof architecture',
			'Scalable solutions',
			'Clean, maintainable code',
			'Comprehensive documentation',
		],
	},
	{
		type: 'consultation',
		title: 'Technical Consultation',
		description:
			'Expert guidance on architectural decisions and technical strategy',
		features: [
			'Architecture review',
			'Code quality assessment',
			'Performance optimization',
			'Best practices guidance',
			'Team mentoring',
		],
		process: [
			{
				title: 'Analysis',
				description: 'Review current architecture and challenges',
			},
			{ title: 'Strategy', description: 'Develop improvement roadmap' },
			{
				title: 'Implementation',
				description: 'Guide technical execution',
			},
			{
				title: 'Review',
				description: 'Measure and iterate on improvements',
			},
		],
		expertise: [
			'System architecture',
			'Performance optimization',
			'Security best practices',
			'Technical leadership',
			'Team collaboration',
		],
		benefits: [
			'Improved system reliability',
			'Enhanced performance',
			'Better team productivity',
			'Reduced technical debt',
		],
	},
]
