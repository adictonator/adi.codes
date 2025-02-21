type Experience = {
	period: string
	role: string
	company: string
	companyUrl?: string
	location: string
	type: 'engineering' | 'management' | 'freelance'
	summary: string
	details: {
		achievements: string[]
		skills: string[]
	}
}

export const experiences: Experience[] = [
	{
		period: '2022 - Present',
		role: 'Principal Software Engineer',
		company: 'TechCorp',
		companyUrl: 'https://techcorp.com',
		location: 'Remote',
		type: 'engineering',
		summary:
			'Leading cloud architecture and full-stack development initiatives',
		details: {
			achievements: [
				'Architected and led development of microservices-based e-commerce platform handling $50M+ in annual transactions',
				'Reduced cloud infrastructure costs by 45% through optimization and implementation of serverless architecture',
				'Established engineering excellence programs resulting in 60% reduction in production incidents',
				'Led team of 8 engineers across 3 time zones, maintaining 95% on-time delivery rate',
			],
			skills: [
				'React',
				'Node.js',
				'AWS',
				'Kubernetes',
				'GraphQL',
				'TypeScript',
			],
		},
	},
	{
		period: '2020 - 2022',
		role: 'Senior Full Stack Developer',
		company: 'FinTech Solutions',
		companyUrl: 'https://fintech.com',
		location: 'San Francisco',
		type: 'engineering',
		summary: 'Built high-performance trading platforms',
		details: {
			achievements: [
				'Developed real-time trading dashboard processing 1M+ transactions daily',
				'Implemented WebSocket-based live data synchronization reducing latency by 80%',
				'Created automated testing pipeline improving code coverage from 65% to 95%',
				'Mentored 4 junior developers who were promoted to mid-level roles',
			],
			skills: [
				'Vue.js',
				'Python',
				'PostgreSQL',
				'Redis',
				'Docker',
				'Jest',
			],
		},
	},
	{
		period: '2019 - 2020',
		role: 'DevOps Team Lead',
		company: 'CloudScale',
		companyUrl: 'https://cloudscale.com',
		location: 'Remote',
		type: 'management',
		summary: 'Led cloud infrastructure and DevOps initiatives',
		details: {
			achievements: [
				'Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes',
				'Managed migration of 200+ services to Kubernetes',
				'Established monitoring and alerting reducing MTTR by 60%',
				'Created disaster recovery protocols with 99.99% uptime SLA',
			],
			skills: [
				'Terraform',
				'AWS',
				'Kubernetes',
				'Jenkins',
				'Prometheus',
				'ELK Stack',
			],
		},
	},
	{
		period: '2018 - 2019',
		role: 'Full Stack Developer',
		company: 'Freelance',
		location: 'Global',
		type: 'freelance',
		summary: 'Developed solutions for international clients',
		details: {
			achievements: [
				'Built e-commerce platforms for 5 major retail clients',
				'Developed custom CMS solution for content publishers',
				'Created automated inventory management system',
				'Integrated payment solutions processing $2M+ in transactions',
			],
			skills: ['React', 'Laravel', 'MySQL', 'AWS', 'Stripe API', 'Redis'],
		},
	},
	{
		period: '2012 - 2014',
		role: 'Graduated with Bachelor of Engineering in Civil Engineering',
		company: 'Chandigarh University',
		companyUrl: 'https://webtech.com',
		location: 'India',
		type: 'engineering',
		summary:
			"I mean, I did study engineering at some point. So there's that. 🤷‍♂️",
		details: {
			achievements: [
				'Started freelancing during my second year',
				'Studied a lot of math and physics',
				'Learned how to build bridges and stuff',
				'Had a lot of fun in college',
			],
			skills: ['Math', 'Physics', 'AutoCAD', 'STAAD Pro', 'Surveying'],
		},
	},
]

export const icons = {
	engineering: 'Code',
	management: 'Briefcase',
	freelance: 'Globe',
} as const
