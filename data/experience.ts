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
		summary:
			'Solo product studio — custom Shopify apps and themes for merchants, plus my own iOS and web products, owned end to end',
		details: {
			achievements: [
				'Helped 10+ merchants with custom Shopify apps and themes',
				'Hired and led a remote, cross-functional team of 6 for about a year to test scaling the agency model — ran hiring, mentoring, and delivery, then deliberately returned to solo operations in 2024',
				'Launched 2 products with 30+ paying customers',
				'Increased revenue by 200% in 6 months',
				'Ship iOS apps end to end as a one-person team — product, design, code, and App Store releases',
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
		role: 'Freelance Full Stack Developer',
		company: 'Upwork & direct clients',
		location: 'Global',
		type: 'freelance',
		summary:
			'Went full-time freelance and stayed there — WordPress, Shopify and bespoke PHP for merchants and small businesses, one contract at a time',
		details: {
			achievements: [
				'49 contracts, 4,073 billed hours and $90K+ earned at a 5.0★ rating',
				"Built Wooden Ladle's ordering platform from scratch in CodeIgniter — stock management, pickup flow, and a bespoke admin panel",
				'Custom WordPress theme and WooCommerce build for Hoppe Jewelers, including a build-your-own product designer',
				'Performance and UX work on Skoolmaths, a UK maths LMS serving thousands of students',
				'Custom Braintree/Wallee checkout integrations for Shopify stores in pure Liquid — no third-party checkout app',
				'Took over CSS & JavaScript Toolbox in 2019, a WordPress.org plugin running on ~10,000 sites',
			],
			skills: [
				'WordPress',
				'Shopify',
				'Liquid',
				'PHP',
				'WooCommerce',
				'CodeIgniter',
				'MySQL',
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
