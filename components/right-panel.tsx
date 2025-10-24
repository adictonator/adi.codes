import { useEffect, useState } from 'react'
import Section from './section'
import AboutMe from './about-me'
import TimelineExperience from './timeline-experience'
import SkillPill from './skill-pill'
import SkillsShowcase from './skills-showcase'
import UsesShowcase from './uses-showcase'
import SocialConnects from './social-connects'
import HireMe from './hire-me'
import Footer from './footer'
import BlogShowcase from './blog-showcase'
import CreativeLab from './creative-lab'
//import GitHubActivity from './github-activity'
import VerticalNav from './vertical-nav'
import Link from 'next/link'

type PostData = {
	slug: string
	title?: string
	date?: string
	description?: string
	tags?: string[]
	[key: string]: any
}

// Add scrollRef prop to the component interface
interface RightPanelProps {
	onScroll: (section: string) => void
	scrollRef?: React.RefObject<HTMLDivElement | null>
	posts?: PostData[]
}

// Global flag to pause observer during programmatic scrolling
let isScrollingProgrammatically = false
export const pauseScrollObserver = () => {
	isScrollingProgrammatically = true
	setTimeout(() => {
		isScrollingProgrammatically = false
	}, 1000)
}

export default function RightPanel({
	onScroll,
	scrollRef,
	posts = [],
}: RightPanelProps) {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
	)

	useEffect(() => {
		let scrollTimeout: NodeJS.Timeout

		const observer = new IntersectionObserver(
			entries => {
				// Skip if programmatic scroll is happening
				if (isScrollingProgrammatically) return

				const visibleSection = entries.find(
					entry =>
						entry.isIntersecting && entry.intersectionRatio >= 0.5,
				)

				if (visibleSection) {
					const sectionId =
						visibleSection.target.getAttribute('data-section')
					if (sectionId) {
						clearTimeout(scrollTimeout)
						scrollTimeout = setTimeout(() => {
							onScroll(sectionId)
						}, 150)
					}
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

		return () => {
			observer.disconnect()
			clearTimeout(scrollTimeout)
		}
	}, [onScroll])

	return (
		<section className="flex h-screen w-full md:w-1/2" id="right-panel">
			<VerticalNav />

			<section
				className="bg-foreground border-border relative z-20 flex h-screen w-full flex-1 flex-col border-l border-dashed transition-all duration-200 md:w-1/2"
				id="right-panel">
				{/* Apply the scrollRef to the scrollable container */}
				<div
					ref={scrollRef}
					className="flex-1 overflow-y-auto scroll-smooth">
					<Section title="Who? Me? Oh, okay" ariaTitle="about">
						<AboutMe />
					</Section>
					{/*<Section
						title="Experimental stuff"
						ariaTitle="lab"
						headerChildren={
							<Link
								className="text-neutral-300/80 transition-colors duration-200 hover:text-neutral-100"
								href={'/projects'}>
								View all projects
							</Link>
						}>
						<CreativeLab />
					</Section>*/}
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
					{/*<Section
						title="Blog"
						ariaTitle="blog"
						headerChildren={
							<Link
								className="text-neutral-300/80 transition-colors duration-200 hover:text-neutral-100"
								href={'/blog'}>
								View all articles
							</Link>
						}>
						<BlogShowcase posts={posts} />
					</Section>*/}
					{/*<Section title="I've been coding" ariaTitle="opensource">
					<GitHubActivity />
					</Section>*/}
					<Section title="Uses" ariaTitle="uses">
						<UsesShowcase />
					</Section>
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
		</section>
	)
}
