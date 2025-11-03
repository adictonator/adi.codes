import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import AnimatedBlogPost from '@/components/blog/animated-blog-post'
import CodeBlock from '@/components/blog/code-block'

const mdxComponents = {
	pre: ({ children, ...props }: any) => {
		const codeElement = children?.props
		if (codeElement?.children && typeof codeElement.children === 'string') {
			const className = codeElement.className || 'language-text'
			return (
				<CodeBlock className={className}>
					{codeElement.children}
				</CodeBlock>
			)
		}
		return <pre {...props}>{children}</pre>
	},

	// Map heading elements so we can apply Tailwind classes directly from MDX
	h1: (props: any) => (
		<h1
			className="mt-8 mb-4 text-3xl leading-tight font-bold md:text-4xl"
			{...props}
		/>
	),
	h2: (props: any) => (
		<h2
			className="anchor mt-6 mb-3 text-2xl leading-tight font-semibold md:text-3xl"
			{...props}
		/>
	),
	h3: (props: any) => (
		<h3
			className="mt-5 mb-2 text-xl font-semibold md:text-2xl"
			{...props}
		/>
	),
	h4: (props: any) => (
		<h4 className="mt-4 mb-2 text-lg font-medium" {...props} />
	),
}

export async function generateStaticParams() {
	const posts = getAllPosts()
	return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const { frontmatter } = await getPostBySlug(slug)

	const title = `${frontmatter.title as string} | Aditya Sharma`
	const description = frontmatter.description as string
	const publishedTime = frontmatter.date as string
	const tags = frontmatter.tags as string[]
	// Ensure Open Graph images include the absolute URL to your dynamic OG endpoint
	const site = process.env.NEXT_PUBLIC_SITE_URL || 'https://adi.codes'
	const ogImage = `${site}/api/og/${slug}`

	return {
		title,
		description,
		keywords: tags?.join(', '),
		authors: [{ name: 'Aditya Bhaskar Sharma' }],
		publisher: 'Aditya Bhaskar Sharma',
		other: {
			copyright: `&copy; ${new Date(publishedTime).getFullYear()} Aditya Bhaskar Sharma. All rights reserved.`,
			license: 'CC BY-NC-ND 4.0 with AI restrictions',
			'license-url': 'https://adi.codes/license',
			'ai-training': 'prohibited',
		},
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			authors: ['Aditya Bhaskar Sharma'],
			tags: frontmatter.tags as string[],
			url: `${site}/blog/${slug}`,
			images: [ogImage],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			creator: '@adictonator',
		},
		alternates: {
			canonical: `/blog/${slug}`,
		},
	}
}

export default async function BlogPost({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const { frontmatter, mdxContent } = await getPostBySlug(slug)

	const structuredData = {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: frontmatter.title,
		description: frontmatter.description,
		author: {
			'@type': 'Person',
			name: 'Aditya Bhaskar Sharma',
		},
		publisher: {
			'@type': 'Person',
			name: 'Aditya Bhaskar Sharma',
		},
		datePublished: frontmatter.date,
		dateModified: frontmatter.date,
		keywords: (frontmatter.tags as string[])?.join(', '),
		url: `/blog/${slug}`,
		license: 'https://adi.codes/license',
		copyrightHolder: {
			'@type': 'Person',
			name: 'Aditya Bhaskar Sharma',
		},
		copyrightYear: new Date(frontmatter.date as string).getFullYear(),
		copyrightNotice:
			'© Aditya Bhaskar Sharma. All rights reserved. This content may not be used for AI training without explicit written permission.',
		conditionsOfAccess:
			'This work is licensed under CC BY-NC-ND 4.0 with additional AI use restrictions. See https://adi.codes/license for full terms.',
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(structuredData),
				}}
			/>
			<AnimatedBlogPost
				slug={slug}
				title={frontmatter.title as string}
				date={frontmatter.date as string}
				tags={frontmatter.tags as string[]}>
				<MDXRemote source={mdxContent} components={mdxComponents} />
			</AnimatedBlogPost>
		</>
	)
}
