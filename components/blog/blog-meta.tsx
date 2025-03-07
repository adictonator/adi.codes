import { ArrowUpRight } from 'lucide-react'

export default function BlogMeta({
	metaData,
}: {
	metaData: {
		date: string
		readTime: string
	}
}) {
	return (
		<div className="mt-auto border-t border-dashed border-neutral-800/50 pt-4 font-mono text-xs text-neutral-500">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<span className="flex items-center gap-1">
						<span className="text-blue-500/80">--date</span>
						<time
							dateTime={metaData.date}
							className="text-neutral-400 tabular-nums">
							{new Date(metaData.date).toLocaleDateString(
								'en-US',
								{
									year: 'numeric',
									month: '2-digit',
									day: '2-digit',
								},
							)}
						</time>
					</span>
					<span className="flex items-center gap-1">
						<span className="text-blue-500/80">--time</span>
						<span className="text-neutral-400">
							{metaData.readTime}
						</span>
					</span>
				</div>
				<span className="flex items-center gap-2 text-emerald-500">
					<span>read --more</span>
					<ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
				</span>
			</div>
		</div>
	)
}
