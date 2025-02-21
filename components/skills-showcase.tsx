'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Heart } from 'lucide-react'
import { useState } from 'react'

type Skill = {
	name: string
	expertise: number // 0-100
	category: string
	tags: string[]
	yearsOfExperience: number
	lastUsed: string // 'Current' or date like '2023'
	projectCount: number // Number of projects completed
	highlight?: string // Special achievement or certification
	links?: {
		docs?: string // Documentation link
		github?: string // Related GitHub repos
		demo?: string // Live demo if applicable
	}
}

const skills: Skill[] = [
	{
		name: 'React & React Native',
		expertise: 95,
		category: 'Frontend',
		tags: ['Web', 'Mobile', 'UI/UX', 'Performance'],
		yearsOfExperience: 6,
		lastUsed: 'Current',
		projectCount: 32,
		highlight: 'Meta Certified React Developer',
		links: {
			github: 'https://github.com/yourusername/react-projects',
			demo: 'https://your-demo-site.com',
		},
	},
	{
		name: 'TypeScript',
		expertise: 90,
		category: 'Core',
		tags: ['Architecture', 'Systems Design', 'Type Safety'],
		yearsOfExperience: 5,
		lastUsed: 'Current',
		projectCount: 25,
	},
	{
		name: 'Node.js',
		expertise: 92,
		category: 'Backend',
		tags: ['API', 'Microservices', 'Real-time'],
		yearsOfExperience: 5,
		lastUsed: 'Current',
		projectCount: 20,
	},
	{
		name: 'Python',
		expertise: 88,
		category: 'Languages',
		tags: ['Django', 'FastAPI', 'Data Science'],
		yearsOfExperience: 7,
		lastUsed: '2023',
		projectCount: 15,
	},
	{
		name: 'PostgreSQL',
		expertise: 85,
		category: 'Database',
		tags: ['RDBMS', 'Performance Tuning', 'Indexing'],
		yearsOfExperience: 6,
		lastUsed: '2023',
		projectCount: 10,
	},
	{
		name: 'MongoDB',
		expertise: 87,
		category: 'Database',
		tags: ['NoSQL', 'Atlas', 'Aggregation'],
		yearsOfExperience: 5,
		lastUsed: '2023',
		projectCount: 12,
	},
	{
		name: 'AWS',
		expertise: 82,
		category: 'DevOps',
		tags: ['EC2', 'Lambda', 'S3', 'CloudFront'],
		yearsOfExperience: 4,
		lastUsed: '2023',
		projectCount: 8,
	},
	{
		name: 'Docker',
		expertise: 86,
		category: 'DevOps',
		tags: ['Containerization', 'Compose', 'Swarm'],
		yearsOfExperience: 5,
		lastUsed: '2023',
		projectCount: 10,
	},
	{
		name: 'GraphQL',
		expertise: 89,
		category: 'Backend',
		tags: ['API Design', 'Apollo', 'Federation'],
		yearsOfExperience: 4,
		lastUsed: '2023',
		projectCount: 7,
	},
	{
		name: 'Next.js',
		expertise: 94,
		category: 'Frontend',
		tags: ['SSR', 'Static Generation', 'Edge'],
		yearsOfExperience: 3,
		lastUsed: 'Current',
		projectCount: 5,
	},
	{
		name: 'PHP/Laravel',
		expertise: 83,
		category: 'Backend',
		tags: ['MVC', 'Eloquent', 'Blade'],
		yearsOfExperience: 6,
		lastUsed: '2023',
		projectCount: 15,
	},
	{
		name: 'Redis',
		expertise: 80,
		category: 'Database',
		tags: ['Caching', 'Pub/Sub', 'Sessions'],
		yearsOfExperience: 4,
		lastUsed: '2023',
		projectCount: 6,
	},
	{
		name: 'Kubernetes',
		expertise: 78,
		category: 'DevOps',
		tags: ['Orchestration', 'Scaling', 'Helm'],
		yearsOfExperience: 3,
		lastUsed: '2023',
		projectCount: 5,
	},
	{
		name: 'Rust',
		expertise: 75,
		category: 'Languages',
		tags: ['Systems', 'WebAssembly', 'CLI'],
		yearsOfExperience: 2,
		lastUsed: '2023',
		projectCount: 3,
	},
	{
		name: 'Vue.js',
		expertise: 85,
		category: 'Frontend',
		tags: ['Composition API', 'Vuex', 'Nuxt'],
		yearsOfExperience: 4,
		lastUsed: '2023',
		projectCount: 7,
	},
	{
		name: 'Liquid',
		expertise: 88,
		category: 'Templates',
		tags: ['Shopify', 'Jekyll', 'E-commerce'],
		yearsOfExperience: 5,
		lastUsed: '2023',
		projectCount: 10,
	},
	{
		name: 'GDScript',
		expertise: 82,
		category: 'Game Dev',
		tags: ['Godot', '2D Games', '3D Games'],
		yearsOfExperience: 3,
		lastUsed: '2023',
		projectCount: 5,
	},
]

export default function SkillsShowcase() {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
	)
	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)

	const springConfig = { damping: 25, stiffness: 150 }
	const x = useSpring(mouseX, springConfig)
	const y = useSpring(mouseY, springConfig)

	return (
		<div className="relative min-h-screen">
			{/* Category Pills */}
			<div className="flex gap-2 bg-black/20 p-2 backdrop-blur-md">
				{Array.from(new Set(skills.map(s => s.category))).map(
					category => (
						<motion.button
							key={category}
							whileTap={{ scale: 0.95 }}
							onClick={() =>
								setSelectedCategory(
									selectedCategory === category
										? null
										: category,
								)
							}
							className={`rounded-full px-4 py-2 text-sm font-light tracking-wider transition-colors duration-200 ${
								selectedCategory === category
									? 'bg-white/10 text-white'
									: 'text-white/60 hover:text-white/90'
							} `}>
							{category}
						</motion.button>
					),
				)}
			</div>

			{/* Premium Card Stack */}
			<div className="mt-6 grid grid-cols-1 divide-x divide-y divide-dashed divide-gray-800 md:grid-cols-2 lg:grid-cols-3">
				{skills
					.filter(
						skill =>
							!selectedCategory ||
							skill.category === selectedCategory,
					)
					.map((skill, index) => (
						<motion.div
							key={skill.name}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ delay: index * 0.1 }}
							onMouseMove={e => {
								const rect =
									e.currentTarget.getBoundingClientRect()
								mouseX.set(e.clientX - rect.left)
								mouseY.set(e.clientY - rect.top)
							}}
							className="group relative overflow-hidden bg-black/40 backdrop-blur-sm">
							{/* Gradient Background */}
							<div
								className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								style={{
									background: `radial-gradient(
                                        600px circle at ${x}px ${y}px,
                                        rgba(255,255,255,0.06),
                                        transparent 40%
                                    )`,
								}}
							/>

							<div className="relative flex h-full flex-col p-6">
								{/* Header Section */}
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<div className="flex items-center gap-3">
											<h3 className="font-display text-2xl font-light tracking-tight text-white/90">
												{skill.name}
											</h3>
											{skill.highlight && (
												<span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-medium text-yellow-300">
													Certified
												</span>
											)}
										</div>
										<div className="mt-2 flex items-center gap-3 text-sm font-light">
											<span className="text-white/40">
												{skill.category}
											</span>
											<span className="text-white/30">
												•
											</span>
											<span className="text-white/40">
												{skill.yearsOfExperience}y exp
											</span>
											<span className="text-white/30">
												•
											</span>
											<span className="text-white/40">
												{skill.projectCount} projects
											</span>
										</div>
									</div>

									<div className="ml-4 text-right">
										<span className="font-mono text-3xl font-light tracking-tighter text-white/90">
											{skill.expertise}
										</span>
										<span className="font-light text-white/40">
											%
										</span>
									</div>
								</div>

								{/* Middle Section - Tags */}
								<div className="mt-4 flex flex-wrap gap-2">
									{skill.tags.map(tag => (
										<span
											key={tag}
											className="rounded-full bg-white/5 px-3 py-1 text-xs font-light tracking-wider text-white/60">
											{tag}
										</span>
									))}
									{skill.lastUsed === 'Current' && (
										<span className="flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-light text-green-400">
											<span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
											Active
										</span>
									)}
								</div>

								{/* Bottom Section */}
								<div className="mt-auto pt-6">
									<div className="flex items-center justify-between">
										{/* Quick links */}
										{skill.links && (
											<div className="flex gap-2">
												{skill.links.github && (
													<a
														href={
															skill.links.github
														}
														className="text-white/40 hover:text-white/90">
														<Heart className="h-5 w-5" />
													</a>
												)}
												{skill.links.demo && (
													<a
														href={skill.links.demo}
														className="text-white/40 hover:text-white/90">
														<ExternalLink className="h-5 w-5" />
													</a>
												)}
											</div>
										)}
									</div>

									{/* Expertise Bar */}
									<div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-gray-800">
										<motion.div
											initial={{ width: 0 }}
											animate={{
												width: `${skill.expertise}%`,
											}}
											transition={{
												duration: 1,
												ease: [0.32, 0.72, 0, 1],
											}}
											className="h-full bg-gradient-to-r from-white/20 to-white/40"
										/>
									</div>
								</div>
							</div>
						</motion.div>
					))}
			</div>
		</div>
	)
}
