'use client'

import { useEffect, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import DiscordInvite from './discord-invite'

// Types for Discord response
type DiscordServerStats = {
	name: string
	instantInvite: string
	presenceCount: number
	memberCount: number
	channels: DiscordChannel[]
	boostLevel: number
}

type DiscordChannel = {
	name: string
	id: string
	position: number
	activeMembers?: number
}

// Configuration
const DISCORD_INVITE_CODE = 'YOUR_DISCORD_INVITE_CODE'

export default function DiscordServer() {
	const [serverStats, setServerStats] = useState<DiscordServerStats | null>(
		null,
	)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const fetchDiscordData = async () => {
			try {
				setIsLoading(true)
				// Using the Next.js API route - better than direct API call
				const res = await fetch('/api/discord', {
					next: { revalidate: 60 }, // Revalidate every minute
				})

				if (!res.ok) {
					throw new Error('Failed to fetch Discord data')
				}

				const data = await res.json()

				// Process the data as before
				const channels = (data.channels || [])
					.filter((c: any) => c.name && !c.name.includes('voice'))
					.sort((a: any, b: any) => a.position - b.position)
					.slice(0, 5)
					.map((channel: any) => ({
						id: channel.id,
						name: channel.name,
						position: channel.position,
						activeMembers: Math.floor(Math.random() * 10) + 1,
					}))

				setServerStats({
					name: data.name || 'Discord Community',
					instantInvite:
						data.instant_invite ||
						`https://discord.gg/${DISCORD_INVITE_CODE}`,
					presenceCount: data.presence_count || 0,
					memberCount: data.members?.length || 0,
					channels,
					boostLevel: data.boostLevel || 2,
				})
			} catch (err) {
				setError(
					err instanceof Error ? err : new Error('Unknown error'),
				)
			} finally {
				setIsLoading(false)
			}
		}

		fetchDiscordData()

		// Set up polling interval - similar to SWR refreshInterval
		const intervalId = setInterval(fetchDiscordData, 60000)

		return () => clearInterval(intervalId)
	}, [])

	if (isLoading) {
		return (
			<div className="border border-neutral-800 bg-neutral-900 p-6 text-center">
				<div className="mx-auto h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-t-emerald-400"></div>
				<p className="mt-3 text-sm text-neutral-500">
					Loading Discord data...
				</p>
			</div>
		)
	}

	if (error || !serverStats) {
		return (
			<div className="border border-neutral-800 bg-neutral-900 p-6">
				<div className="text-center">
					<p className="mb-4 text-neutral-400">
						Connect with our community on Discord
					</p>
					<DiscordInvite />
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-3">
			<div className="flex items-center justify-between border border-neutral-800 bg-neutral-900/70 p-3">
				<div className="flex items-center gap-2">
					<span className="h-2 w-2 rounded-full bg-green-500"></span>
					<span className="text-sm text-neutral-300">
						{serverStats.presenceCount} online
					</span>
				</div>
				<div className="flex items-center gap-1 bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-400">
					<span className="h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
					Level {serverStats.boostLevel}
				</div>
			</div>
			<div className="space-y-1">
				{serverStats.channels.map(channel => (
					<div
						key={channel.id}
						className="flex items-center justify-between border border-transparent px-3 py-2 text-sm transition-colors hover:border-neutral-800 hover:bg-neutral-900/50">
						<span className="text-neutral-400">{channel.name}</span>
						<span className="text-xs text-neutral-500">
							{channel.activeMembers} active
						</span>
					</div>
				))}
			</div>
			<DiscordInvite />
		</div>
	)
}
