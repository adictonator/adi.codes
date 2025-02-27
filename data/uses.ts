export type SetupItem = {
	name: string
	description?: string
	image?: string
	affiliateLink?: string
	category: 'Hardware' | 'Development' | 'Productivity'
}

export const setup: SetupItem[] = [
	{
		name: 'Mac Mini M4 2024',
		description: '24GB RAM, 500GB SSD - Primary development machine',
		category: 'Hardware',
		image: '/assets/images/me.png',
		affiliateLink: 'https://amazon.com/...',
	},
	{
		name: 'MacBook Pro 16" 2019 Intel',
		description: '64GB RAM, 2TB SSD - Secondary development machine',
		category: 'Hardware',
		image: '/assets/images/me.png',
		affiliateLink: 'https://amazon.com/...',
	},
	{
		name: 'Acer XV2720',
		description: '27" 2K Monitor',
		category: 'Hardware',
		affiliateLink:
			'https://www.dell.com/en-us/shop/dell-ultrasharp-27-4k-usb-c-monitor-u2720q/apd/210-avjv/monitors-monitor-accessories',
	},
	{
		name: 'Keychron K3',
		description: 'Low Profile Mechanical Keyboard - Brown switches',
		category: 'Hardware',
		affiliateLink:
			'https://www.keychron.com/products/keychron-k3-wireless-mechanical-keyboard',
	},
	{
		name: 'Keychron K3',
		description: 'Low Profile Mechanical Keyboard - Brown switches',
		category: 'Hardware',
	},
	{
		name: 'Keychron K3',
		description: 'Low Profile Mechanical Keyboard - Brown switches',
		category: 'Hardware',
	},
	{
		name: 'VS Code',
		description: 'Primary IDE - Using GitHub theme',
		category: 'Development',
	},
	{
		name: 'iTerm2',
		description: 'Terminal Emulator - With Oh My Zsh & Starship prompt',
		category: 'Development',
	},
	{
		name: 'Fig',
		description: 'Terminal Enhancement',
		category: 'Development',
	},
	{
		name: 'Figma',
		description: 'UI/UX Design - For wireframes and prototypes',
		category: 'Productivity',
	},
	{
		name: 'Google Chrome',
		description: 'Primary Browser',
		category: 'Productivity',
	},
	{
		name: 'Raycast',
		description: 'Productivity Tool - Replaced Spotlight',
		category: 'Productivity',
	},
]
