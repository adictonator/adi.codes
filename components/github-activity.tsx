'use client'

import { motion, AnimatePresence } from 'framer-motion'
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
	Terminal,
	Github,
	ArrowUpRight,
	CheckCircle2,
	X,
	ChevronRight,
	HardDriveDownload,
	Hash,
	Zap,
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
	streakDays: number
	contributionsByDay: {
		day: string
		count: number
	}[]
	recentEvents: {
		type: 'commit' | 'pr' | 'issue' | 'release' | 'fork' | 'star'
		repo: string
		message: string
		sha?: string
		date: string
	}[]
}

const GITHUB_USERNAME = 'adictonator'

export default function GitHubActivity() {
	const [stats, setStats] = useState<GitHubStats | null>(null)
	const [currentView, setCurrentView] = useState<
		'overview' | 'calendar' | 'languages' | 'activity'
	>('overview')
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Simulate API loading
		const timer = setTimeout(() => {
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
					{ name: 'Python', percentage: 15 },
					{ name: 'CSS', percentage: 10 },
					{ name: 'HTML', percentage: 5 },
				],
				forksReceived: 20,
				averageResponseTime: '2 hours',
				discussionsStarted: 10,
				mergeTimeAverage: '3 hours',
				contributedRepos: 15,
				streakDays: 42,
				contributionsByDay: [
					{ day: 'Monday', count: 125 },
					{ day: 'Tuesday', count: 165 },
					{ day: 'Wednesday', count: 234 },
					{ day: 'Thursday', count: 189 },
					{ day: 'Friday', count: 142 },
					{ day: 'Saturday', count: 76 },
					{ day: 'Sunday', count: 52 },
				],
				recentEvents: [
					{
						type: 'commit',
						repo: 'hstl.pro',
						message: 'Update GitHub activity component with new UI',
						sha: '8c4f5a7',
						date: '2023-06-15',
					},
					{
						type: 'pr',
						repo: 'next.js',
						message: 'Fix edge case in routing algorithm',
						date: '2023-06-12',
					},
					{
						type: 'issue',
						repo: 'tailwindcss',
						message: 'Propose new animation utilities',
						date: '2023-06-10',
					},
					{
						type: 'release',
						repo: 'my-library',
						message: 'v2.3.0: Add new features and fix bugs',
						date: '2023-06-08',
					},
					{
						type: 'fork',
						repo: 'framer-motion',
						message: 'Forked for custom animation implementation',
						date: '2023-06-05',
					},
				],
			})
			setIsLoading(false)
		}, 1000)

		return () => clearTimeout(timer)
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

	const renderEventIcon = (type: string) => {
		switch (type) {
			case 'commit':
				return <GitCommit className="h-4 w-4 text-emerald-500" />
			case 'pr':
				return <GitPullRequest className="h-4 w-4 text-purple-500" />
			case 'issue':
				return <MessageCircle className="h-4 w-4 text-amber-500" />
			case 'release':
				return <HardDriveDownload className="h-4 w-4 text-blue-500" />
			case 'fork':
				return <GitFork className="h-4 w-4 text-cyan-500" />
			default:
				return <Star className="h-4 w-4 text-yellow-500" />
		}
	}

	const renderLanguageBar = () => {
		if (!stats) return null

		return (
			<div className="space-y-8">
				<div className="flex-1 space-y-4">
					<div className="flex h-2 overflow-hidden rounded-full bg-neutral-900">
						{stats.topLanguages.map(
							({ name, percentage }, index) => (
								<div
									key={name}
									className="h-full transition-all duration-500"
									style={{
										width: `${percentage}%`,
										backgroundColor: getLanguageColor(name),
									}}
									title={`${name}: ${percentage}%`}
								/>
							),
						)}
					</div>

					<div className="grid grid-cols-2 gap-4 md:grid-cols-5">
						{stats.topLanguages.map(
							({ name, percentage }, index) => (
								<motion.div
									key={name}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: index * 0.1 }}
									className="border border-neutral-800 bg-neutral-900/30 p-3">
									<div className="flex items-center gap-2">
										<span
											className="h-3 w-3 rounded-full"
											style={{
												backgroundColor:
													getLanguageColor(name),
											}}
										/>
										<span className="text-sm text-neutral-300">
											{name}
										</span>
									</div>
									<div className="mt-2 font-mono text-xl text-neutral-400">
										{percentage}%
									</div>
								</motion.div>
							),
						)}
					</div>
				</div>

				{/* Language metrics */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="border border-dashed border-neutral-800 bg-neutral-900/20 p-4">
						<div className="mb-2 text-xs text-neutral-500">
							Most productive in
						</div>
						<div className="font-mono text-lg text-blue-400">
							{stats.topLanguages[0].name}
						</div>
					</div>

					<div className="border border-dashed border-neutral-800 bg-neutral-900/20 p-4">
						<div className="mb-2 text-xs text-neutral-500">
							Language diversity
						</div>
						<div className="font-mono text-lg text-purple-400">
							{stats.topLanguages.length} languages
						</div>
					</div>

					<div className="border border-dashed border-neutral-800 bg-neutral-900/20 p-4">
						<div className="mb-2 text-xs text-neutral-500">
							Code balance
						</div>
						<div className="font-mono text-lg text-emerald-400">
							{stats.topLanguages[0].percentage < 60
								? 'Diversified'
								: 'Specialized'}
						</div>
					</div>
				</div>
			</div>
		)
	}

	const renderActivity = () => {
		if (!stats) return null

		return (
			<div className="space-y-2">
				{stats.recentEvents.map((event, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ delay: index * 0.1 }}
						className="group flex items-start gap-3 border-l-2 border-neutral-800 bg-neutral-900/20 p-3 transition-colors hover:border-blue-500 hover:bg-neutral-900/40">
						<div className="mt-1 rounded-md border border-neutral-800 bg-neutral-900 p-1">
							{renderEventIcon(event.type)}
						</div>

						<div className="flex-1">
							<div className="flex items-center gap-2">
								<span className="text-xs text-neutral-500">
									{event.repo}
								</span>
								<span className="text-xs text-neutral-600">
									•
								</span>
								<span className="text-xs text-neutral-500">
									{new Date(event.date).toLocaleDateString(
										'en-US',
										{
											month: 'short',
											day: 'numeric',
										},
									)}
								</span>
							</div>

							<div className="mt-1 flex items-baseline gap-2">
								<span className="text-sm text-neutral-300">
									{event.message}
								</span>
								{event.sha && (
									<span className="text-xs text-neutral-500">
										({event.sha})
									</span>
								)}
							</div>
						</div>

						<div className="opacity-0 transition-opacity group-hover:opacity-100">
							<ArrowUpRight className="h-3 w-3 text-neutral-400" />
						</div>
					</motion.div>
				))}

				<div className="mt-4 flex justify-center">
					<a
						href={`https://github.com/${GITHUB_USERNAME}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 text-xs text-neutral-500 hover:text-neutral-300">
						<span>View all activity</span>
						<ArrowUpRight className="h-3 w-3" />
					</a>
				</div>
			</div>
		)
	}

	const getLanguageColor = (name: string): string => {
		const colors: Record<string, string> = {
			JavaScript: '#f1e05a',
			TypeScript: '#3178c6',
			Python: '#3572A5',
			CSS: '#563d7c',
			HTML: '#e34c26',
			Java: '#b07219',
			Rust: '#dea584',
			Go: '#00ADD8',
			Ruby: '#701516',
			PHP: '#4F5D95',
		}

		return colors[name] || '#6e7681'
	}

	const renderContributionChart = () => {
		if (!stats) return null

		const maxCount = Math.max(
			...stats.contributionsByDay.map(day => day.count),
		)

		return (
			<div className="space-y-6">
				<div className="grid grid-cols-7 gap-1">
					{stats.contributionsByDay.map((day, i) => (
						<div key={i} className="space-y-2">
							<div className="h-20 w-full overflow-hidden rounded-sm bg-neutral-900">
								<div
									className="h-full w-full bg-blue-500/60 transition-all duration-500 hover:bg-blue-500/80"
									style={{
										height: `${(day.count / maxCount) * 100}%`,
										transformOrigin: 'bottom',
									}}
								/>
							</div>
							<div className="text-center text-xs text-neutral-500">
								{day.day.substring(0, 3)}
							</div>
						</div>
					))}
				</div>

				{/* Additional contribution stats */}
				<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
					<div className="border border-dashed border-neutral-800 bg-neutral-900/20 p-4">
						<div className="mb-2 text-xs text-neutral-500">
							Most active day
						</div>
						<div className="font-mono text-lg text-blue-400">
							{
								stats.contributionsByDay.reduce((max, day) =>
									day.count > max.count ? day : max,
								).day
							}
						</div>
					</div>

					<div className="border border-dashed border-neutral-800 bg-neutral-900/20 p-4">
						<div className="mb-2 text-xs text-neutral-500">
							Current streak
						</div>
						<div className="font-mono text-lg text-emerald-400">
							{stats.streakDays} days
						</div>
					</div>

					<div className="border border-dashed border-neutral-800 bg-neutral-900/20 p-4">
						<div className="mb-2 text-xs text-neutral-500">
							Weekly average
						</div>
						<div className="font-mono text-lg text-amber-400">
							{Math.round(
								stats.contributionsByDay.reduce(
									(sum, day) => sum + day.count,
									0,
								) / 7,
							)}{' '}
							commits
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-8">
			{/* Terminal-inspired header */}
			<div className="border-b border-neutral-800 pb-4">
				<div className="mb-2 flex items-center gap-2 font-mono">
					<Terminal className="h-4 w-4 text-emerald-500" />
					<span className="text-sm text-neutral-400">
						github@{GITHUB_USERNAME}
					</span>
					<span className="text-sm text-neutral-600">~/activity</span>
					<span className="h-3 w-2 animate-pulse bg-emerald-500" />
				</div>

				<div className="grid grid-cols-1 gap-3 md:grid-cols-3">
					<a
						href={`https://github.com/${GITHUB_USERNAME}`}
						target="_blank"
						rel="noopener noreferrer"
						className="group flex items-center justify-between border border-neutral-800 bg-neutral-900/30 p-3 transition-all duration-300 hover:translate-y-[-2px] hover:transform-gpu hover:border-neutral-700 hover:bg-neutral-900/50">
						<div className="flex items-center gap-3">
							<Github className="h-5 w-5 text-neutral-500" />
							<span className="text-sm text-neutral-300">
								Profile
							</span>
						</div>
						<ArrowUpRight className="h-4 w-4 text-neutral-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-300" />
					</a>

					<div className="flex items-center justify-between border border-neutral-800 bg-neutral-900/30 p-3">
						<div className="flex items-center gap-3">
							<GitFork className="h-5 w-5 text-neutral-500" />
							<span className="text-sm text-neutral-300">
								Repositories
							</span>
						</div>
						<span className="font-mono text-emerald-400">
							{stats?.repositories || '-'}
						</span>
					</div>

					<div className="flex items-center justify-between border border-neutral-800 bg-neutral-900/30 p-3">
						<div className="flex items-center gap-3">
							<GitCommit className="h-5 w-5 text-neutral-500" />
							<span className="text-sm text-neutral-300">
								Contributions
							</span>
						</div>
						<span className="font-mono text-emerald-400">
							{stats?.totalContributions.toLocaleString() || '-'}
						</span>
					</div>
				</div>
			</div>

			{/* View selector */}
			<div className="flex border-b border-neutral-800 font-mono">
				{[
					{ id: 'overview', label: 'Overview', icon: Code },
					{ id: 'calendar', label: 'Contribution', icon: Hash },
					{ id: 'languages', label: 'Languages', icon: Code },
					{ id: 'activity', label: 'Recent', icon: Zap },
				].map(view => (
					<button
						key={view.id}
						onClick={() => setCurrentView(view.id as any)}
						className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
							currentView === view.id
								? 'border-b-2 border-blue-500 text-blue-400'
								: 'text-neutral-500 hover:text-neutral-300'
						}`}>
						<view.icon className="h-3.5 w-3.5" />
						{view.label}
					</button>
				))}
			</div>

			{/* Loading state */}
			{isLoading ? (
				<div className="flex h-64 items-center justify-center">
					<div className="flex flex-col items-center">
						<div className="h-6 w-6 animate-spin rounded-full border-2 border-t-blue-500 border-r-transparent border-b-blue-500 border-l-transparent"></div>
						<p className="mt-4 text-sm text-neutral-500">
							Loading GitHub data...
						</p>
					</div>
				</div>
			) : (
				<AnimatePresence mode="wait">
					<motion.div
						key={currentView}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.2 }}>
						{/* Conditional view rendering */}
						{currentView === 'overview' && (
							<div className="space-y-8">
								{/* Key metrics */}
								<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
									{[
										{
											label: 'Repositories',
											value: stats?.repositories,
											icon: GitFork,
											color: 'emerald',
											detail: `${stats?.forksReceived} forks received`,
										},
										{
											label: 'Pull Requests',
											value: stats?.pullRequests,
											icon: GitPullRequest,
											color: 'purple',
											detail: `${stats?.mergeTimeAverage} avg. merge time`,
										},
										{
											label: 'Issues',
											value: stats?.issuesOpened,
											icon: MessageCircle,
											color: 'amber',
											detail: `${stats?.issuesClosed} closed (${Math.round(
												(stats?.issuesClosed /
													(stats?.issuesOpened ||
														1)) *
													100,
											)}%)`,
										},
										{
											label: 'Stars Received',
											value: stats?.stars,
											icon: Star,
											color: 'yellow',
											detail: `Across ${stats?.contributedRepos} projects`,
										},
									].map((stat, index) => (
										<motion.div
											key={stat.label}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.1 }}
											className="flex flex-col justify-between border border-dashed border-neutral-800 bg-neutral-900/30 p-4 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/50">
											<div className="flex items-center justify-between">
												<stat.icon
													className={`h-4 w-4 text-${stat.color}-500`}
												/>
												<span className="font-mono text-2xl text-neutral-300">
													{stat.value?.toLocaleString() ||
														'-'}
												</span>
											</div>
											<div className="mt-3 space-y-1">
												<div className="text-sm text-neutral-400">
													{stat.label}
												</div>
												<div className="text-xs text-neutral-500">
													{stat.detail}
												</div>
											</div>
										</motion.div>
									))}
								</div>

								{/* Mini calendar */}
								<div className="border border-dashed border-neutral-800 bg-neutral-900/20 p-4">
									<div className="flex items-center justify-between">
										<h3 className="mb-4 text-sm font-medium text-neutral-400">
											Contribution Activity
										</h3>
										<div className="flex items-center gap-2 text-xs text-neutral-500">
											<span className="flex h-2 w-2 items-center rounded-full bg-neutral-700"></span>
											Less
											<span className="flex h-2 w-2 items-center rounded-full bg-blue-500/20"></span>
											<span className="flex h-2 w-2 items-center rounded-full bg-blue-500/40"></span>
											<span className="flex h-2 w-2 items-center rounded-full bg-blue-500/60"></span>
											<span className="flex h-2 w-2 items-center rounded-full bg-blue-500/80"></span>
											More
										</div>
									</div>
									<div className="overflow-x-auto py-2">
										<GitHubCalendar
											username={GITHUB_USERNAME}
											colorScheme="dark"
											blockSize={12}
											blockMargin={4}
											fontSize={12}
											theme={theme}
										/>
									</div>
								</div>

								{/* Recent Activity */}
								<div className="border border-dashed border-neutral-800 bg-neutral-900/20 p-4">
									<h3 className="mb-4 text-sm font-medium text-neutral-400">
										Recent Activity
									</h3>
									<div className="space-y-2">
										{stats?.recentEvents
											.slice(0, 3)
											.map((event, index) => (
												<motion.div
													key={index}
													initial={{
														opacity: 0,
														x: -10,
													}}
													animate={{
														opacity: 1,
														x: 0,
													}}
													transition={{
														delay: index * 0.1,
													}}
													className="group flex items-center gap-3 border-l-2 border-neutral-800 bg-neutral-900/30 px-3 py-2 transition-colors hover:border-blue-500">
													<div className="rounded-md border border-neutral-800 bg-neutral-900 p-1">
														{renderEventIcon(
															event.type,
														)}
													</div>
													<div className="flex-1">
														<div className="flex items-center gap-2">
															<span className="text-sm text-neutral-300">
																{event.message}
															</span>
															<span className="text-xs text-neutral-500">
																{event.repo}
															</span>
														</div>
													</div>
												</motion.div>
											))}
									</div>
								</div>
							</div>
						)}

						{currentView === 'calendar' &&
							renderContributionChart()}
						{currentView === 'languages' && renderLanguageBar()}
						{currentView === 'activity' && renderActivity()}
					</motion.div>
				</AnimatePresence>
			)}
		</div>
	)
}
