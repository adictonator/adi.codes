import { getPostBySlug, getAllPosts } from '@/lib/mdx'
import { MDXRemote } from 'next-mdx-remote/rsc'
import AnimatedBlogPost from '@/components/blog/animated-blog-post'
import CodeBlock from '@/components/blog/code-block'

// Define custom MDX components
const mdxComponents = {
	// Custom code block rendering
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

	return {
		title,
		description,
		keywords: tags?.join(', '),
		authors: [{ name: 'Aditya Bhaskar Sharma' }],
		publisher: 'Aditya Bhaskar Sharma',
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			authors: ['Aditya Bhaskar Sharma'],
			tags,
			url: `/blog/${slug}`,
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

	// Structured data for SEO
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
