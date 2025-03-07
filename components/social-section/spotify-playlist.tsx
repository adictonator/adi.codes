import { SpotifyPlaylistProps } from '@/data/socials'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function SpotifyPlaylist({
	playlists,
}: {
	playlists: SpotifyPlaylistProps[]
}) {
	return (
		<ul className="mb-3.5">
			{playlists.map((playlist, index) => (
				<motion.li
					key={index}
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: index * 0.1 }}
					className="group/item relative w-full text-left">
					<Link
						href={playlist.url}
						rel="noopener noreferrer"
						target="_blank"
						className="group/item hover:bg-secondary hover:border-border relative flex w-full items-start justify-between border-y border-dashed border-transparent px-6 py-4 transition-all duration-200">
						<div>
							<div className="text-sm text-neutral-300">
								{playlist.name}
							</div>
							<div className="mt-1 text-xs text-neutral-500">
								{playlist.tracks} tracks
							</div>
						</div>
						<div className="self-end text-xs text-neutral-500">
							{playlist.followers} followers
						</div>
						<ArrowUpRight
							className="text-primary absolute top-2.5 right-6 size-3.5 opacity-0 duration-300 group-hover/item:opacity-100"
							strokeWidth={1}
						/>
					</Link>
				</motion.li>
			))}
		</ul>
	)
}
