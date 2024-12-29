'use client'

import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import { Button } from "@/components/ui/button"
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const Header = () => {
  const pathname = usePathname()
  const routes = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/#about' },
    { name: 'Blogs', path: '/#blogs' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Newsletter', path: '/#newsletter' },
    { name: 'Contact', path: '/#contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          Aditya
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          {routes.map((route) => (
            <Button
              key={route.path}
              variant="ghost"
              className={cn(
                "hidden md:inline-flex",
                pathname === route.path && "bg-accent/20 text-accent"
              )}
              asChild
            >
              <Link href={route.path}>
                {route.name}
              </Link>
            </Button>
          ))}
          <ModeToggle />
        </div>
      </nav>
    </header>
  )
}

export default Header

