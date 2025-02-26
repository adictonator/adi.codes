import Discord from '@/components/social-icons/discord'
import Instagram from '@/components/social-icons/instagram'
import Spotify from '@/components/social-icons/spotify'
import Threads from '@/components/social-icons/threads'
import Twitter from '@/components/social-icons/twitter'
import YouTube from '@/components/social-icons/youtube'
import BuyMeCoffee from '@/components/social-icons/buy-me-coffee'
import PayPal from '@/components/social-icons/paypal'
import Patreon from '@/components/social-icons/patreon'
import Ko from '@/components/social-icons/ko-fi'
import { SVGProps } from 'react'

// Define a type for donation platforms
type DonationPlatform = {
	name: string
	icon: any
	url: string
	color: string
	isDonation: true
	description?: string
	stats?: string
	statLabel?: string
	tiers?: {
		name: string
		price: string
		benefits: string[]
	}[]
}

export type SocialPlatform = {
	name: string
	icon: any
	handle: string
	url: string
	color?: string
	stats: string
	statLabel: string
}

export const socialPlatforms = [
	{
		name: 'Threads',
		icon: Threads,
		handle: '@adictonator',
		stats: '100',
		statLabel: 'Thriends?',
		url: 'https://threads.net/@adictonator',
		color: 'group-hover:from-neutral-900 group-hover:to-neutral-600',
	},

	{
		name: 'Twitter',
		icon: Twitter,
		handle: '@adictonator',
		stats: '300',
		statLabel: 'Followers',
		url: 'https://twitter.com/@adictonator',
		color: 'group-hover:from-sky-500 group-hover:to-sky-600',
	},
	{
		name: 'YouTube',
		icon: YouTube,
		handle: '@lazycodelab',
		stats: '120',
		statLabel: 'Subscribers',
		url: 'https://youtube.com/@lcl',
		color: 'group-hover:from-red-600 group-hover:to-red-700',
	},
	{
		name: 'Instagram',
		icon: Instagram,
		handle: '@lazycodelab',
		stats: '200',
		statLabel: 'Followers',
		url: 'https://instagram.com/lazycodelab',
		color: 'group-hover:from-fuchsia-600 group-hover:to-orange-600',
	},
]

export const misc = [
	{
		name: 'Discord',
		icon: Discord,
		handle: '@yourusername',
		stats: '3.2K',
		statLabel: 'Members',
		url: 'https://discord.gg/yourinvite',
		color: 'group-hover:from-indigo-600 group-hover:to-indigo-700',
		serverInfo: {
			name: 'Dev Community',
			status: 'online',
			channels: [
				{ name: '💻 coding-help', members: 42 },
				{ name: '🎮 gaming', members: 28 },
				{ name: '🎵 music-corner', members: 15 },
			],
			activeMembers: 156,
			boostLevel: 2,
		},
	},
	//{
	//	name: 'Buy Me a Coffee',
	//	icon: BuyMeCoffee,
	//	url: 'https://www.buymeacoffee.com/yourusername',
	//	color: 'group-hover:from-yellow-500 group-hover:to-yellow-600',
	//	isDonation: true,
	//	description: 'Support my work with a coffee or two',
	//	stats: '52',
	//	statLabel: 'Coffees',
	//	recentSupporters: [
	//		{ name: 'Jane D.', amount: '$5', date: '2 days ago' },
	//		{ name: 'Mark T.', amount: '$10', date: '1 week ago' },
	//		{ name: 'Sarah L.', amount: '$3', date: '2 weeks ago' },
	//	],
	//},
	//{
	//	name: 'PayPal',
	//	icon: PayPal,
	//	url: 'https://paypal.me/yourusername',
	//	color: 'group-hover:from-blue-600 group-hover:to-blue-700',
	//	isDonation: true,
	//	description: 'One-time or recurring donations via PayPal',
	//},
	//{
	//	name: 'Patreon',
	//	icon: Patreon,
	//	url: 'https://patreon.com/yourusername',
	//	color: 'group-hover:from-orange-600 group-hover:to-orange-700',
	//	isDonation: true,
	//	stats: '18',
	//	statLabel: 'Patrons',
	//	description: 'Get exclusive content and support my work',
	//	tiers: [
	//		{
	//			name: 'Supporter',
	//			price: '$5/mo',
	//			benefits: ['Early access to content', 'Discord role'],
	//		},
	//		{
	//			name: 'Premium',
	//			price: '$15/mo',
	//			benefits: [
	//				'Source code access',
	//				'Monthly Q&A sessions',
	//				'Project voting rights',
	//			],
	//		},
	//	],
	//},
	//{
	//	name: 'Ko-fi',
	//	icon: Ko,
	//	url: 'https://ko-fi.com/yourusername',
	//	color: 'group-hover:from-sky-500 group-hover:to-sky-600',
	//	isDonation: true,
	//	description: 'Support me with a Ko-fi donation',
	//	stats: '34',
	//	statLabel: 'Donations',
	//},
	{
		name: 'Spotify',
		icon: Spotify,
		url: 'https://open.spotify.com/user/yourusername',
		color: 'group-hover:from-emerald-600 group-hover:to-emerald-700',
		playlists: [
			{ name: 'Coding Mode', followers: '2.3K', tracks: 42 },
			{
				name: 'Late Night Commits',
				followers: '1.8K',
				tracks: 35,
			},
		],
		nowPlaying: {
			track: 'Midnight Coding',
			artist: 'Lo-Fi Developers',
		},
	},
]
