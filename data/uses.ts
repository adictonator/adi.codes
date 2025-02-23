type SetupItem = {
	name: string
	description?: string
	link?: string
	affiliateLink?: string
	price?: string
	category: 'Hardware' | 'Development' | 'Productivity'
}

export const setup: SetupItem[] = [
	{
		name: 'MacBook Pro 16" M1 Max',
		description: '64GB RAM, 2TB SSD - Main development machine',
		category: 'Hardware',
		price: '$3,499',
		affiliateLink: 'https://amazon.com/...',
	},
	{
		name: 'Dell U2720Q',
		description: '27" 4K USB-C Monitor',
		category: 'Hardware',
		link: 'https://www.dell.com/en-us/shop/dell-ultrasharp-27-4k-usb-c-monitor-u2720q/apd/210-avjv/monitors-monitor-accessories',
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
		link: 'https://fig.io',
	},
	{
		name: 'Figma',
		description: 'UI/UX Design - For wireframes and prototypes',
		category: 'Productivity',
	},
	{
		name: 'Arc Browser',
		description: 'Primary Browser',
		category: 'Productivity',
		link: 'https://arc.net',
	},
	{
		name: 'Raycast',
		description: 'Productivity Tool - Replaced Spotlight',
		category: 'Productivity',
	},
]
