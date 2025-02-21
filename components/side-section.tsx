import { useEffect } from 'react'
import BlogShowcase from './blog-showcase'
import Projects from './projects'
import TimelineExperience from './timeline-experience'
import CreativeLab from './creative-lab'
import SkillsShowcase from './skills-showcase'
import UsesShowcase from './uses-showcase'
import StickyTitle from './sticky-title'
import HireMe from './hire-me'
import GitHubActivity from './github-activity'
import AboutMe from './about-me'

export default function SideSection({
	onScroll,
}: {
	onScroll: (section: string) => void
}) {
	useEffect(() => {
		const observer = new IntersectionObserver(
			entries => {
				const visibleHeaders = entries.filter(entry => {
					const rect = entry.boundingClientRect
					// Consider a header "active" when it's just about to stick to the top
					return rect.top <= 64 && rect.bottom > 64
				})

				if (visibleHeaders.length > 0) {
					const activeHeader = visibleHeaders[0]
					const sectionId =
						activeHeader.target.getAttribute('data-section')
					if (sectionId) onScroll(sectionId)
				}
			},
			{
				threshold: [0, 1],
				rootMargin: '-64px 0px 0px 0px',
			},
		)

		document
			.querySelectorAll('[data-section]')
			.forEach(header => observer.observe(header))
		return () => observer.disconnect()
	}, [onScroll])

	return (
		<div className="relative h-full transition-all duration-200 md:max-w-7xl">
			<div className="bg-background relative z-20 flex h-full flex-col overflow-hidden">
				<div className="flex-1 overflow-y-auto">
					{/* About Me Section */}
					<section>
						<StickyTitle data-section="about">
							Who? Me? oh, okay
						</StickyTitle>
						<div className="p-4">
							<AboutMe />
						</div>
					</section>

					{/* Experience Section */}
					<section>
						<StickyTitle data-section="experience">
							Professional Experience
							<a
								href="/resume.pdf"
								className="text-sm text-blue-400 hover:text-blue-300">
								Download CV
							</a>
						</StickyTitle>
						<div className="p-4">
							<TimelineExperience />
						</div>
					</section>

					{/* Skills Section */}
					<section>
						<StickyTitle data-section="skills">
							Technical Skills
						</StickyTitle>
						<div className="p-4">
							<SkillsShowcase />
						</div>
					</section>

					{/* Open Source Section */}
					<section>
						<StickyTitle data-section="opensource">
							Open Source
						</StickyTitle>
						<div className="p-4">
							<GitHubActivity />
						</div>
					</section>

					{/* Projects Section */}
					<section>
						<StickyTitle data-section="projects">
							Featured Projects
						</StickyTitle>
						<div className="p-4">
							<Projects />
						</div>
					</section>

					{/* Uses Section */}
					<section>
						<StickyTitle data-section="uses">
							Setup & Tools
						</StickyTitle>
						<div className="p-4">
							<UsesShowcase />
						</div>
					</section>

					{/* Creative Lab Section */}
					<section>
						<StickyTitle data-section="lab">
							Creative Lab
						</StickyTitle>
						<div className="p-4">
							<CreativeLab />
						</div>
					</section>

					{/* Blog Section */}
					<section>
						<StickyTitle data-section="blog">Blog</StickyTitle>
						<div className="p-4">
							<BlogShowcase />
						</div>
					</section>

					{/* Hire Me Section */}
					<section>
						<StickyTitle data-section="hire">
							Got projects?
						</StickyTitle>
						<div className="p-4">
							<HireMe />
						</div>
					</section>
				</div>
			</div>
		</div>
	)
}
