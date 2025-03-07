import { NextResponse } from 'next/server'

// Your server configuration
const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN // Optional: for more detailed data

export async function GET() {
	try {
		// Using the public widget endpoint (server must have widget enabled)
		const response = await fetch(
			`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`,
			{ next: { revalidate: 60 } }, // Cache for 60 seconds
		)

		if (!response.ok) {
			// If widget is not available, return fallback data
			return NextResponse.json({
				name: 'My Discord Community',
				presence_count: 25,
				members: Array(25)
					.fill(0)
					.map((_, i) => ({ id: i })),
				channels: [
					{ id: '1', name: '💻 coding-help', position: 1 },
					{ id: '2', name: '🎮 gaming', position: 2 },
					{ id: '3', name: '🎵 music-corner', position: 3 },
					{ id: '4', name: '💬 general', position: 4 },
					{ id: '5', name: '📢 announcements', position: 5 },
				],
				boostLevel: 2,
			})
		}

		const data = await response.json()

		// Add any additional data or transformations here
		return NextResponse.json({
			...data,
			boostLevel: 2, // This isn't in the widget data so we add it
		})
	} catch (error) {
		console.error('Error fetching Discord data:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch Discord server data' },
			{ status: 500 },
		)
	}
}
