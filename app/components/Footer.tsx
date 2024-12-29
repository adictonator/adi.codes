import Link from 'next/link'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-primary text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <p>&copy; 2023 Aditya. All rights reserved.</p>
          <div className="flex space-x-4">
            <Link href="https://twitter.com/aditya" className="text-white hover:text-accent transition-colors">
              <FaTwitter className="w-6 h-6" />
            </Link>
            <Link href="https://github.com/aditya" className="text-white hover:text-accent transition-colors">
              <FaGithub className="w-6 h-6" />
            </Link>
            <Link href="https://linkedin.com/in/aditya" className="text-white hover:text-accent transition-colors">
              <FaLinkedin className="w-6 h-6" />
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Link href="/terms" className="text-sm text-white hover:text-accent transition-colors">Terms</Link>
          <span className="mx-2">|</span>
          <Link href="/privacy" className="text-sm text-white hover:text-accent transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer

