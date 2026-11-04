import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
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
import VerticalNav from './vertical-nav'
import MobileIntro from './mobile-intro'
import type { Post } from '@/lib/mdx'
import { siteConfig } from '@/lib/site'
import { trackResumeClick } from '@/lib/ga'

interface RightPanelProps {
	onScroll: (section: string) => void
	activeSection: string
	onNavigate: (section: string) => void
	scrollRef?: React.RefObject<HTMLDivElement | null>
	posts?: Post[]
}

const headerLinkClass =
	'text-neutral-300/80 transition-colors duration-200 hover:text-neutral-100'

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
		const firstId = sections[0]?.dataset.section
		const lastId = sections[sections.length - 1]?.dataset.section

		// The first/last sections can be too short to ever reach the
		// viewport center, so pin them whenever the container is scrolled
		// all the way to the start or the end.
		const atTop = () => !!container && container.scrollTop <= 4
		const atBottom = () =>
			!!container &&
			container.scrollTop + container.clientHeight >=
				container.scrollHeight - 4

		const report = (id?: string) => {
			if (atTop() && firstId) {
				onScroll(firstId)
			} else if (atBottom() && lastId) {
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
			if (atTop() || atBottom()) report()
		}
		container?.addEventListener('scroll', handleScroll, { passive: true })

		return () => {
			observer.disconnect()
			container?.removeEventListener('scroll', handleScroll)
		}
	}, [onScroll])

	return (
		// h-dvh (not h-screen): on iOS Safari 100vh is the large-viewport
		// height, which pushes fixed-bottom UI (the mobile nav) behind the
		// browser toolbar. dvh tracks the actually visible area.
		<div className="flex h-dvh w-full md:w-1/2">
			<VerticalNav
				activeSection={activeSection}
				onNavigate={onNavigate}
			/>

			<div
				className="bg-foreground border-border relative z-20 flex h-dvh w-full min-w-0 flex-1 flex-col border-dashed md:border-l"
				id="right-panel">
				<div
					ref={node => {
						containerRef.current = node
						if (scrollRef) scrollRef.current = node
					}}
					// pb-24 keeps the footer clear of the fixed mobile nav.
					className="flex-1 overflow-x-hidden overflow-y-auto pb-24 motion-safe:scroll-smooth md:pb-0">
					<MobileIntro />
					<Section title="Who? Me? Oh, okay" ariaTitle="about">
						<AboutMe />
					</Section>
					<Section
						title="Things I've shipped"
						ariaTitle="lab"
						headerChildren={
							<Link className={headerLinkClass} href="/projects">
								All projects
							</Link>
						}>
						<CreativeLab />
					</Section>
					<Section
						title="Professional experience"
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
								className={headerLinkClass}>
								Résumé
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
						title="Notes"
						ariaTitle="blog"
						headerChildren={
							<Link className={headerLinkClass} href="/blog">
								All notes
							</Link>
						}>
						<BlogShowcase posts={posts} />
					</Section>
					<Section title="Uses" ariaTitle="uses">
						<UsesShowcase />
					</Section>
					<Section
						title="Let's talk"
						ariaTitle="hire"
						headerChildren={
							<span className="flex items-center gap-2.5 border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 sm:px-3.5 sm:py-1.5">
								<span className="relative flex size-2">
									<span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75 motion-reduce:animate-none" />
									<span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
								</span>
								<span className="text-emerald-400 normal-case">
									Open to work
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
			</div>
		</div>
	)
}
