type Skill = {
	name: string
	expertise: number
	category: string
	tags: string[]
	yearsOfExperience: number
	projectCount: number
	highlight?: string
	links?: {
		docs?: string
		github?: string
		demo?: string
	}
	brandColor: string
}

export const skills: Skill[] = [
	{
		name: 'React & React Native',
		expertise: 95,
		category: 'Frontend',
		tags: ['Web', 'Mobile', 'UI/UX', 'Performance'],
		yearsOfExperience: 4,
		projectCount: 12,
		brandColor: '#61DAFB', // React blue
	},
	{
		name: 'TypeScript',
		expertise: 79,
		category: 'Languages',
		tags: ['Architecture', 'Systems Design', 'Type Safety'],
		yearsOfExperience: 1,
		projectCount: 2,
		brandColor: '#007ACC',
	},
	{
		name: 'Node.js',
		expertise: 92,
		category: 'Backend',
		tags: ['API', 'Microservices', 'Real-time'],
		yearsOfExperience: 5,
		projectCount: 14,
		brandColor: '#83CD29',
	},
	{
		name: 'Python',
		expertise: 71,
		category: 'Languages',
		tags: ['FastAPI', 'Scrapers', 'Automation'],
		yearsOfExperience: 1,
		projectCount: 15,
		brandColor: '#3776AB', // Python's official blue color
	},
	{
		name: 'PostgreSQL',
		expertise: 85,
		category: 'Database',
		tags: ['RDBMS', 'Performance Tuning', 'Indexing'],
		yearsOfExperience: 6,
		projectCount: 10,
		brandColor: '#336791',
	},
	{
		name: 'MongoDB',
		expertise: 78,
		category: 'Database',
		tags: ['NoSQL', 'Atlas', 'Aggregation'],
		yearsOfExperience: 2,
		projectCount: 2,
		brandColor: '#47A248',
	},
	{
		name: 'SQL',
		expertise: 82,
		category: 'Languages',
		tags: ['Queries', 'Joins', 'Normalization'],
		yearsOfExperience: 9,
		projectCount: 10,
		brandColor: '#CC2929',
	},
	{
		name: 'AWS',
		expertise: 82,
		category: 'DevOps',
		tags: ['EC2', 'Lambda', 'S3', 'CloudFront'],
		yearsOfExperience: 2.5,
		projectCount: 5,
		brandColor: '#FF9900',
	},
	//{
	//	name: 'Docker',
	//	expertise: 75,
	//	category: 'DevOps',
	//	tags: ['Containerization', 'Compose'],
	//	yearsOfExperience: 1,
	//	projectCount: 2,
	//	brandColor: '#2496ED',
	//},
	//{
	//	name: 'GraphQL',
	//	expertise: 65,
	//	category: 'Backend',
	//	tags: ['API Design', 'Apollo'],
	//	yearsOfExperience: 1,
	//	projectCount: 1,
	//	brandColor: '#E10098',
	//},
	{
		name: 'Next.js',
		expertise: 94,
		category: 'Frontend',
		tags: ['SSR', 'Static Generation', 'Edge'],
		yearsOfExperience: 3,
		projectCount: 19,
		brandColor: '#a0a0a0',
	},
	{
		name: 'JavaScript',
		expertise: 94,
		category: 'Languages',
		tags: ['ES6+', 'DOM Manipulation', 'Algorithms'],
		yearsOfExperience: 12,
		projectCount: 22,
		brandColor: '#F7DF1E', // JavaScript yellow
	},
	{
		name: 'Tailwind CSS',
		expertise: 90,
		category: 'Frontend',
		tags: ['Utility-first', 'Responsive', 'Design Systems'],
		yearsOfExperience: 4,
		projectCount: 17,
		brandColor: '#38B2AC',
	},
	{
		name: 'PHP',
		expertise: 95,
		category: 'Languages',
		tags: ['Laravel', 'Symfony', 'WordPress'],
		yearsOfExperience: 13,
		projectCount: 35,
		brandColor: '#777BB4', // PHP's official blue color
	},
	{
		name: 'Laravel',
		expertise: 90,
		category: 'Backend',
		tags: ['MVC', 'Eloquent', 'Blade'],
		yearsOfExperience: 7,
		projectCount: 15,
		brandColor: '#FF2D20', // Laravel's red
	},
	{
		name: 'Drizzle ORM',
		expertise: 86,
		category: 'Database',
		tags: ['Orchestration', 'Scaling', 'Helm'],
		yearsOfExperience: 2,
		projectCount: 6,
		brandColor: '#C5F74F', // Drizzle's lime green
	},
	{
		name: 'Liquid',
		expertise: 95,
		category: 'Templates',
		tags: ['Shopify', 'Jekyll', 'E-commerce'],
		yearsOfExperience: 3.5,
		projectCount: 5,
		brandColor: '#96BF48', // Shopify's green
	},
	{
		name: 'Blade',
		expertise: 72,
		category: 'Templates',
		tags: ['Shopify', 'Laravel', 'PHP'],
		yearsOfExperience: 2,
		projectCount: 2,
		brandColor: '#F05340',
	},
	{
		name: 'GDScript',
		expertise: 73,
		category: 'Languages',
		tags: ['Godot', '2D Games', '3D Games'],
		yearsOfExperience: 1,
		projectCount: 1,
		brandColor: '#478CBF',
	},
	{
		name: 'Redis',
		expertise: 71,
		category: 'Database',
		tags: ['Caching', 'Pub/Sub', 'Sessions'],
		yearsOfExperience: 1.5,
		projectCount: 2,
		brandColor: '#DC382D',
	},
	{
		name: 'Swift',
		expertise: 60,
		category: 'Languages',
		tags: ['iOS', 'SwiftUI', 'Combine'],
		yearsOfExperience: 1,
		projectCount: 2,
		brandColor: '#FA7343',
	},
]
