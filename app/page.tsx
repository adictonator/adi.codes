import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import BlogShowcase from './components/BlogShowcase'
import Newsletter from './components/Newsletter'

export default function Home() {
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

