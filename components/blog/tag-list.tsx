export default function TagList({ tags }) {
	return (
		<div className="flex flex-wrap gap-3">
			{tags.map((tag, i) => (
				<motion.span
					key={tag}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: i * 0.1 }}
					className="flex items-center gap-1 text-xs text-neutral-500 transition-colors group-hover:text-neutral-400">
					<span className="text-blue-500/80">--tag</span>
					<span className="text-neutral-400">{tag}</span>
				</motion.span>
			))}
		</div>
	)
}
