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
		role: 'Founder & Product Engineer',
		company: 'LazyCodeLab Pvt. Ltd.',
		companyUrl: 'https://lazycodelab.com',
		location: 'Remote',
		type: 'engineering',
		summary:
			'A one-person app, Shopify and web studio. Client builds and stalled projects taken through to shipped, plus my own iOS, macOS and WordPress products, owned end to end',
		details: {
			achievements: [
				'Shipped Mudo, Gita Essence, Quotle and Heckle as a one-person team — product, design, code, and App Store releases (Quotle on Google Play too)',
				'Sole engineer on WP Snippets AI and AI Blackout, two WordPress plugins built from an empty repo',
				'Helped 10+ merchants with custom Shopify apps and themes',
				'Hired and led a remote, cross-functional team of 6 for about a year to test scaling the agency model — ran hiring, mentoring, and delivery, then deliberately returned to solo operations in 2024',
				'Launched 2 products with 30+ paying customers',
				'Increased revenue by 200% in 6 months',
			],
			skills: [
				'Swift',
				'SwiftUI',
				'React Native',
				'Next.js',
				'Shopify',
				'WordPress',
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
				'49 Upwork contracts, 4,073 billed hours and $90K+ earned across my freelance years, at a 5.0★ rating',
				"Built Wooden Ladle's ordering platform from scratch in CodeIgniter — stock management, pickup flow, and a bespoke admin panel",
				'Custom WordPress theme and WooCommerce build for Hoppe Jewelers, including a build-your-own product designer',
				'Performance and UX work on Skoolmaths, a UK maths LMS serving thousands of students',
				'Custom Braintree/Wallee checkout integrations for Shopify stores in pure Liquid — no third-party checkout app',
				'Took over CSS & JavaScript Toolbox in 2019 — a WordPress.org plugin on 10,000 sites that I still maintain',
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
				'Helped develop a custom CMS for a client, increasing revenue by 30%',
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
				'Delivered 5+ WordPress and Laravel projects',
				'Worked directly with clients on scope, updates and handover',
				'Ran parallel projects against fixed deadlines',
				'Learned that teamwork and clear communication matter as much as the code',
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
			'Went straight from college into full-time freelancing on Fiverr and Upwork.',
		details: {
			achievements: [
				'Delivered 10+ projects and built a few long-term client relationships',
				'Learned to scope, price and communicate like a business, not a student',
				'Figured out time management the hard way',
				'Also figured out finances and taxes the hard way',
			],
			skills: [
				'jQuery',
				'JavaScript',
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
