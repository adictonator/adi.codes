'use client'

import { motion } from 'framer-motion'
import GitHubCalendar from 'react-github-calendar'
import {
	GitBranch,
	GitCommit,
	GitPullRequest,
	Star,
	GitFork,
	Code,
	GitMerge,
	MessageCircle,
	Timer,
} from 'lucide-react'
import { useState, useEffect } from 'react'

type GitHubStats = {
	totalContributions: number
	pullRequests: number
	commits: number
	stars: number
	repositories: number
	issuesOpened: number
	issuesClosed: number
	topLanguages: Array<{ name: string; percentage: number }>
	forksReceived: number
	averageResponseTime: string
	discussionsStarted: number
	mergeTimeAverage: string
	contributedRepos: number
}

type Activity = {
	type: 'commit' | 'pr' | 'issue' | 'discussion' | 'fork' | 'star'
	repo: string
	action: string
	timestamp: string
	url: string
}

const GITHUB_USERNAME = 'adictonator'

export default function GitHubActivity() {
	const [stats, setStats] = useState<GitHubStats | null>(null)
	const [recentActivity, setRecentActivity] = useState<Activity[]>([])

	useEffect(() => {
		// Fetch GitHub stats here using GitHub API
		// This is a placeholder - implement actual API call
		setStats({
			totalContributions: 2847,
			pullRequests: 156,
			commits: 1238,
			stars: 342,
			repositories: 45,
			issuesOpened: 50,
			issuesClosed: 45,
			topLanguages: [
				{ name: 'JavaScript', percentage: 40 },
				{ name: 'TypeScript', percentage: 30 },
				{ name: 'Python', percentage: 20 },
				{ name: 'HTML', percentage: 10 },
			],
			forksReceived: 20,
			averageResponseTime: '2 hours',
			discussionsStarted: 10,
			mergeTimeAverage: '3 hours',
			contributedRepos: 15,
		})
	}, [])

	const theme = {
		dark: [
			'rgba(51, 51, 51, 0.5)', // Level 0 (empty)
			'rgba(59, 130, 246, 0.2)', // Level 1
			'rgba(59, 130, 246, 0.4)', // Level 2
			'rgba(59, 130, 246, 0.6)', // Level 3
			'rgba(59, 130, 246, 0.8)', // Level 4
		],
	}

	return (
		<div className="space-y-8 font-mono">
			{/* Enhanced Stats Grid */}
			<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
				{stats &&
					[
						{
							label: 'Contributions',
							value: stats.totalContributions,
							icon: GitCommit,
							color: 'blue',
						},
						{
							label: 'Pull Requests',
							value: stats.pullRequests,
							icon: GitPullRequest,
							color: 'purple',
						},
						{
							label: 'Repository Stars',
							value: stats.stars,
							icon: Star,
							color: 'yellow',
						},
						{
							label: 'Repositories',
							value: stats.repositories,
							icon: GitBranch,
							color: 'green',
							subtitle: 'repositories',
						},
						{
							label: 'Contributed To',
							value: stats.contributedRepos,
							icon: GitBranch,
							color: 'purple',
							subtitle: 'repositories',
						},
						{
							label: 'Avg. Merge Time',
							value: stats.mergeTimeAverage,
							icon: Timer,
							color: 'blue',
							subtitle: 'hours',
						},
						{
							label: 'Issues Resolved',
							value: stats.issuesClosed,
							icon: GitMerge,
							color: 'green',
							subtitle: `${Math.round((stats.issuesClosed / (stats.issuesOpened || 1)) * 100)}% resolution rate`,
						},
						{
							label: 'Discussions',
							value: stats.discussionsStarted,
							icon: MessageCircle,
							color: 'yellow',
							subtitle: 'community engagements',
						},
					].map(({ label, value, icon: Icon, color, subtitle }) => (
						<motion.div
							key={label}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 p-4">
							{/* Background Number */}
							<div
								className={`absolute right-2 bottom-1 font-mono text-4xl font-medium tracking-tighter text-${color}-500/10 transition-opacity group-hover:text-${color}-500/20`}>
								{value}
							</div>
							<div className="relative space-y-2">
								<Icon className={`h-5 w-5 text-${color}-400`} />
								<div>
									<div className="text-2xl font-medium tracking-tight text-white tabular-nums">
										{typeof value === 'number'
											? value.toLocaleString()
											: value}
									</div>
									<div className="text-sm text-neutral-500">
										{label}
									</div>
									{subtitle && (
										<div className="mt-1 text-xs text-neutral-400">
											{subtitle}
										</div>
									)}
								</div>
							</div>
						</motion.div>
					))}
			</div>

			{/* Language Distribution */}
			<div className="rounded-lg border border-neutral-800 bg-neutral-950 p-6">
				<h3 className="mb-4 text-sm font-medium tracking-wider text-neutral-400 uppercase">
					Top Languages
				</h3>
				<div className="flex h-2 overflow-hidden rounded-full bg-neutral-900">
					{stats?.topLanguages.map(({ name, percentage }, index) => (
						<div
							key={name}
							className={`h-full transition-all duration-500 ${
								[
									'bg-blue-500',
									'bg-green-500',
									'bg-yellow-500',
									'bg-purple-500',
									'bg-red-500',
								][index]
							}`}
							style={{ width: `${percentage}%` }}
							title={`${name}: ${percentage}%`}
						/>
					))}
				</div>
				<div className="mt-2 flex flex-wrap gap-3">
					{stats?.topLanguages.map(({ name, percentage }, index) => (
						<div
							key={name}
							className="flex items-center gap-1.5 text-xs text-neutral-400">
							<span
								className={`h-2 w-2 rounded-full ${
									[
										'bg-blue-500',
										'bg-green-500',
										'bg-yellow-500',
										'bg-purple-500',
										'bg-red-500',
									][index]
								}`}
							/>
							{name}
							<span className="text-neutral-500">
								{percentage}%
							</span>
						</div>
					))}
				</div>
			</div>

			{/* Activity Timeline */}
			<div className="rounded-lg border border-neutral-800 bg-neutral-950 p-6">
				<h3 className="mb-4 text-sm font-medium tracking-wider text-neutral-400 uppercase">
					Recent Activity
				</h3>
				<div className="space-y-4">
					{recentActivity.map((activity, index) => (
						<motion.a
							key={index}
							href={activity.url}
							target="_blank"
							rel="noopener noreferrer"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.1 }}
							className="group flex items-start gap-3 rounded-lg border border-transparent p-2 hover:border-neutral-800 hover:bg-neutral-900">
							{/* Activity Icon */}
							<div
								className={`mt-1 rounded-full bg-${
									{
										commit: 'green',
										pr: 'purple',
										issue: 'red',
										discussion: 'blue',
										fork: 'yellow',
										star: 'orange',
									}[activity.type]
								}-500/10 p-2`}>
								{/* ... activity type icons ... */}
							</div>

							<div className="flex-1 text-sm">
								<p className="text-neutral-300">
									{activity.action}
								</p>
								<p className="text-neutral-500">
									{activity.repo}
								</p>
							</div>

							<time className="text-xs text-neutral-500 tabular-nums">
								{activity.timestamp}
							</time>
						</motion.a>
					))}
				</div>
			</div>

			{/* Contribution Calendar */}
			<div className="rounded-lg border border-neutral-800 bg-neutral-950 p-6">
				<h3 className="mb-4 text-sm font-medium tracking-wider text-neutral-400 uppercase">
					Contribution Activity
				</h3>
				<GitHubCalendar
					username={GITHUB_USERNAME}
					colorScheme="dark"
					blockSize={10}
					blockMargin={4}
					fontSize={12}
					theme={theme}
				/>
			</div>

			{/* Top Repositories */}
			<div className="grid gap-4 md:grid-cols-2">
				{[1, 2, 3, 4].map((_, i) => (
					<motion.a
						key={i}
						href="#"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: i * 0.1 }}
						className="group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 p-4 transition-colors hover:border-blue-500/30 hover:bg-neutral-900">
						<div className="flex items-center justify-between">
							<div>
								<h4 className="font-medium text-white">
									Repository Name
								</h4>
								<p className="text-sm text-neutral-500">
									Description here
								</p>
							</div>
							<div className="flex items-center gap-2">
								<Star className="h-4 w-4 text-yellow-400" />
								<span className="text-sm text-neutral-400">
									123
								</span>
							</div>
						</div>
					</motion.a>
				))}
			</div>
		</div>
	)
}
