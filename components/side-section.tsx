import BlogShowcase from './blog-showcase'
import { useState } from 'react'

export default function SideSection() {
	const [activeTab, setActiveTab] = useState('projects')

	const tabs = [
		{ id: 'projects', label: 'Projects', width: 'w-40' },
		{ id: 'about', label: 'About Me', width: 'w-44' },
		{ id: 'blog', label: 'Blog', width: 'w-36' },
		{ id: 'ideas', label: 'Ideas', width: 'w-32' },
	]

	return (
		<div className="relative h-full">
			{/* Floating Tabs - Position them relative to parent */}
			<div className="absolute -left-[170px] top-14 z-0 flex flex-col items-end gap-0.5">
				{tabs.map(tab => (
					<button
						key={tab.id}
						onClick={() => setActiveTab(tab.id)}
						className={` ${tab.width} transform rounded-l-md bg-gray-800/90 px-6 py-3.5 text-left font-display text-lg font-medium text-gray-300 backdrop-blur-sm transition-all duration-200 hover:-translate-x-1 hover:bg-gray-700/90 ${activeTab === tab.id ? '-translate-x-1 bg-gray-700/90' : ''} `}>
						{tab.label}
					</button>
				))}
			</div>

			{/* Main Content Container - Fixed Height with Internal Scroll */}
			<div className="relative z-20 flex h-full flex-col overflow-hidden rounded-md border bg-background shadow-2xl">
				<div className="flex-1 space-y-8 overflow-y-auto">
					{/* Projects Section */}
					<div className="flex flex-col">
						<h2 className="sticky top-0 z-10 bg-black/80 p-4 text-xl font-bold backdrop-blur-sm">
							Projects
						</h2>
						<div className="space-y-4 p-4">
							<BlogShowcase />
						</div>
					</div>
					{/* Add your projects content here */}
					<div className="flex flex-col">
						<h2 className="sticky top-0 z-10 bg-black/80 p-4 text-xl font-bold backdrop-blur-sm">
							Projects
						</h2>
						<div className="space-y-4 p-4">
							{/* Add your projects content here */}
							<div className="h-96">Projects content...</div>
						</div>
					</div>

					{/* Socials Section */}
					<div className="flex flex-col">
						<h2 className="sticky top-0 z-10 bg-black/80 p-4 text-xl font-bold backdrop-blur-sm">
							Socials
						</h2>
						<div className="space-y-4 p-4">
							{/* Add your socials content here */}
							<div className="h-96">Socials content...</div>
						</div>
					</div>

					{/* Blog Section */}
					<div className="flex flex-col">
						<h2 className="sticky top-0 z-10 bg-black/80 p-4 text-xl font-bold backdrop-blur-sm">
							Blog
						</h2>
						<div className="space-y-4 p-4">
							{/* Add your blog content here */}
							<div className="h-96">Blog content...</div>
						</div>
					</div>

					{/* About Section */}
					<div className="flex flex-col">
						<h2 className="sticky top-0 z-10 bg-black/80 p-4 text-xl font-bold backdrop-blur-sm">
							About Me
						</h2>
						<div className="space-y-4 p-4">
							{/* Add your about content here */}
							<div className="h-96">About content...</div>
						</div>
					</div>

					{/* Quotes Section */}
					<div className="flex flex-col">
						<h2 className="sticky top-0 z-10 bg-black/80 p-4 text-xl font-bold backdrop-blur-sm">
							Quotes
						</h2>
						<div className="space-y-4 p-4">
							{/* Add your quotes content here */}
							<div className="h-96">Quotes content...</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
