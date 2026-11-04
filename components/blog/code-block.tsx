'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { Highlight, themes } from 'prism-react-renderer'

interface CodeBlockProps {
	children: string
	className?: string
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
	const [copied, setCopied] = useState(false)

	// "language-tsx" -> "tsx"
	const language = className?.replace('language-', '') || 'text'
	const code = children.trim()

	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(code)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch {
			// Clipboard can be blocked (http, iframes); nothing useful to show.
		}
	}

	// `dark` keeps the block dark in light mode: the syntax theme is a dark one.
	return (
		<div className="dark not-prose group relative my-8 overflow-hidden border border-dashed border-neutral-800 bg-neutral-900 text-neutral-200">
			<div className="flex items-center justify-between border-b border-dashed border-neutral-800 bg-neutral-900/80 px-4 py-2 font-mono">
				<span className="text-xs text-neutral-400">{language}</span>
				<button
					type="button"
					onClick={copyToClipboard}
					aria-label={copied ? 'Copied' : 'Copy code'}
					className="flex items-center gap-1 px-2 py-1 text-xs text-neutral-500 transition-colors hover:text-neutral-300">
					{copied ? (
						<Check className="size-3.5 text-emerald-500" />
					) : (
						<Copy className="size-3.5" />
					)}
					<span aria-live="polite">{copied ? 'Copied!' : 'Copy'}</span>
				</button>
			</div>
			<div className="relative overflow-x-auto">
				<Highlight
					theme={themes.oneDark}
					code={code}
					language={language}>
					{({ style, tokens, getLineProps, getTokenProps }) => (
						<div className="font-fira flex text-sm leading-6">
							{/* Line numbers */}
							<div
								aria-hidden="true"
								className="sticky left-0 z-10 border-r border-dashed border-neutral-800 bg-neutral-900 py-4 pr-3 pl-4 text-right text-neutral-600 select-none">
								{tokens.map((_, i) => (
									<div key={i} className="h-6">
										{i + 1}
									</div>
								))}
							</div>
							<pre
								className="flex-1 p-4"
								style={{ ...style, backgroundColor: 'transparent', margin: 0 }}>
								{tokens.map((line, i) => {
									const { key: _lineKey, ...lineProps } =
										getLineProps({ line, key: i })
									return (
										<div key={i} {...lineProps} className="h-6">
											{line.map((token, key) => {
												const { key: _tokenKey, ...tokenProps } =
													getTokenProps({ token, key })
												return <span key={key} {...tokenProps} />
											})}
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
