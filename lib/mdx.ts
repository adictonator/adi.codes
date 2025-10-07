import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'

const contentDir = path.join(process.cwd(), 'content', 'blog')

type PostData = {
	slug: string
	title?: string
	date?: string
	description?: string
	tags?: string[]
	[key: string]: any
}

export function getAllPosts(): PostData[] {
	if (!fs.existsSync(contentDir)) {
		return []
	}

	const files = fs.readdirSync(contentDir)

	return files
		.filter(
			fileName => fileName.endsWith('.md') || fileName.endsWith('.mdx'),
		)
		.map(fileName => {
			const slug = fileName.replace(/\.mdx?$/, '')
			const filePath = path.join(contentDir, fileName)
			const fileContent = fs.readFileSync(filePath, 'utf8')
			const { data } = matter(fileContent)
			return { slug, ...data } as PostData
		})
		.sort((a, b) => {
			const dateA = a.date ? new Date(a.date).getTime() : 0
			const dateB = b.date ? new Date(b.date).getTime() : 0
			return dateB - dateA
		})
}

export async function getPostBySlug(slug: string) {
	const filePath = path.join(contentDir, `${slug}.md`)
	const source = fs.readFileSync(filePath, 'utf8')

	// Check if content is empty
	if (!source || source.trim() === '') {
		throw new Error(`Empty content for post: ${slug}`)
	}

	// Parse frontmatter manually first
	const { content: mdxContent, data: frontmatter } = matter(source)

	// Then compile the MDX content
	const { content } = await compileMDX({
		source: mdxContent,
		options: {
			mdxOptions: {
				remarkPlugins: [
					// Use dynamic imports instead of require
					(await import('remark-gfm')).default,
				],
				rehypePlugins: [
					(await import('rehype-slug')).default,
					[
						(await import('rehype-autolink-headings')).default,
						{
							behavior: 'wrap',
							properties: {
								className: ['anchor'],
							},
						},
					],
				],
			},
		},
	})

	return { frontmatter, content, mdxContent, slug }
}
