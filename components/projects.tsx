'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Play, Lock } from 'lucide-react'
import { useState } from 'react'

type ProjectType = {
	title: string
	description: string
	type: 'Commercial' | 'Open Source' | 'Personal'
	category:
		| 'Web App'
		| 'Mobile App'
		| 'Desktop App'
		| 'Library'
		| 'API'
		| 'DevTool'
	tech: string[]
	preview?: string
	links: {
		live?: string
		github?: string
		demo?: string
	}
	metrics?: {
		users?: string
		stars?: number
		downloads?: string
	}
	client?: string
	year: number
	featured?: boolean
}

const projects: ProjectType[] = [
	{
		title: 'Enterprise Resource Planning System',
		description:
			'Full-stack ERP solution with real-time analytics, inventory management, and customer relationship tools',
		type: 'Commercial',
		category: 'Web App',
		tech: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS'],
		preview: '/images/erp-preview.png',
		links: {
			live: 'https://erp.client.com',
		},
		metrics: {
			users: '10,000+',
		},
		client: 'Fortune 500 Retail Company',
		year: 2023,
		featured: true,
	},
	{
		title: 'React State Management Library',
		description:
			'Lightweight state management solution with TypeScript support and zero dependencies',
		type: 'Open Source',
		category: 'Library',
		tech: ['TypeScript', 'React', 'Rollup'],
		links: {
			github: 'https://github.com/yourusername/state-lib',
			demo: 'https://state-lib-demo.vercel.app',
		},
		metrics: {
			stars: 2300,
			downloads: '50k/month',
		},
		year: 2023,
		featured: true,
	},
	{
		title: 'E-commerce Mobile App',
		description: 'Cross-platform mobile app with AR product visualization',
		type: 'Commercial',
		category: 'Mobile App',
		tech: ['React Native', 'GraphQL', 'AWS Amplify'],
		preview: '/images/ecom-preview.png',
		links: {
			live: 'https://apps.apple.com/app/id123',
		},
		client: 'Luxury Fashion Brand',
		year: 2022,
	},
	{
		title: 'E-commerce Analytics Dashboard',
		description:
			'Real-time analytics and reporting platform for online stores',
		type: 'Commercial',
		category: 'Web App',
		tech: ['Vue.js', 'D3.js', 'Firebase', 'Node.js'],
		preview: '/images/analytics-preview.png',
		links: { live: 'https://analytics.client.com' },
		client: 'E-commerce Solutions Inc.',
		year: 2022,
	},
	{
		title: 'Developer Productivity CLI',
		description: 'Command-line tool for automating development workflows',
		type: 'Open Source',
		category: 'DevTool',
		tech: ['Rust', 'CLI', 'GitHub API'],
		links: {
			github: 'https://github.com/yourusername/dev-cli',
			demo: 'https://asciinema.org/demo/dev-cli',
		},
		metrics: {
			stars: 850,
			downloads: '10k/month',
		},
		year: 2023,
	},
	{
		title: 'Real-time Collaboration Editor',
		description:
			'Monaco-based code editor with collaborative editing features',
		type: 'Personal',
		category: 'Web App',
		tech: ['WebSocket', 'Monaco Editor', 'Express'],
		links: {
			github: 'https://github.com/yourusername/collab-editor',
			demo: 'https://collab-editor.demo.com',
		},
		year: 2023,
	},
]

export default function Projects() {
	const [filter, setFilter] = useState<ProjectType['type'] | 'All'>('All')

	const filteredProjects = projects.filter(
		p => filter === 'All' || p.type === filter,
	)

	return (
		<div className="space-y-8">
			{/* Filter Tabs */}
			<div className="flex gap-2">
				{['All', 'Commercial', 'Open Source', 'Personal'].map(type => (
					<motion.button
						key={type}
						onClick={() =>
							setFilter(type as ProjectType['type'] | 'All')
						}
						whileHover={{ y: -2 }}
						whileTap={{ y: 0 }}
						className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
							filter === type
								? 'bg-blue-500/20 text-blue-400'
								: 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
						}`}>
						{type}
					</motion.button>
				))}
			</div>

			{/* Featured Projects */}
			<div className="grid gap-6 lg:grid-cols-2">
				{filteredProjects
					.filter(p => p.featured)
					.map(project => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50">
							{project.preview ? (
								<div className="aspect-video">
									<img
										src={project.preview}
										alt={project.title}
										className="h-full w-full object-cover"
									/>
								</div>
							) : (
								<div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900" />
							)}

							<div className="p-6">
								<div className="mb-4 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<span
											className={`rounded-full px-3 py-1 text-xs font-medium ${
												project.type === 'Commercial'
													? 'bg-purple-500/20 text-purple-400'
													: project.type ===
														  'Open Source'
														? 'bg-green-500/20 text-green-400'
														: 'bg-blue-500/20 text-blue-400'
											}`}>
											{project.type}
										</span>
										<span className="rounded-full bg-gray-800 px-3 py-1 text-xs text-gray-400">
											{project.category}
										</span>
									</div>
									{project.client && (
										<Lock className="h-4 w-4 text-gray-500" />
									)}
								</div>

								<h3 className="text-xl font-semibold text-white">
									{project.title}
								</h3>
								<p className="mt-2 text-gray-400">
									{project.description}
								</p>

								{project.metrics && (
									<div className="mt-4 flex gap-4 text-sm text-gray-400">
										{project.metrics.users && (
											<span>
												{project.metrics.users} Users
											</span>
										)}
										{project.metrics.stars && (
											<span>
												⭐ {project.metrics.stars}
											</span>
										)}
										{project.metrics.downloads && (
											<span>
												⬇️ {project.metrics.downloads}
											</span>
										)}
									</div>
								)}

								<div className="mt-4 flex flex-wrap gap-2">
									{project.tech.map(tech => (
										<span
											key={tech}
											className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
											{tech}
										</span>
									))}
								</div>

								<div className="mt-6 flex items-center justify-between">
									{project.client ? (
										<span className="text-sm text-gray-500">
											{project.client}
										</span>
									) : (
										<span className="text-sm text-gray-500">
											{project.year}
										</span>
									)}
									<div className="flex gap-2">
										{Object.entries(project.links).map(
											([type, url]) => (
												<a
													key={type}
													href={url}
													className="rounded-full bg-white/5 p-2 text-white/60 transition-colors hover:bg-white/10">
													{type === 'live' && (
														<ExternalLink className="h-4 w-4" />
													)}
													{type === 'github' && (
														<Github className="h-4 w-4" />
													)}
													{type === 'demo' && (
														<Play className="h-4 w-4" />
													)}
												</a>
											),
										)}
									</div>
								</div>
							</div>
						</motion.div>
					))}
			</div>

			{/* Other Projects Grid */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{filteredProjects
					.filter(p => !p.featured)
					.map(project => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							whileHover={{ y: -4 }}
							className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50 p-4">
							{/* Project Header */}
							<div className="mb-3 flex items-start justify-between">
								<div className="space-y-2">
									<div className="flex gap-2">
										<span
											className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
												project.type === 'Commercial'
													? 'bg-purple-500/20 text-purple-400'
													: project.type ===
														  'Open Source'
														? 'bg-green-500/20 text-green-400'
														: 'bg-blue-500/20 text-blue-400'
											}`}>
											{project.type}
										</span>
										<span className="rounded-full bg-gray-800 px-2.5 py-0.5 text-xs text-gray-400">
											{project.category}
										</span>
									</div>
									<h3 className="text-lg font-medium text-white">
										{project.title}
									</h3>
								</div>
								{project.client && (
									<Lock className="h-4 w-4 text-gray-500" />
								)}
							</div>

							{/* Project Description */}
							<p className="mb-4 text-sm text-gray-400">
								{project.description}
							</p>

							{/* Metrics (if available) */}
							{project.metrics && (
								<div className="mb-4 flex gap-3 text-xs text-gray-400">
									{project.metrics.users && (
										<span>
											{project.metrics.users} Users
										</span>
									)}
									{project.metrics.stars && (
										<span>⭐ {project.metrics.stars}</span>
									)}
									{project.metrics.downloads && (
										<span>
											⬇️ {project.metrics.downloads}
										</span>
									)}
								</div>
							)}

							{/* Tech Stack */}
							<div className="mb-4 flex flex-wrap gap-1.5">
								{project.tech.map(tech => (
									<span
										key={tech}
										className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-white/60">
										{tech}
									</span>
								))}
							</div>

							{/* Footer */}
							<div className="flex items-center justify-between">
								<span className="text-xs text-gray-500">
									{project.client ?? project.year}
								</span>
								<div className="flex gap-1.5">
									{Object.entries(project.links).map(
										([type, url]) => (
											<a
												key={type}
												href={url}
												className="rounded-full bg-white/5 p-1.5 text-white/60 transition-colors hover:bg-white/10"
												target="_blank"
												rel="noopener noreferrer">
												{type === 'live' && (
													<ExternalLink className="h-3.5 w-3.5" />
												)}
												{type === 'github' && (
													<Github className="h-3.5 w-3.5" />
												)}
												{type === 'demo' && (
													<Play className="h-3.5 w-3.5" />
												)}
											</a>
										),
									)}
								</div>
							</div>
						</motion.div>
					))}
			</div>
		</div>
	)
}
