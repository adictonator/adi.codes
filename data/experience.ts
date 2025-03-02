type Experience = {
	period: string
	role: string
	company: string
	companyUrl?: string
	location: string
	type: 'engineering' | 'management' | 'freelance' | 'education'
	summary: string
	details: {
		achievements: string[]
		skills: string[]
	}
}

export const experiences: Experience[] = [
	{
		period: '2022 - CURR',
		role: 'Founder & CEO',
		company: 'LazyCodeLab Pvt. Ltd.',
		companyUrl: 'https://lazycodelab.com',
		location: 'Remote',
		type: 'engineering',
		summary: ' Building tools to help developers be more productive',
		details: {
			achievements: [
				'Grew team from 2 to 10 engineers in 6 months',
				'Launched 3 products with 100% user satisfaction',
				'Established engineering excellence programs resulting in 60% reduction in production incidents',
				'Led team of 8 engineers across 2 time zones, maintaining 95% on-time delivery rate',
			],
			skills: [
				'Shopify',
				'Node.js',
				'AWS',
				'Kubernetes',
				'Redis',
				'Liquid',
			],
		},
	},
	{
		period: '2019 - 2022',
		role: 'Full Stack Developer',
		company: 'Freelance',
		location: 'Global',
		type: 'freelance',
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
		period: '2017 - 2019',
		role: 'PHP Team Lead',
		company: 'Sagmetic Infotech Pvt. Ltd.',
		location: 'Punjab, India',
		type: 'engineering',
		summary:
			'Led a team of 5 developers building POS system, CRM, and ERP solutions',
		details: {
			achievements: [
				'Implemented WebSocket-based live data synchronization reducing latency by 80%',
				'Led migration of monolithic architecture to microservices',
				'Helped developing a custom CMS for a client, increasing revenue by 30%',
				'Improved code quality and reduced technical debt by 40%',
				'Enhanced a WordPress plugin for a client, increasing user engagement by 50%',
				'Mentored 4 junior developers who were promoted to mid-level roles',
			],
			skills: [
				'WordPress',
				'Laravel',
				'Next.js',
				'PostgreSQL',
				'Redis',
				'Docker',
				'Jest',
			],
		},
	},
	{
		period: '2017 - 2018',
		role: 'PHP Developer',
		company: 'SitesSimply Pvt. Ltd.',
		location: 'Punjab, India',
		type: 'engineering',
		summary:
			'Handled various PHP-based projects, including WordPress and Laravel. Coordinated with clients and managed projects.',
		details: {
			achievements: [
				'Worked on 5+ projects and learned about WordPress and Laravel',
				'Learned about project management and client communication',
				'Got to know about the importance of teamwork and collaboration',
				'Learned how to manage time and meet deadlines',
			],
			skills: [
				'Teamwork',
				'Client Communication',
				'Bootstrap',
				'Swagger',
				'Magento',
				'OpenCart',
			],
		},
	},
	{
		period: '2016 - 2017',
		role: 'Full Stack Developer',
		company: 'Freelance',
		location: 'Global',
		type: 'freelance',
		summary:
			'Continued freelancing right off the college and tried to do it full-time over Fiverr and Upwork.',
		details: {
			achievements: [
				'Worked on 10+ projects and built a few long-term relationships',
				'Learned about freelancing and how to deal with clients',
				'Got to know about the importance of communication and time management',
				'Learned how to manage finances and taxes',
			],
			skills: [
				'jQuery',
				'JavScript',
				'PHP',
				'WordPress',
				'React',
				'Laravel',
				'MySQL',
			],
		},
	},
	{
		period: '2012 - 2016',
		role: 'Graduated with Bachelor of Engineering in Civil Engineering',
		company: 'Chandigarh University',
		location: 'Punjab, India',
		type: 'education',
		summary:
			"I mean, I did study engineering at some point. So there's that.",
		details: {
			achievements: [
				'Started freelancing during my second year',
				'Studied a lot of math and physics',
				'Learned how to build roads and stuff',
				'Really miss my hostel life sometimes',
			],
			skills: ['Math', 'Physics', 'AutoCAD', 'STAAD Pro', 'Surveying'],
		},
	},
]
