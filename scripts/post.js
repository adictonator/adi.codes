// Blog post helpers. Everything here edits files in content/blog; nothing
// commits or pushes — deploying is still `git push`.
//
//   bun run post:new "Why I chose Swift over React Native"
//       Creates content/blog/why-i-chose-swift-over-react-native.md as a
//       draft with every frontmatter field the site reads.
//
//   bun run post:publish why-i-chose-swift-over-react-native
//       Checks the post, sets `date` to today, and removes `status: 'draft'`.
//       Add --keep-date to leave the date as written.

const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const matter = require('gray-matter')

const contentDir = path.join(process.cwd(), 'content', 'blog')
const today = new Date().toISOString().slice(0, 10)

// Only articles are dropped; anything more and slugs stop reading like the title.
const STOP_WORDS = new Set(['a', 'an', 'the'])

function slugify(title) {
	const words = title
		.toLowerCase()
		.replace(/['’]/g, '')
		.replace(/[^a-z0-9]+/g, ' ')
		.trim()
		.split(/\s+/)
	// Drop filler words, but keep the slug readable if that empties it.
	const kept = words.filter(w => !STOP_WORDS.has(w))
	return (kept.length >= 2 ? kept : words).slice(0, 8).join('-')
}

function fail(message) {
	console.error(`\n  ✗ ${message}\n`)
	process.exit(1)
}

function newPost(title) {
	if (!title) fail('Give the post a title: bun run post:new "My post title"')
	const slug = slugify(title)
	const file = path.join(contentDir, `${slug}.md`)
	if (fs.existsSync(file)) fail(`content/blog/${slug}.md already exists`)

	const quoted = title.replace(/'/g, "''")
	fs.mkdirSync(contentDir, { recursive: true })
	fs.writeFileSync(
		file,
		`---
title: '${quoted}'
date: '${today}'
description: 'One or two sentences, 140–160 characters. This is the text under the title in Google and in link previews.'
status: 'draft'
tags: []
---

Start here. Use \`##\` for section headings — the title above is already the page's \`#\`.

Link to at least one other page on the site, like [my projects](/projects).
`,
	)
	console.log(`\n  ✓ Created content/blog/${slug}.md (draft)`)
	console.log(`    The filename is the URL: /blog/${slug} — rename it now if you want a different one.`)
	console.log(`    Preview: bun run dev → http://localhost:3000/blog/${slug}\n`)
}

function checkPost(slug, data, content) {
	const errors = []
	const warnings = []

	if (!data.title) errors.push('`title` is missing')
	else if (data.title.length > 65) warnings.push(`title is ${data.title.length} characters; Google cuts off around 60`)

	if (!data.description || /^One or two sentences/.test(data.description))
		errors.push('`description` is missing or still the placeholder')
	else if (data.description.length < 100 || data.description.length > 170)
		warnings.push(`description is ${data.description.length} characters; aim for 140–160`)

	const tags = Array.isArray(data.tags) ? data.tags : []
	if (tags.length === 0) warnings.push('no `tags` — they feed related posts, keywords and the RSS categories')

	const words = content.trim().split(/\s+/).filter(Boolean).length
	if (words < 300) warnings.push(`only ${words} words`)

	if (/^#\s/m.test(content)) warnings.push('a `# heading` in the body — it renders as ##, but start sections at ## anyway')
	if (!/\]\(\/[^)]*\)/.test(content)) warnings.push('no internal link (e.g. [projects](/projects)) — the easiest SEO win there is')

	const images = [...content.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g)]
	for (const [, alt, src] of images) {
		if (!alt.trim()) errors.push(`image without alt text: ${src}`)
		if (src.startsWith('/') && !fs.existsSync(path.join(process.cwd(), 'public', src)))
			errors.push(`image not found in public/: ${src}`)
	}

	if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug))
		errors.push('filename must be lowercase words joined by hyphens')

	return { errors, warnings }
}

function publishPost(slug, keepDate) {
	if (!slug) fail('Which post? bun run post:publish <filename-without-.md>')
	const fileName = ['md', 'mdx'].map(ext => `${slug}.${ext}`).find(f => fs.existsSync(path.join(contentDir, f)))
	if (!fileName) fail(`content/blog/${slug}.md not found`)

	const file = path.join(contentDir, fileName)
	const source = fs.readFileSync(file, 'utf8')
	const { data, content } = matter(source)

	const { errors, warnings } = checkPost(slug, data, content)
	for (const w of warnings) console.log(`  ! ${w}`)
	if (errors.length) {
		for (const e of errors) console.error(`  ✗ ${e}`)
		fail('Fix the above, then run this again.')
	}

	// Same compile the build does; stops a post that would break the deploy.
	try {
		execFileSync(process.execPath, [path.join(__dirname, 'test-mdx.js'), slug], { stdio: 'inherit' })
	} catch {
		fail('The post does not compile as MDX (see above).')
	}

	// Edit the frontmatter lines in place so the rest of the file — quoting,
	// comments, field order — stays exactly as written.
	const end = source.indexOf('\n---', 3)
	let front = source.slice(0, end)
	const body = source.slice(end)
	front = front.replace(/^status:\s*['"]?draft['"]?\s*\n?/m, '')
	if (!keepDate) front = front.replace(/^date:.*$/m, `date: '${today}'`)
	fs.writeFileSync(file, front + body)

	console.log(`\n  ✓ Published ${fileName}${keepDate ? '' : ` (dated ${today})`}`)
	console.log('    Ship it:')
	console.log(`      git add content/blog/${fileName} && git commit -m "post: ${data.title.replace(/"/g, '\\"')}" && git push\n`)
	console.log('    Once deployed it is on /blog, the homepage, the sitemap and /feed.xml.\n')
}

const [command, ...args] = process.argv.slice(2)
if (command === 'new') newPost(args.join(' ').trim())
else if (command === 'publish') publishPost(args.find(a => !a.startsWith('--')), args.includes('--keep-date'))
else fail('Usage: post.js new "Title" | post.js publish <slug> [--keep-date]')
