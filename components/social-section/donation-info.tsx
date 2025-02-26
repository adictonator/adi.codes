export default function DonationInfo() {
	return (
		<div>
			{platform.description && (
				<p className="mb-4 text-sm text-neutral-400">
					{platform.description}
				</p>
			)}

			{/* Patreon tiers */}
			{'tiers' in platform && platform.tiers && (
				<div className="mt-4 space-y-3">
					{platform.tiers.map((tier, i) => (
						<div
							key={i}
							className="border border-neutral-800 bg-neutral-900 p-4 transition-colors hover:bg-neutral-800">
							<div className="flex justify-between">
								<h4 className="text-sm font-medium text-neutral-300">
									{tier.name}
								</h4>
								<span className="font-mono text-sm text-neutral-400">
									{tier.price}
								</span>
							</div>
							<ul className="mt-2 space-y-1">
								{tier.benefits.map((benefit, j) => (
									<li
										key={j}
										className="flex text-xs text-neutral-500">
										<span className="mr-2">•</span>
										{benefit}
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			)}

			{/* Buy Me a Coffee recent supporters */}
			{'recentSupporters' in platform && platform.recentSupporters && (
				<div className="mt-4 space-y-2">
					<h4 className="mb-2 text-xs text-neutral-500 uppercase">
						Recent Supporters
					</h4>
					{platform.recentSupporters.map((supporter, i) => (
						<div
							key={i}
							className="flex justify-between border-b border-dashed border-neutral-800 py-2 text-sm">
							<span className="text-neutral-400">
								{supporter.name}
							</span>
							<div className="flex gap-3">
								<span className="text-emerald-500">
									{supporter.amount}
								</span>
								<span className="text-neutral-600">
									{supporter.date}
								</span>
							</div>
						</div>
					))}
				</div>
			)}

			{/* Generic donation button for platforms without specific displays */}
			{!('tiers' in platform || 'recentSupporters' in platform) && (
				<button className="mt-4 w-full border border-dashed border-neutral-700 bg-neutral-800/50 px-4 py-2 text-neutral-300 transition-colors hover:bg-neutral-800">
					Support via {platform.name}
				</button>
			)}
		</div>
	)
}
