// Compiles every post in content/blog with the same MDX + remark-gfm setup
// the site uses (app/blog/[slug]/page.tsx), so syntax that would fail the
// Vercel build — `<https://…>` autolinks, a stray `{`, an unclosed tag —
// fails here first, with the line number.
//
//   bun run test:mdx            all posts
//   bun run test:mdx my-post    just one

const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const contentDir = path.join(process.cwd(), 'content', 'blog')

async function checkFile(file, compile, remarkGfm) {
	const slug = file.replace(/\.mdx?$/, '')
	const src = fs.readFileSync(path.join(contentDir, file), 'utf8')
	const problems = []

	if (!src.trim()) return { slug, problems: ['file is empty'] }

	const { data, content } = matter(src)
	if (!data || Object.keys(data).length === 0)
		problems.push('missing frontmatter')
	if (!content.trim()) problems.push('empty body')

	try {
		await compile(content, { remarkPlugins: [remarkGfm] })
	} catch (err) {
		// gray-matter strips the frontmatter, so shift line numbers back.
		const offset = src.slice(0, src.indexOf(content)).split('\n').length - 1
		const line = err.line ? `line ${err.line + offset}: ` : ''
		problems.push(`MDX won't compile — ${line}${err.reason || err.message}`)
	}

	return { slug, draft: data.status === 'draft', problems }
}

async function run() {
	if (!fs.existsSync(contentDir)) {
		console.log('No content/blog directory')
		return
	}

	const only = process.argv[2]
	const files = fs
		.readdirSync(contentDir)
		.filter(f => /\.mdx?$/.test(f))
		.filter(f => !only || f.replace(/\.mdx?$/, '') === only)

	if (!files.length) {
		console.log(only ? `No post named "${only}"` : 'No blog files found')
		process.exit(only ? 1 : 0)
	}

	const { compile } = await import('@mdx-js/mdx')
	const { default: remarkGfm } = await import('remark-gfm')

	let failedPublished = 0
	for (const file of files) {
		const { slug, draft, problems } = await checkFile(file, compile, remarkGfm)
		const label = `${slug}${draft ? ' [draft]' : ''}`
		if (problems.length === 0) {
			console.log(`OK    ${label}`)
		} else {
			console.log(`FAIL  ${label}`)
			for (const p of problems) console.log(`        ${p}`)
			if (!draft) failedPublished++
		}
	}

	// Drafts are reported but only published posts fail the run — a broken
	// draft doesn't block deploying everything else.
	if (failedPublished) process.exit(1)
}

run().catch(err => {
	console.error(err)
	process.exit(1)
})
