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
import LinkedIn from '@/components/social-icons/linked-in'

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
		color: 'group-hover/social:text-neutral-600',
	},

	{
		name: 'Twitter',
		icon: Twitter,
		handle: '@adictonator',
		stats: '300',
		statLabel: 'Followers',
		url: 'https://twitter.com/@adictonator',
		color: 'group-hover/social:text-neutral-600',
	},
	{
		name: 'LinkedIn',
		icon: LinkedIn,
		handle: '-abs-',
		stats: '350',
		statLabel: 'Connections',
		url: 'https://linkedin.com/in/-abs-',
		color: 'group-hover/social:text-sky-600',
	},
	{
		name: 'YouTube',
		icon: YouTube,
		handle: '@lazycodelab',
		stats: '120',
		statLabel: 'Subscribers',
		url: 'https://youtube.com/@lcl',
		color: 'group-hover/social:text-red-700',
	},
	{
		name: 'Instagram',
		icon: Instagram,
		handle: '@lazycodelab',
		stats: '200',
		statLabel: 'Followers',
		url: 'https://instagram.com/lazycodelab',
		color: 'group-hover/social:text-fuchsia-600',
	},
]

export interface SpotifyPlaylistProps {
	name: string
	url: string
	tracks: string
	followers: number
}

//export interface SpotifyPlaylist {
//	name: string
//	url: string
//	tracks: string
//	followers: number
//}

//export interface SpotifyPlaylistProps {
//	playlists: SpotifyPlaylist[]
//}

export const misc = [
	{
		name: 'Discord',
		icon: Discord,
		handle: '@yourusername',
		stats: '3',
		statLabel: 'Members',
		color: 'group-group-hover/social:from-indigo-600 group-group-hover/social:to-indigo-700',
	},
	//{
	//	name: 'Buy Me a Coffee',
	//	icon: BuyMeCoffee,
	//	url: 'https://www.buymeacoffee.com/yourusername',
	//	color: 'group-group-hover/social:from-yellow-500 group-group-hover/social:to-yellow-600',
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
	//	color: 'group-group-hover/social:from-blue-600 group-group-hover/social:to-blue-700',
	//	isDonation: true,
	//	description: 'One-time or recurring donations via PayPal',
	//},
	//{
	//	name: 'Patreon',
	//	icon: Patreon,
	//	url: 'https://patreon.com/yourusername',
	//	color: 'group-group-hover/social:from-orange-600 group-group-hover/social:to-orange-700',
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
	//	color: 'group-group-hover/social:from-sky-500 group-group-hover/social:to-sky-600',
	//	isDonation: true,
	//	description: 'Support me with a Ko-fi donation',
	//	stats: '34',
	//	statLabel: 'Donations',
	//},
	{
		name: 'Spotify',
		icon: Spotify,
		url: 'https://open.spotify.com/user/lvkvexq7bztp62prc1w1j2gn7',
		color: 'group-hover/social:text-emerald-600',
		playlists: [
			{
				name: 'stabilizers',
				followers: 3,
				tracks: '250+',
				url: 'https://open.spotify.com/playlist/0bqEPoeBZsdUtejKYqSXl0?si=af2bb77a39c049f1',
			},
			{
				name: 'the end',
				followers: 10,
				tracks: '150+',
				url: 'https://open.spotify.com/playlist/4KMuon88haDvsEoxNCtGGy?si=f9a4e12faa694717',
			},
			{
				name: 'yearning',
				followers: 4,
				tracks: '150+',
				url: 'https://open.spotify.com/playlist/3mClFbeKwcIhqhGuy3PMsj?si=86b1441f5b5144c0',
			},
			{
				name: 'bollytalgia',
				followers: 1,
				tracks: '100+',
				url: 'https://open.spotify.com/playlist/0NZIL7tcSPaSqScxt3mDVo?si=049c3eedd6c646c7',
			},
		] as SpotifyPlaylistProps[],
	},
]
