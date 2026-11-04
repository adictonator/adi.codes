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
		//affiliateLink: 'https://amazon.com/...',
	},
	{
		name: 'MacBook Pro 16" 2019 Intel',
		description: '64GB RAM, 2TB SSD - Secondary development machine',
		category: 'Hardware',
		//affiliateLink: 'https://amazon.com/...',
	},
	{
		name: 'Desktop PC',
		description: 'Ryzen 7 3700X, RTX 2070 Super, 16GB RAM - Gaming and Ollama',
		category: 'Hardware',
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
		name: 'Logitech Brio 4K',
		description: 'Webcam - For calls',
		category: 'Hardware',
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
		name: 'Xcode',
		description: 'iOS & macOS - Swift and SwiftUI',
		category: 'Development',
	},
	{
		name: 'VS Code',
		description: 'Primary IDE - One Dark Pro theme, Fira Code',
		category: 'Development',
	},
	{
		name: 'Claude Code',
		description: 'AI coding agent - In the terminal and VS Code',
		category: 'Development',
	},
	{
		name: 'Ollama',
		description: "Local LLMs - On the desktop PC's RTX 2070 Super",
		category: 'Development',
	},
	{
		name: 'Figma',
		description: 'UI design and prototyping',
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
		description: 'Local WordPress development environment',
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
		name: 'Slack',
		description: 'Communication - For team chat',
		category: 'Productivity',
	},
	{
		name: 'Microsoft Teams',
		description: 'Communication - Meetings and chat',
		category: 'Productivity',
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
		name: 'TickTick',
		description: 'Task Management - For personal tasks',
		category: 'Productivity',
	},
	{
		name: 'Bitwarden',
		description: 'Password Manager',
		category: 'Productivity',
	},
	{
		name: 'Wispr Flow',
		description: 'Voice dictation - Talking instead of typing',
		category: 'Productivity',
	},
	{
		name: 'Firefox',
		description: 'Primary Browser - Switched from Chrome',
		category: 'Productivity',
	},
	{
		name: 'DaVinci Resolve',
		description: 'Video editing',
		category: 'Productivity',
	},
	{
		name: 'OBS',
		description: 'Screen recording',
		category: 'Productivity',
	},
]
