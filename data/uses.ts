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
		//affiliateLink: 'https://amazon.com/...',
	},
	{
		name: 'MacBook Pro 16" 2019 Intel',
		description: '64GB RAM, 2TB SSD - Secondary development machine',
		category: 'Hardware',
		image: '/assets/images/me.png',
		//affiliateLink: 'https://amazon.com/...',
	},
	{
		name: 'Acer XV2720',
		description: '27" 2K Monitor',
		category: 'Hardware',
		//affiliateLink:
		//	'https://www.dell.com/en-us/shop/dell-ultrasharp-27-4k-usb-c-monitor-u2720q/apd/210-avjv/monitors-monitor-accessories',
	},
	{
		name: 'Keychron K6',
		description:
			'Gateron Mechanical - Red Switches - Wireless Mechanical - For typing',
		category: 'Hardware',
	},
	{
		name: 'Logitech MX Master 3',
		description: 'Wireless Mouse - For productivity',
		category: 'Hardware',
	},
	{
		name: 'RøDE NT-USB Mini',
		description: 'USB Microphone - For voiceovers and calls',
		category: 'Hardware',
		//affiliateLink: 'https://www.rode.com/microphones/nt-usbmini',
	},
	{
		name: 'iPhone 15 Pro',
		description: '128GB - Primary mobile device',
		category: 'Hardware',
	},
	{
		name: 'OnePlus 9R',
		description: '256GB - Secondary mobile device',
		category: 'Hardware',
	},
	{
		name: 'VS Code',
		description: 'Primary IDE - Using Material theme',
		category: 'Development',
	},
	{
		name: 'Postman',
		description: 'API Testing',
		category: 'Development',
	},
	{
		name: 'Terminal',
		description: 'Primary Shell - Using Zsh',
		category: 'Development',
	},
	{
		name: 'Local',
		description: 'Local Wordpress Development Environment',
		category: 'Development',
	},
	{
		name: 'TablePlus',
		description: 'Database Management',
		category: 'Development',
	},
	{
		name: 'Docker',
		description: 'Containerization',
		category: 'Development',
	},
	{
		name: 'Godot',
		description: 'Game Development',
		category: 'Development',
	},
	{
		name: 'Zoom',
		description: 'Communication - For team meetings',
		category: 'Productivity',
	},
	{
		name: 'Notion',
		description: 'Note-taking and task management',
		category: 'Productivity',
	},
	{
		name: 'Slack',
		description: 'Communication - For team chat',
		category: 'Productivity',
	},
	{
		name: 'Skype',
		description: 'Communication - For clients',
		category: 'Productivity',
	},
	{
		name: 'TickTick',
		description: 'Task Management - For personal tasks',
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
