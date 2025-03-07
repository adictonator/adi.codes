'use client'

import { SocialPlatform, socialPlatforms, spotifyData } from '@/data/socials'
import { motion } from 'framer-motion'
import SpotifyPlaylist from './social-section/spotify-playlist'
import DiscordInvite from './social-section/discord-invite'
import Discord from './social-icons/discord'
import Spotify from './social-icons/spotify'

export default function SocialConnects() {
	return (
		<div className="divide-border grid divide-x divide-dashed md:grid-cols-2">
			<div className="divide-border grid divide-y divide-dashed">
				{socialPlatforms.map((platform: SocialPlatform) => (
					<motion.a
						key={platform.name}
						href={platform.url}
						target="_blank"
						rel="noopener noreferrer"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className={`group/social hover:bg-secondary relative flex h-full items-center justify-between gap-3 self-start overflow-hidden bg-gradient-to-tr p-4 md:p-6`}>
						<div className="flex items-center gap-3">
							<platform.icon
								className={`text-muted size-6 fill-current duration-200 ${platform.color}`}
							/>
							<span className="text-primary">
								{platform.handle || platform.name}
							</span>
						</div>
						{platform.stats && platform.statLabel && (
							<div className="flex flex-col items-end">
								<span className="text-muted-foreground ml-2 text-xs">
									{platform.statLabel}
								</span>
								<span className="text-primary text-2xl font-light tabular-nums">
									~{platform.stats}
								</span>
							</div>
						)}
					</motion.a>
				))}
			</div>
			<div className="divide-border grid divide-y divide-dashed">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className={`group/social divide-border relative flex divide-x divide-dashed overflow-hidden transition-all duration-500`}>
					<div className="flex flex-1 items-center justify-between p-4 md:p-6">
						<div className="flex items-center gap-3">
							<Discord
								className={`text-muted size-6 fill-current duration-200 group-hover/social:text-indigo-400`}
							/>
							<span className="text-neutral-300">Discord</span>
						</div>
					</div>

					<div className="flex-1">
						<DiscordInvite />
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className={`group/social relative overflow-hidden transition-all duration-500`}>
					<div className="flex items-center justify-between p-6">
						<div className="flex items-center gap-3">
							<Spotify
								className={`text-muted size-6 fill-current duration-200 ${spotifyData.color}`}
							/>
							<span className="text-neutral-300">
								{spotifyData.name}
							</span>
						</div>
					</div>

					<div className="space-y-4">
						<SpotifyPlaylist
							playlists={spotifyData.playlists || []}
						/>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
