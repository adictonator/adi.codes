import Hero from '@/components/hero'
import About from '@/components/about'
import Projects from '@/components/projects'
import BlogShowcase from '@/components/blog-showcase'
import Newsletter from '@/components/newsletter'

export default function LandingPage() {
	return (
		<main className="container mx-auto px-4 py-8">
			<Hero />
			<About />
			<Projects />
			<BlogShowcase />
			<Newsletter />
		</main>
	)
}
