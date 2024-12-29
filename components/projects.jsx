import Link from 'next/link'

const projects = [
  {
    title: "AI-Powered Code Assistant",
    description: "A VS Code extension that uses AI to provide intelligent code suggestions and explanations.",
    link: "https://github.com/aditya/ai-code-assistant"
  },
  {
    title: "React Component Library",
    description: "A collection of reusable React components with a focus on accessibility and performance.",
    link: "https://github.com/aditya/react-component-library"
  },
  {
    title: "Blockchain Voting System",
    description: "A decentralized voting system built on Ethereum, ensuring transparency and security.",
    link: "https://github.com/aditya/blockchain-voting"
  },
  {
    title: "Tech Blog Platform",
    description: "A Next.js-powered platform for technical writers to publish and monetize their content.",
    link: "https://github.com/aditya/tech-blog-platform"
  }
]

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {projects.map((project, index) => (
          <div key={index} className="bg-secondary p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2 text-primary">{project.title}</h3>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <Link href={project.link} className="text-accent hover:text-accent/90 transition-colors">
              Learn More &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects

