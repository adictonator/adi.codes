import { thoughts } from '@/data/random-thoughts'
import { useEffect, useState } from 'react'

export default function RandomThought() {
	const [sassyComment, setSassyComment] = useState('')

	// Pick a random sassy comment on mount
	useEffect(() => {
		const randomComment =
			thoughts[Math.floor(Math.random() * thoughts.length)]
		setSassyComment(randomComment)
	}, [])

	return (
		<div className="space-y-2">
			<h3 className="text-xs text-neutral-400 md:text-sm">
				Oh hey, a random thought for you:
			</h3>
			<p className="text-xs text-neutral-500 md:text-sm">
				{sassyComment}
			</p>
		</div>
	)
}
