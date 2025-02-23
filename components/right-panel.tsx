import { useEffect, useState } from 'react'
import BlogShowcase from './blog-showcase'
import Projects from './projects'
import TimelineExperience from './timeline-experience'
import CreativeLab from './creative-lab'
import SkillsShowcase from './skills-showcase'
import UsesShowcase from './uses-showcase'
import HireMe from './hire-me'
import GitHubActivity from './github-activity'
import AboutMe from './about-me'
import SocialConnects from './social-connects'
import Section from './section'
import SkillPill from './skill-pill'

export default function RightPanel({
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

	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
	)

	return (
		<section className="relative z-20 flex h-full flex-col overflow-hidden transition-all duration-200 md:max-w-7xl">
			<div className="flex-1 overflow-y-auto">
				<Section title="Who? Me? Oh, okay" ariaTitle="about">
					<AboutMe />
				</Section>

				<Section
					title="	Professional Experience"
					ariaTitle="experience"
					headerChildren={
						<a
							href="/resume.pdf"
							className="text-sm text-blue-400 hover:text-blue-300">
							Download CV
						</a>
					}>
					<TimelineExperience />
				</Section>

				<Section
					title="Technical skills"
					ariaTitle="skills"
					headerChildren={
						<SkillPill
							selected={selectedCategory}
							setCategory={setSelectedCategory}
						/>
					}>
					<SkillsShowcase selectedCategory={selectedCategory} />
				</Section>

				<Section title="I've been coding" ariaTitle="opensource">
					<GitHubActivity />
				</Section>

				<Section title="Current projects" ariaTitle="projects">
					<Projects />
				</Section>

				<Section title="Uses" ariaTitle="uses">
					<UsesShowcase />
				</Section>

				<Section title="Experimental stuff" ariaTitle="lab">
					<CreativeLab />
				</Section>

				<Section title="Blog" ariaTitle="blog">
					<BlogShowcase />
				</Section>

				<Section title="Social stuff" ariaTitle="connect">
					<SocialConnects />
				</Section>

				<Section title="Got projects?" ariaTitle="hire">
					<HireMe />
				</Section>
			</div>
		</section>
	)
}
