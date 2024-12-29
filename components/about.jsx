export default function About() {
	const milestones = [
		{ year: 2018, event: 'Started learning web development' },
		{ year: 2019, event: 'Launched first open-source project' },
		{ year: 2020, event: 'Began writing technical articles' },
		{ year: 2021, event: 'Joined as a developer advocate' },
		{ year: 2022, event: 'Published first eBook on web development' },
		{ year: 2023, event: 'Spoke at international tech conferences' },
	]

	return (
		<section id="about" className="bg-secondary/50 py-24">
			<div className="container px-4">
				<h2 className="font-display mb-12 text-center text-3xl font-bold tracking-wide sm:text-4xl md:text-5xl">
					About Me
				</h2>
				<div className="mx-auto max-w-[85ch]">
					<p className="mb-6 text-lg leading-relaxed text-muted-foreground">
						I'm a passionate developer and technical author from
						India, with a keen interest in web technologies,
						artificial intelligence, and open-source software. With
						over 5 years of experience in the tech industry, I've
						had the opportunity to work on diverse projects and
						share my knowledge through writing and speaking.
					</p>
					<p className="mb-12 text-lg leading-relaxed text-muted-foreground">
						My goal is to create impactful solutions and help other
						developers grow in their journey. When I'm not coding or
						writing, you can find me exploring new technologies,
						contributing to open-source projects, or enjoying a cup
						of chai while brainstorming new ideas.
					</p>
					<div className="relative">
						<div className="absolute left-0 top-0 h-full w-px bg-primary/20" />
						<h3 className="mb-8 pl-8 text-2xl font-semibold tracking-tight">
							Career Highlights
						</h3>
						<ul className="space-y-6">
							{milestones.map((milestone, index) => (
								<li key={index} className="relative pl-8">
									<div className="absolute left-0 top-[12px] size-2 -translate-x-[4.5px] rounded-full bg-primary" />
									<div className="space-y-1">
										<span className="font-medium text-accent">
											{milestone.year}
										</span>
										<p className="text-muted-foreground">
											{milestone.event}
										</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	)
}
