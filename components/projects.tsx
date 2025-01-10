import Link from 'next/link'

const projects = [
	{
		title: 'AI-Powered Code Assistant',
		description:
			'A VS Code extension that uses AI to provide intelligent code suggestions and explanations.',
		link: 'https://github.com/aditya/ai-code-assistant',
	},
	{
		title: 'React Component Library',
		description:
			'A collection of reusable React components with a focus on accessibility and performance.',
		link: 'https://github.com/aditya/react-component-library',
	},
	{
		title: 'Blockchain Voting System',
		description:
			'A decentralized voting system built on Ethereum, ensuring transparency and security.',
		link: 'https://github.com/aditya/blockchain-voting',
	},
	{
		title: 'Tech Blog Platform',
		description:
			'A Next.js-powered platform for technical writers to publish and monetize their content.',
		link: 'https://github.com/aditya/tech-blog-platform',
	},
]

const Projects = () => {
	return (
		<section id="projects" className="bg-white py-20">
			<h2 className="mb-8 text-center text-3xl font-bold text-primary">
				Projects
			</h2>
			<div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
				{projects.map((project, index) => (
					<div
						key={index}
						className="rounded-lg bg-secondary p-6 shadow-md transition-shadow hover:shadow-lg">
						<h3 className="mb-2 text-xl font-semibold text-primary">
							{project.title}
						</h3>
						<p className="mb-4 text-gray-600">
							{project.description}
						</p>
						<Link
							href={project.link}
							className="text-accent transition-colors hover:text-accent/90">
							Learn More &rarr;
						</Link>
					</div>
				))}
			</div>
		</section>
	)
}

export default Projects
