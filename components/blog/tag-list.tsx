'use client'

import { motion } from 'framer-motion'
import { useMounted } from '@/hooks/use-mounted'

export default function TagList({ tags }: { tags: string[] }) {
	const mounted = useMounted()

	return (
		<ul aria-label="Tags" className="flex flex-wrap gap-x-4 gap-y-2 font-mono">
			{tags.map((tag, i) => (
				<motion.li
					key={tag}
					initial={mounted ? { opacity: 0, y: 10 } : false}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: i * 0.1 }}
					className="flex items-center gap-1 text-xs">
					<span className="text-blue-400">--tag</span>
					<span className="text-neutral-400">{tag}</span>
				</motion.li>
			))}
		</ul>
	)
}
