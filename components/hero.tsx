'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import SideSection from './side-section'

export default function Hero() {
	const { theme, setTheme } = useTheme()

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (
		<section className="relative grid h-full grid-cols-2 items-center">
			<div className="flex flex-col justify-start self-end pr-8">
				<h1 className="animate-gradient lg:text-12xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text font-display text-4xl font-bold tracking-wider text-transparent sm:text-5xl md:text-6xl">
					Hi, <br />I{"'"}m Aditya
				</h1>
				<p className="mt-4 text-xl text-muted-foreground md:text-2xl">
					Technical Author & Developer from India
				</p>
				<p className="mt-6 max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
					Passionate about creating elegant solutions and sharing
					knowledge through code and words. Specializing in web
					development, AI, and open-source contributions.
				</p>

				<div className="right-0 top-0">
					<Button variant="outline" size="icon" onClick={toggleTheme}>
						<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span className="sr-only">Toggle theme</span>
					</Button>
				</div>
			</div>
			<div className="absolute bottom-0 right-0 top-0 w-1/2">
				<SideSection />
			</div>
		</section>
	)
}
