'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Fira_Code } from 'next/font/google'
import { Highlight, themes } from 'prism-react-renderer'

const firaCode = Fira_Code({ subsets: ['latin'] })

interface CodeBlockProps {
	children: string
	className?: string
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
	const [copied, setCopied] = useState(false)

	// Extract language from className (e.g., "language-tsx" -> "tsx")
	const language = className?.replace('language-', '') || 'text'
	const code = children.trim()

	const copyToClipboard = () => {
		navigator.clipboard.writeText(code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className="group relative my-8 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50">
			<div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-800/50 px-4 py-2">
				<span className="text-xs text-neutral-400">{language}</span>
				<button
					onClick={copyToClipboard}
					className="flex items-center gap-1 rounded px-2 py-1 text-xs text-neutral-500 transition-colors hover:text-neutral-300">
					{copied ? (
						<Check className="h-3.5 w-3.5 text-green-500" />
					) : (
						<Copy className="h-3.5 w-3.5" />
					)}
					{copied ? 'Copied!' : 'Copy'}
				</button>
			</div>
			<div className="relative overflow-x-auto">
				<Highlight
					theme={themes.oneDark}
					code={code}
					language={language as any}>
					{({
						className,
						style,
						tokens,
						getLineProps,
						getTokenProps,
					}) => (
						<div className="flex">
							{/* Line numbers gutter */}
							<div
								className={`sticky left-0 z-10 border-r border-neutral-800 bg-neutral-900/90 py-4 pr-3 pl-4 text-right select-none ${firaCode.className}`}>
								{tokens.map((line, i) => (
									<div
										key={i + 1}
										className="relative flex h-6 items-center justify-end text-sm leading-relaxed text-neutral-600">
										<span>{i + 1}</span>
									</div>
								))}
							</div>
							{/* Code content */}
							<pre
								className={`flex-1 p-4 ${firaCode.className} text-sm leading-relaxed`}
								style={{
									...style,
									backgroundColor: 'transparent',
									margin: 0,
									fontSize: '14px',
									lineHeight: '1.5rem',
								}}>
								{tokens.map((line, i) => {
									const lineProps = getLineProps({
										line,
										key: i,
									})
									const { key: lineKey, ...restLineProps } =
										lineProps
									return (
										<div
											key={i}
											{...restLineProps}
											className="h-6"
											style={{ margin: 0, padding: 0 }}>
											{line.map((token, key) => (
												<span
													{...getTokenProps({
														token,
														key,
													})}
													style={{
														...getTokenProps({
															token,
															key,
														}).style,
														fontFamily: 'inherit',
														fontSize: 'inherit',
														lineHeight: 'inherit',
													}}
												/>
											))}
										</div>
									)
								})}
							</pre>
						</div>
					)}
				</Highlight>
			</div>
		</div>
	)
}
