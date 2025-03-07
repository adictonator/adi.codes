import { motion } from 'framer-motion'
import BlogMeta from './blog-meta'
import TagList from './tag-list'
import {
	ArrowUpRight,
	Terminal,
	Hash,
	ChevronRight,
	AlertCircle,
	FileX,
	Code,
} from 'lucide-react'

export default function BlogItem({
	blog,
}: {
	blog: {
		title: string
		snippet: string
		date: string
		readTime: string
		excerpt?: {
			filename?: string
			language: string
			code: string
		}
	}
}) {
	const renderCodeWithLineNumbers = (code: string) => {
		const lines = code.split('\n')
		return (
			<div className="relative flex">
				{/* Line Numbers */}
				<div className="border-r border-neutral-800 pr-4 text-right font-mono text-xs text-neutral-600 select-none">
					{lines.map((_, i) => (
						<div key={i + 1} className="leading-6">
							{i + 1}
						</div>
					))}
				</div>
				{/* Code Content */}
				<pre className="overflow-x-auto pl-4 font-mono text-sm">
					<code className="relative">
						{lines.map((line, i) => (
							<div key={i} className="leading-6">
								<span className="text-neutral-200">{line}</span>
							</div>
						))}
					</code>
				</pre>
			</div>
		)
	}

	return (
		<div className="relative z-10 flex h-full flex-col">
			{/* Enhanced Terminal Header */}
			<div className="mb-6 font-mono text-xs">
				{/* Terminal Tab */}
				<div className="mb-2 flex items-center gap-2 rounded-t border-b border-dashed border-neutral-700/50 bg-neutral-900/50 px-4 py-2">
					<Terminal className="h-3.5 w-3.5 text-emerald-500" />
					<span className="text-neutral-400">blog</span>
					<ChevronRight className="h-3 w-3 text-neutral-600" />
					<span className="text-emerald-500/80">~/{1}</span>
					<span className="ml-1 inline-block h-3 w-2 animate-pulse bg-emerald-500" />
				</div>

				{/* Command Line */}
				<div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
					<span className="text-emerald-600">➜</span>
					<span className="text-blue-500">git</span>
					<span className="text-neutral-500">checkout</span>
					<span className="text-neutral-300">
						{blog.title.toLowerCase().replace(/\s+/g, '-')}
					</span>
				</div>
			</div>

			{/* Main Content */}
			<div className="space-y-4">
				<motion.div
					className="space-y-1"
					initial={{ x: -20 }}
					animate={{ x: 0 }}>
					<h3 className="font-mono text-xl font-light tracking-tight text-neutral-200 group-hover:text-white">
						{blog.title}
					</h3>
					<p className="line-clamp-3 text-sm text-neutral-400 group-hover:text-neutral-300">
						{blog.snippet}
					</p>
				</motion.div>

				{/* Enhanced Code Excerpt */}
				{blog.excerpt && (
					<div className="mt-4 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50">
						{blog.excerpt.filename && (
							<div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-800/50 px-4 py-2">
								<span className="text-xs text-neutral-400">
									{blog.excerpt.filename}
								</span>
								<span className="text-xs text-neutral-500">
									{blog.excerpt.language}
								</span>
							</div>
						)}
						<div className="overflow-x-auto p-4">
							{renderCodeWithLineNumbers(blog.excerpt.code)}
						</div>
					</div>
				)}

				{/*<TagList tags={blog.tags} />*/}
			</div>

			{/* Enhanced Footer with Terminal Stats */}
			<BlogMeta metaData={blog} />
		</div>
	)
}
//
