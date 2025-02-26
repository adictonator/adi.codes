export default function SpotifyPlaylist() {
	return (
		<div className="space-y-2">
			{platform.playlists.map(playlist => (
				<div
					key={playlist.name}
					className="flex justify-between border border-neutral-800 bg-neutral-900 p-4">
					<div>
						<div className="text-sm text-neutral-300">
							{playlist.name}
						</div>
						<div className="mt-1 text-xs text-neutral-500">
							{playlist.tracks} tracks
						</div>
					</div>
					<div className="text-xs text-neutral-500">
						{playlist.followers} followers
					</div>
				</div>
			))}
		</div>
	)
}
