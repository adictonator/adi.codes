'use client'

import { motion } from 'framer-motion'
import {
	Github,
	Twitter,
	Linkedin,
	Youtube,
	Twitch,
	Instagram,
	Discord,
	Coffee,
	Music,
} from 'lucide-react'
import { useEffect, useState } from 'react'

type ActivityStatus = 'coding' | 'gaming' | 'listening' | 'offline'

const socialLinks = [
	{
		name: 'GitHub',
		icon: Github,
		url: 'https://github.com/yourusername',
		color: 'group-hover:text-neutral-100',
		stats: '500+ contributions',
		description: 'Open source contributions and personal projects',
		backgroundColor: 'hover:bg-neutral-800/50',
	},
	{
		name: 'Twitter',
		icon: Twitter,
		url: 'https://twitter.com/yourusername',
		color: 'group-hover:text-sky-400',
		stats: '2K+ followers',
		description: 'Tech thoughts and development updates',
		backgroundColor: 'hover:bg-sky-950/30',
	},
	{
		name: 'YouTube',
		icon: Youtube,
		url: 'https://youtube.com/@yourusername',
		color: 'group-hover:text-red-500',
		stats: '5K subscribers',
		description: 'Coding tutorials and tech reviews',
		backgroundColor: 'hover:bg-red-950/30',
	},
	{
		name: 'Twitch',
		icon: Twitch,
		url: 'https://twitch.tv/yourusername',
		color: 'group-hover:text-purple-400',
		stats: 'Live coding streams',
		description: 'Weekly coding sessions and game dev',
		backgroundColor: 'hover:bg-purple-950/30',
		isLive: true,
	},
	{
		name: 'Discord',
		icon: Discord,
		url: 'https://discord.gg/yourusername',
		color: 'group-hover:text-indigo-400',
		stats: '1K+ members',
		description: 'Join our developer community',
		backgroundColor: 'hover:bg-indigo-950/30',
	},
	{
		name: 'Buy Me a Coffee',
		icon: Coffee,
		url: 'https://buymeacoffee.com/yourusername',
		color: 'group-hover:text-yellow-400',
		description: 'Support my open source work',
		backgroundColor: 'hover:bg-yellow-950/30',
	},
]

const spotifyPlaylists = [
	{
		id: '37i9dQZF1DX8NTLI2TtZa6',
		name: 'Coding Mode',
		description: 'Deep focus for development sessions',
		tracks: 50,
		duration: '4hr 20min',
		followers: 245000,
		color: 'from-green-500/20 to-green-900/20',
	},
	{
		id: '37i9dQZF1DX5trt9i14X7j',
		name: 'Coding Nights',
		description: 'Late night programming beats',
		tracks: 75,
		duration: '6hr 15min',
		followers: 180000,
		color: 'from-blue-500/20 to-blue-900/20',
	},
]

export default function SocialConnects() {
	const [activityStatus, setActivityStatus] =
		useState<ActivityStatus>('offline')
	const [currentTrack, setCurrentTrack] = useState<string | null>(null)

	useEffect(() => {
		// Simulate real-time activity updates
		const activities: ActivityStatus[] = [
			'coding',
			'gaming',
			'listening',
			'offline',
		]
		const interval = setInterval(() => {
			setActivityStatus(
				activities[Math.floor(Math.random() * activities.length)],
			)
		}, 5000)

		return () => clearInterval(interval)
	}, [])

	return (
		<div className="space-y-8">
			{/* Activity Status */}
			<div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
				<div
					className={`h-2.5 w-2.5 rounded-full ${
						activityStatus === 'coding'
							? 'bg-green-500'
							: activityStatus === 'gaming'
								? 'bg-purple-500'
								: activityStatus === 'listening'
									? 'bg-blue-500'
									: 'bg-neutral-500'
					} animate-pulse`}
				/>
				<span className="text-sm text-neutral-400">
					{activityStatus === 'coding'
						? 'Currently coding'
						: activityStatus === 'gaming'
							? 'Playing games'
							: activityStatus === 'listening'
								? 'Listening to music'
								: 'Away'}
				</span>
			</div>

			{/* Social Links Grid */}
			<div className="grid gap-4 md:grid-cols-2">
				{socialLinks.map(social => (
					<motion.a
						key={social.name}
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						whileHover={{ y: -2 }}
						className={`group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all ${social.backgroundColor}`}>
						{/* Background Gradient */}
						<div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

						<div className="relative space-y-4">
							<div className="flex items-start justify-between">
								{/*<social.icon
									className={`h-6 w-6 transition-colors ${social.color}`}
								/>*/}
								{social.isLive && (
									<span className="animate-pulse rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
										LIVE
									</span>
								)}
							</div>

							<div>
								<h3 className="text-lg font-medium text-neutral-200">
									{social.name}
								</h3>
								<p className="mt-1 text-sm text-neutral-500">
									{social.description}
								</p>
							</div>

							{social.stats && (
								<p className="text-sm font-medium text-neutral-400">
									{social.stats}
								</p>
							)}
						</div>
					</motion.a>
				))}
			</div>

			{/* Spotify Integration */}
			<div className="space-y-4 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Music className="h-5 w-5 text-green-400" />
						<h2 className="text-lg font-medium text-neutral-200">
							Spotify Playlists
						</h2>
					</div>
					{currentTrack && (
						<div className="flex items-center gap-2 text-sm text-neutral-400">
							<span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
							Currently playing: {currentTrack}
						</div>
					)}
				</div>

				<div className="grid gap-4 md:grid-cols-2">
					{spotifyPlaylists.map(playlist => (
						<motion.a
							key={playlist.id}
							href={`https://open.spotify.com/playlist/${playlist.id}`}
							target="_blank"
							rel="noopener noreferrer"
							className="group relative overflow-hidden rounded-xl border border-neutral-800 p-6 transition-all hover:border-green-500/30"
							whileHover={{ scale: 1.02 }}>
							{/* Gradient Background */}
							<div
								className={`absolute inset-0 bg-gradient-to-br ${playlist.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
							/>

							<div className="relative space-y-4">
								<h3 className="text-lg font-medium text-neutral-200">
									{playlist.name}
								</h3>
								<p className="text-sm text-neutral-500">
									{playlist.description}
								</p>

								<div className="flex flex-wrap gap-4 text-sm text-neutral-400">
									<span>{playlist.tracks} tracks</span>
									<span>{playlist.duration}</span>
									<span>
										{playlist.followers.toLocaleString()}{' '}
										followers
									</span>
								</div>
							</div>
						</motion.a>
					))}
				</div>
			</div>
		</div>
	)
}
