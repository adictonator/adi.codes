'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Play } from 'lucide-react'

type CreativeProject = {
	title: string
	description: string
	category:
		| 'Experiment'
		| 'Game'
		| 'Animation'
		| 'Interactive'
		| 'Visualization'
	tech: string[]
	preview?: string // image URL
	links: {
		demo?: string
		github?: string
		video?: string
	}
	status: 'Live' | 'In Progress' | 'Concept'
	featured?: boolean
}

const projects: CreativeProject[] = [
	{
		title: 'Particle Physics Simulator',
		description:
			'Interactive particle system with realistic physics using WebGL and Three.js',
		category: 'Interactive',
		tech: ['WebGL', 'Three.js', 'React Three Fiber'],
		preview: '/images/particle-sim.png',
		links: {
			demo: 'https://particles.demo.com',
			github: 'https://github.com/user/particles',
		},
		status: 'Live',
		featured: true,
	},
	{
		title: 'AI Music Visualizer',
		description: 'Real-time audio visualization powered by TensorFlow.js',
		category: 'Visualization',
		tech: ['TensorFlow.js', 'Web Audio API', 'Canvas'],
		links: {
			demo: 'https://music-viz.demo.com',
		},
		status: 'Live',
	},
	{
		title: '2D Platform Game',
		description: 'Retro-style platformer built with Godot Engine',
		category: 'Game',
		tech: ['GDScript', 'Godot', 'Pixel Art'],
		preview: '/images/game-preview.png',
		links: {
			demo: 'https://game.demo.com',
			video: 'https://youtube.com/watch?v=...',
		},
		status: 'In Progress',
	},
	// Add more creative projects...
]

export default function CreativeLab() {
	return (
		<div className="space-y-8">
			{/* Featured Project */}
			{projects
				.filter(p => p.featured)
				.map(project => (
					<motion.div
						key={project.title}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-800">
						{project.preview ? (
							<img
								src={project.preview}
								alt={project.title}
								className="h-full w-full object-cover"
							/>
						) : (
							<div className="flex h-full items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
								<span className="text-4xl">✨</span>
							</div>
						)}

						{/* Overlay */}
						<div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
							<div className="flex h-full flex-col justify-between">
								<div className="flex justify-between">
									<span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400">
										{project.category}
									</span>
									<span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
										{project.status}
									</span>
								</div>
								<div>
									<h3 className="text-2xl font-bold text-white">
										{project.title}
									</h3>
									<p className="mt-2 text-gray-400">
										{project.description}
									</p>

									<div className="mt-4 flex items-center gap-4">
										<div className="flex flex-wrap gap-2">
											{project.tech.map(tech => (
												<span
													key={tech}
													className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
													{tech}
												</span>
											))}
										</div>
										<div className="ml-auto flex gap-3">
											{project.links.demo && (
												<a
													href={project.links.demo}
													className="rounded-full bg-blue-500/20 p-2 text-blue-400 transition-colors hover:bg-blue-500/30">
													<Play className="h-4 w-4" />
												</a>
											)}
											{project.links.github && (
												<a
													href={project.links.github}
													className="rounded-full bg-white/5 p-2 text-white/60 transition-colors hover:bg-white/10">
													<Github className="h-4 w-4" />
												</a>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				))}

			{/* Grid of Other Projects */}
			<div className="grid grid-cols-2 gap-4">
				{projects
					.filter(p => !p.featured)
					.map(project => (
						<motion.div
							key={project.title}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							whileHover={{ y: -4 }}
							className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-900/50">
							<div className="p-4">
								<div className="mb-4 flex items-start justify-between">
									<span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-400">
										{project.category}
									</span>
									<span
										className={`rounded-full px-3 py-1 text-xs font-medium ${
											project.status === 'Live'
												? 'bg-green-500/20 text-green-400'
												: 'bg-yellow-500/20 text-yellow-400'
										}`}>
										{project.status}
									</span>
								</div>

								<h3 className="text-lg font-semibold text-white">
									{project.title}
								</h3>
								<p className="mt-1 text-sm text-gray-400">
									{project.description}
								</p>

								<div className="mt-4 flex flex-wrap gap-2">
									{project.tech.map(tech => (
										<span
											key={tech}
											className="rounded-full bg-white/5 px-2 py-1 text-xs text-white/60">
											{tech}
										</span>
									))}
								</div>

								<div className="mt-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
									{Object.entries(project.links).map(
										([type, url]) => (
											<a
												key={type}
												href={url}
												className="rounded-full bg-white/5 p-2 text-white/60 transition-colors hover:bg-white/10">
												{type === 'demo' && (
													<Play className="h-4 w-4" />
												)}
												{type === 'github' && (
													<Github className="h-4 w-4" />
												)}
												{type === 'video' && (
													<ExternalLink className="h-4 w-4" />
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
