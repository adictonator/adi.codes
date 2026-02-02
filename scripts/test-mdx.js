const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const contentDir = path.join(process.cwd(), 'content', 'blog')

function getAllFiles() {
	if (!fs.existsSync(contentDir)) return []
	return fs
		.readdirSync(contentDir)
		.filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
}

async function run() {
	const files = getAllFiles()
	if (!files.length) {
		console.log('No blog files found in content/blog')
		process.exit(0)
	}

	let failed = false

	for (const file of files) {
		const slug = file.replace(/\.mdx?$/, '')
		process.stdout.write(`Checking ${slug} ... `)
		const filePath = path.join(contentDir, file)
		try {
			const src = fs.readFileSync(filePath, 'utf8')
			if (!src || !src.trim()) throw new Error('Empty file')
			const { data, content } = matter(src)
			if (!data || Object.keys(data).length === 0)
				throw new Error('Missing frontmatter')
			if (!content || !content.trim())
				throw new Error('Empty content body')
			console.log('OK')
		} catch (err) {
			console.error(
				'\nERROR in',
				slug,
				':',
				err && err.message ? err.message : err,
			)
			failed = true
		}
	}

	if (failed) {
		console.error('\nOne or more posts failed checks')
		process.exit(1)
	}
	console.log('\nAll blog posts passed basic MD checks')
	process.exit(0)
}

run()
