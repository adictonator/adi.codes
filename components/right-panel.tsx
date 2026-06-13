import { useEffect, useRef, useState } from 'react'
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
import { siteConfig } from '@/lib/site'
import { trackResumeClick } from '@/lib/ga'

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
	activeSection: string
	onNavigate: (section: string) => void
	scrollRef?: React.RefObject<HTMLDivElement | null>
	posts?: PostData[]
}

export default function RightPanel({
	onScroll,
	activeSection,
	onNavigate,
	scrollRef,
	posts = [],
}: RightPanelProps) {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		null,
	)
	const containerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const container = containerRef.current
		const sections = Array.from(
			document.querySelectorAll<HTMLElement>('[data-section]'),
		)
		const lastId = sections[sections.length - 1]?.dataset.section

		// The last section can be too short to ever reach the viewport
		// center, so pin it whenever the container is scrolled to the end.
		const atBottom = () =>
			!!container &&
			container.scrollTop + container.clientHeight >=
				container.scrollHeight - 4

		const report = (id?: string) => {
			if (atBottom() && lastId) {
				onScroll(lastId)
			} else if (id) {
				onScroll(id)
			}
		}

		// A section is active while it spans the vertical middle of the
		// viewport — independent of section height or screen size.
		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						report((entry.target as HTMLElement).dataset.section)
					}
				})
			},
			{ rootMargin: '-50% 0px -50% 0px', threshold: 0 },
		)
		sections.forEach(section => observer.observe(section))

		const handleScroll = () => {
			if (atBottom()) report()
		}
		container?.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			observer.disconnect()
			container?.removeEventListener('scroll', handleScroll)
		}
	}, [onScroll])

	return (
		<section className="flex h-screen w-full md:w-1/2" id="right-panel">
			<VerticalNav
				activeSection={activeSection}
				onNavigate={onNavigate}
			/>

			<section
				className="bg-foreground border-border relative z-20 flex h-screen w-full flex-1 flex-col border-dashed transition-all duration-200 md:w-1/2 md:border-l"
				id="right-panel">
				{/* Apply the scrollRef to the scrollable container */}
				<div
					ref={node => {
						containerRef.current = node
						if (scrollRef) scrollRef.current = node
					}}
					className="flex-1 overflow-y-auto scroll-smooth">
					<Section title="Who? Me? Oh, okay" ariaTitle="about">
						<AboutMe />
					</Section>
					<Section
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
					</Section>
					<Section
						title="	Professional Experience"
						ariaTitle="experience"
						headerChildren={
							<a
								href={siteConfig.resume}
								target="_blank"
								rel="noopener noreferrer"
								download
								onClick={() =>
									trackResumeClick({ variant: 'ios' })
								}
								className="text-neutral-300/80 transition-colors duration-200 hover:text-neutral-100">
								Download Résumé
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
					<Section
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
					</Section>
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
