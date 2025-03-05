import { useEffect, useState } from 'react'
import Section from './section'
import AboutMe from './about-me'
import TimelineExperience from './timeline-experience'
import SkillPill from './skill-pill'
import SkillsShowcase from './skills-showcase'
import UsesShowcase from './uses-showcase'
import SocialConnects from './social-connects'
import HireMe from './hire-me'
//import BlogShowcase from './blog-showcase'
//import CreativeLab from './creative-lab'
//import GitHubActivity from './github-activity'
import Footer from './footer'

export default function RightPanel({
	onScroll,
}: {
	onScroll: (section: string) => void
}) {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
	)

	useEffect(() => {
		// Track if scroll is programmatic
		let isManualScroll = true

		const observer = new IntersectionObserver(
			entries => {
				// Only update hash if user is manually scrolling
				if (!isManualScroll) return

				const visibleSection = entries.find(
					entry =>
						entry.isIntersecting && entry.intersectionRatio >= 0.5,
				)

				if (visibleSection) {
					const sectionId =
						visibleSection.target.getAttribute('data-section')
					if (sectionId) onScroll(sectionId)
				}
			},
			{
				threshold: 0.5,
				rootMargin: '-64px 0px -64px 0px',
			},
		)

		// Observe all sections
		document
			.querySelectorAll('[data-section]')
			.forEach(section => observer.observe(section))

		// Handle hash changes
		const handleHashChange = () => {
			const hash = window.location.hash.slice(1)
			if (!hash) return

			isManualScroll = false
			const target = document.querySelector(`[data-section="${hash}"]`)
			target?.scrollIntoView({ behavior: 'smooth' })

			// Re-enable manual scroll detection after animation
			setTimeout(() => {
				isManualScroll = true
			}, 1000)
		}

		// Initial scroll if hash exists
		if (window.location.hash) {
			handleHashChange()
		}

		window.addEventListener('hashchange', handleHashChange)
		return () => {
			observer.disconnect()
			window.removeEventListener('hashchange', handleHashChange)
		}
	}, [onScroll])

	return (
		<section className="bg-foreground relative z-20 flex size-full flex-col overflow-hidden transition-all duration-200 md:max-w-7xl">
			<div className="flex-1 overflow-y-auto">
				<Section title="Who? Me? Oh, okay" ariaTitle="about">
					<AboutMe />
				</Section>

				<Section
					title="	Professional Experience"
					ariaTitle="experience"
					//headerChildren={
					//	<a
					//		href="/resume.pdf"
					//		className="text-sm text-blue-400 hover:text-blue-300">
					//		Download CV
					//	</a>
					//}
				>
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

				{/*<Section title="Experimental stuff" ariaTitle="lab">
					<CreativeLab />
				</Section>

				<Section title="I've been coding" ariaTitle="opensource">
					<GitHubActivity />
				</Section>*/}

				<Section title="Uses" ariaTitle="uses">
					<UsesShowcase />
				</Section>

				{/*<Section title="Blog" ariaTitle="blog">
					<BlogShowcase />
				</Section>*/}

				<Section
					title="Got projects?"
					ariaTitle="hire"
					headerChildren={
						<span className="flex items-center gap-3 border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5">
							<span className="relative flex size-2">
								<span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
								<span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
							</span>
							<span className="text-xs text-emerald-400">
								Available for Hire
							</span>
						</span>
					}>
					<HireMe />
				</Section>

				<Section title="Social stuff" ariaTitle="connect">
					<SocialConnects />
				</Section>

				<Footer />
			</div>
		</section>
	)
}
