'use client'

import { misc, SocialPlatform, socialPlatforms } from '@/data/socials'
import { motion } from 'framer-motion'
import DiscordServer from './social-section/discord-server'
//import DonationInfo from './social-section/donation-info'
import SpotifyPlaylist from './social-section/spotify-playlist'

export default function SocialConnects() {
	return (
		<div className="grid divide-x divide-dashed divide-neutral-700/80 md:grid-cols-2">
			<div className="divide-y divide-dashed divide-neutral-700/80">
				{socialPlatforms.map((platform: SocialPlatform) => (
					<motion.a
						key={platform.name}
						href={platform.url}
						target="_blank"
						rel="noopener noreferrer"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className={`group relative flex items-center justify-between gap-3 self-start overflow-hidden p-6 transition-all duration-500`}>
						<div className="flex items-center gap-3">
							<platform.icon className="size-6 fill-current dark:text-neutral-400" />
							<span className="text-neutral-300">
								{platform.handle || platform.name}
							</span>
						</div>
						{platform.stats && platform.statLabel && (
							<div className="flex flex-col items-end">
								<span className="ml-2 text-xs text-neutral-500">
									{platform.statLabel}
								</span>
								<span className="text-2xl font-light text-neutral-300 tabular-nums">
									~{platform.stats}
								</span>
							</div>
						)}
					</motion.a>
				))}
			</div>
			<div className="grid divide-y divide-dashed divide-neutral-700/80">
				{misc.map(platform => (
					<motion.a
						key={platform.name}
						href={platform.url}
						target="_blank"
						rel="noopener noreferrer"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className={`group relative overflow-hidden p-6 transition-all duration-500`}>
						<div className="mb-4 flex items-center justify-between">
							<div className="flex items-center gap-3">
								<platform.icon className="size-6 fill-current dark:text-neutral-400" />
								{'handle' in platform ? (
									<span className="text-neutral-300">
										{platform.handle}
									</span>
								) : (
									<span className="text-neutral-300">
										{platform.name}
									</span>
								)}
							</div>
							{platform.stats && platform.statLabel && (
								<div className="flex flex-col items-end">
									<span className="ml-2 text-xs text-neutral-500">
										{platform.statLabel}
									</span>
									<span className="text-2xl font-light text-neutral-300 tabular-nums">
										~{platform.stats}
									</span>
								</div>
							)}
						</div>

						<div className="mt-6 space-y-4">
							{/*{'isDonation' in platform && <DonationInfo />}*/}

							{'serverInfo' in platform && <DiscordServer />}

							{'playlists' in platform && <SpotifyPlaylist />}
						</div>
					</motion.a>
				))}
			</div>
		</div>
	)
}
