import Link from 'next/link'
import { Github, Twitter, Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      <div className="container flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
          Hi, I'm Aditya
        </h1>
        <p className="mt-4 text-xl text-muted-foreground md:text-2xl">
          Technical Author & Developer from India
        </p>
        <p className="mt-6 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Passionate about creating elegant solutions and sharing knowledge through code and words. 
          Specializing in web development, AI, and open-source contributions.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="default">
            <Link href="#newsletter">
              Subscribe to Newsletter
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="#projects">
              View Projects
            </Link>
          </Button>
        </div>
        <div className="mt-12 flex items-center justify-center gap-6">
          <Link 
            href="https://twitter.com/aditya" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link 
            href="https://github.com/aditya" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="h-6 w-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link 
            href="https://linkedin.com/in/aditya" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero

