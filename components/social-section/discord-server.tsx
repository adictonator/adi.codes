export default function DiscordServer() {
	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between border border-neutral-800 bg-neutral-900 p-3">
				<div className="flex items-center gap-2">
					<span className="h-2 w-2 rounded-full bg-green-500"></span>
					<span className="text-sm text-neutral-300">
						{platform.serverInfo.activeMembers} online
					</span>
				</div>
				<div className="flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-400">
					<span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
					Level {platform.serverInfo.boostLevel}
				</div>
			</div>

			<div className="space-y-1">
				{platform.serverInfo.channels.map((channel, i) => (
					<div
						key={channel.name}
						className="flex items-center justify-between border border-transparent px-3 py-2 text-sm transition-colors hover:border-neutral-800 hover:bg-neutral-900/50">
						<span className="text-neutral-400">{channel.name}</span>
						<span className="text-xs text-neutral-500">
							{channel.members} active
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
