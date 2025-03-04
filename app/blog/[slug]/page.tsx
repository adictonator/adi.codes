//'use client'

//import { motion } from 'framer-motion'
//import {
//	Terminal,
//	ChevronRight,
//	CalendarDays,
//	Clock,
//	ArrowLeft,
//	Copy,
//	Check,
//	Hash,
//	Github,
//	Twitter,
//	Linkedin,
//	Globe,
//	Mail,
//} from 'lucide-react'
//import { useState } from 'react'
//import Link from 'next/link'
//import { Fira_Code } from 'next/font/google'

//const firaCode = Fira_Code({ subsets: ['latin'] })

//const dummyPost = {
//	title: 'Building a Modern Web Portfolio',
//	date: '2024-02-15',
//	readTime: '8 min read',
//	author: 'Aditya',
//	content: `
//Let's explore how we can create engaging animations using Framer Motion:

//\`\`\`tsx
//const fadeInUp = {
//    initial: { y: 20, opacity: 0 },
//    animate: { y: 0, opacity: 1 },
//    transition: { duration: 0.5 }
//}

//// Usage with components
//<motion.div
//    variants={fadeInUp}
//    initial="initial"
//    animate="animate"
//>
//    Your content here
//</motion.div>
//\`\`\`

//This creates a smooth fade-in effect that enhances user experience without being distracting.

//## Key Principles

//1. Performance First
//2. Accessibility Matters
//3. Consistent Design Language

//### Implementation Details

//When implementing these animations, consider the following:

//- Device capabilities
//- Motion preferences
//- Loading states

//> Remember: Subtle animations can greatly enhance UX when used appropriately.
//    `,
//	tags: ['Next.js', 'Design', 'Performance', 'Animation', 'Tailwind CSS'],
//	series: 'Web Development',
//}

//const authorInfo = {
//	name: 'Aditya',
//	role: 'Full Stack Developer',
//	bio: 'Building stuff with TypeScript, React, and Node.js. Open source enthusiast.',
//	avatar: '/assets/images/me.png',
//	socials: [
//		{
//			icon: Twitter,
//			url: 'https://twitter.com/yourusername',
//			username: '@yourusername',
//		},
//		{
//			icon: Github,
//			url: 'https://github.com/yourusername',
//			username: 'yourusername',
//		},
//		{
//			icon: Linkedin,
//			url: 'https://linkedin.com/in/yourusername',
//			username: 'in/yourusername',
//		},
//		{
//			icon: Globe,
//			url: 'https://yourwebsite.com',
//			username: 'yourwebsite.com',
//		},
//		{
//			icon: Mail,
//			url: 'mailto:you@example.com',
//			username: 'you@example.com',
//		},
//	],
//}

//export default function BlogPost({ params }: { params: { slug: string } }) {
//	const [copiedCode, setCopiedCode] = useState<string | null>(null)

//	const copyToClipboard = (code: string) => {
//		navigator.clipboard.writeText(code)
//		setCopiedCode(code)
//		setTimeout(() => setCopiedCode(null), 2000)
//	}

//	const renderCodeBlock = (code: string, language: string) => {
//		const lines = code.trim().split('\n')
//		return (
//			<div className="group relative my-8 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50">
//				<div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-800/50 px-4 py-2">
//					<span className="text-xs text-neutral-400">{language}</span>
//					<button
//						onClick={() => copyToClipboard(code)}
//						className="flex items-center gap-1 rounded px-2 py-1 text-xs text-neutral-500 transition-colors hover:text-neutral-300">
//						{copiedCode === code ? (
//							<Check className="h-3.5 w-3.5 text-green-500" />
//						) : (
//							<Copy className="h-3.5 w-3.5" />
//						)}
//						{copiedCode === code ? 'Copied!' : 'Copy'}
//					</button>
//				</div>
//				<div className={`overflow-x-auto p-4 ${firaCode.className}`}>
//					<div className="flex">
//						<div className="pr-4 text-right text-sm text-neutral-600 select-none">
//							{lines.map((_, i) => (
//								<div key={i + 1}>{i + 1}</div>
//							))}
//						</div>
//						<pre className="flex-1">
//							<code className="text-sm leading-relaxed text-neutral-200">
//								{lines.map((line, i) => (
//									<div key={i} className="whitespace-pre">
//										{line}
//									</div>
//								))}
//							</code>
//						</pre>
//					</div>
//				</div>
//			</div>
//		)
//	}

//	return (
//		<div className="mx-auto min-h-screen max-w-4xl bg-neutral-950">
//			{/* Terminal Header */}
//			<div className="sticky top-0 z-10 border-b border-dashed border-neutral-800 bg-neutral-950/80 backdrop-blur">
//				<div className="mb-2 flex items-center gap-2 border-b border-dashed border-neutral-700/50 bg-neutral-900/50 px-4 py-2">
//					<Terminal className="h-3.5 w-3.5 text-emerald-500" />
//					<span className="font-mono text-xs text-neutral-400">
//						reader
//					</span>
//					<ChevronRight className="h-3 w-3 text-neutral-600" />
//					<span className="font-mono text-xs text-emerald-500/80">
//						~/{params.slug}
//					</span>
//					<span className="ml-1 inline-block h-3 w-2 animate-pulse bg-emerald-500" />
//				</div>

//				<div className="flex items-center justify-between px-4 py-2 font-mono text-xs">
//					<div className="flex items-center gap-4">
//						<Link
//							href="/blog"
//							className="group flex items-center gap-2 text-neutral-500 hover:text-neutral-300">
//							<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
//							<span className="text-emerald-500/80">cd</span> ..
//						</Link>
//						<span className="flex items-center gap-2">
//							<span className="text-emerald-500/80">pwd</span>
//							<span className="text-neutral-500">
//								/blog/{params.slug}
//							</span>
//						</span>
//					</div>
//				</div>
//			</div>

//			<div className="relative p-6 md:p-8 lg:p-12">
//				{/* Article Header */}
//				<header className="mb-16">
//					<div className="space-y-6">
//						{/* Post Title */}
//						<div className="space-y-2">
//							<div className="font-mono text-xs">
//								<span className="text-emerald-500">➜</span>
//								<span className="text-neutral-500"> cat</span>
//								<span className="text-blue-400">
//									{' '}
//									{params.slug}.md
//								</span>
//							</div>
//							<motion.h1
//								initial={{ opacity: 0, y: 20 }}
//								animate={{ opacity: 1, y: 0 }}
//								className="text-4xl font-light tracking-tight text-neutral-200 md:text-5xl">
//								{dummyPost.title}
//							</motion.h1>
//						</div>

//						{/* Metadata */}
//						<div className="flex flex-wrap items-center gap-4 border-y border-dashed border-neutral-800 py-4 text-sm">
//							<span className="flex items-center gap-2 font-mono text-xs">
//								<span className="text-blue-500/80">--date</span>
//								<time
//									dateTime={dummyPost.date}
//									className="text-neutral-400 tabular-nums">
//									{new Date(
//										dummyPost.date,
//									).toLocaleDateString('en-US', {
//										year: 'numeric',
//										month: 'long',
//										day: 'numeric',
//									})}
//								</time>
//							</span>
//							<span className="flex items-center gap-2 font-mono text-xs">
//								<span className="text-blue-500/80">--time</span>
//								<span className="text-neutral-400">
//									{dummyPost.readTime}
//								</span>
//							</span>
//						</div>
//					</div>
//				</header>

//				{/* Article Content */}
//				<motion.article
//					initial={{ opacity: 0 }}
//					animate={{ opacity: 1 }}
//					transition={{ delay: 0.2 }}
//					className="prose prose-invert prose-p:text-lg prose-p:leading-relaxed prose-p:text-neutral-300 prose-headings:font-light prose-headings:tracking-tight prose-headings:text-neutral-200 prose-h2:mt-16 prose-h2:border-b prose-h2:border-dashed prose-h2:border-neutral-800 prose-h2:pb-4 prose-h2:text-3xl prose-h3:mt-8 prose-h3:text-2xl prose-code:font-mono prose-code:text-emerald-400 prose-pre:my-0 prose-pre:bg-transparent prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-2 prose-blockquote:border-neutral-700 prose-blockquote:text-neutral-400 prose-ul:my-8 prose-li:my-2 prose-li:text-neutral-300 mx-auto max-w-none">
//					{dummyPost.content.split('\n\n').map((block, idx) => {
//						if (block.startsWith('```')) {
//							const [lang, ...code] = block
//								.replace('```tsx', '')
//								.replace('```', '')
//								.split('\n')
//							return renderCodeBlock(code.join('\n'), 'tsx')
//						}
//						return <p key={idx}>{block}</p>
//					})}
//				</motion.article>

//				{/* Enhanced Footer with Author Info */}
//				<footer className="mt-16 border-t border-dashed border-neutral-800 pt-8">
//					<div className="space-y-6 font-mono">
//						{/* Command Line Header */}
//						<div className="text-xs">
//							<span className="text-emerald-500">➜</span>
//							<span className="text-neutral-500"> get</span>
//							<span className="text-blue-400"> author-info</span>
//						</div>

//						{/* Author Card */}
//						<div className="rounded-lg border border-dashed border-neutral-800 bg-neutral-900/50">
//							<div className="border-b border-dashed border-neutral-800 bg-neutral-900/50 px-4 py-2">
//								<div className="flex items-center justify-between">
//									<span className="text-xs text-neutral-500">
//										author.json
//									</span>
//									<span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500"></span>
//								</div>
//							</div>

//							<div className="p-4">
//								<div className="flex gap-6">
//									<div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
//										{/* Add Image component if needed */}
//									</div>

//									<div className="space-y-3">
//										<div>
//											<div className="text-lg text-neutral-200">
//												{authorInfo.name}
//											</div>
//											<div className="text-sm text-neutral-500">
//												{authorInfo.role}
//											</div>
//										</div>
//										<p className="text-sm text-neutral-400">
//											{authorInfo.bio}
//										</p>
//									</div>
//								</div>

//								{/* Social Links */}
//								<div className="mt-6">
//									<div className="mb-2 text-xs text-neutral-500">
//										<span className="text-emerald-500">
//											$
//										</span>{' '}
//										ls socials/
//									</div>
//									<div className="flex flex-wrap gap-3">
//										{authorInfo.socials.map(
//											(social, index) => (
//												<a
//													key={index}
//													href={social.url}
//													target="_blank"
//													rel="noopener noreferrer"
//													className="group flex items-center gap-2 rounded border border-neutral-800 bg-neutral-900/50 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:border-neutral-700 hover:text-neutral-300">
//													<social.icon className="h-3.5 w-3.5" />
//													<span className="font-mono">
//														{social.username}
//													</span>
//												</a>
//											),
//										)}
//									</div>
//								</div>

//								{/* More Articles */}
//								<div className="mt-6 border-t border-dashed border-neutral-800 pt-4">
//									<div className="mb-2 text-xs text-neutral-500">
//										<span className="text-emerald-500">
//											$
//										</span>{' '}
//										find more-articles/
//									</div>
//									<div className="space-y-2">
//										{[
//											'Article 1',
//											'Article 2',
//											'Article 3',
//										].map((article, i) => (
//											<div
//												key={i}
//												className="flex items-center gap-2 text-xs">
//												<span className="text-emerald-500">
//													└──
//												</span>
//												<Link
//													href="#"
//													className="text-neutral-400 hover:text-neutral-200">
//													{article}.md
//												</Link>
//											</div>
//										))}
//									</div>
//								</div>
//							</div>
//						</div>
//					</div>
//				</footer>
//			</div>
//		</div>
//	)
//}
