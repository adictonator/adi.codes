const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const contentDir = path.join(process.cwd(), 'content', 'blog')
const outDir = path.join(process.cwd(), 'scripts', 'seo-reports')

// Load config if present
let config = {
	minScore: 60,
	weights: {
		title: 8,
		description: 12,
		h1: 10,
		wordCount: 8,
		readingTime: 4,
		slugMatch: 10,
		ogImage: 12,
		imageAlt: 8,
		internalLinks: 6,
		canonical: 10,
		accessibility: 2,
	},
}

const cfgPath = path.join(process.cwd(), 'seo.config.json')
if (fs.existsSync(cfgPath)) {
	try {
		const data = fs.readFileSync(cfgPath, 'utf8')
		const parsed = JSON.parse(data)
		config = Object.assign(config, parsed)
	} catch (e) {
		console.warn('Could not parse seo.config.json, using defaults')
	}
}

function readPosts() {
	if (!fs.existsSync(contentDir)) return []
	return fs
		.readdirSync(contentDir)
		.filter(f => f.endsWith('.md') || f.endsWith('.mdx'))
}

function wordsCount(text) {
	if (!text) return 0
	return text.trim().split(/\s+/).filter(Boolean).length
}

function readingTimeMins(words) {
	const wpm = 200
	return Math.max(1, Math.round(words / wpm))
}

function extractFirstH1(content) {
	const m = content.match(/^#\s+(.+)$/m)
	return m ? m[1].trim() : null
}

function countImages(content) {
	const regex = /!\[([^\]]*)\]\(([^)]+)\)/g
	let m
	let total = 0
	let withAlt = 0
	while ((m = regex.exec(content))) {
		total++
		if (m[1] && m[1].trim()) withAlt++
	}
	return { total, withAlt }
}

function countInternalLinks(content) {
	// markdown link with relative or site-root path
	const regex = /\[[^\]]+\]\((\/[^)]+|[^:\)\s][^)]+)\)/g
	let m
	let total = 0
	while ((m = regex.exec(content))) {
		const href = m[1]
		if (href && (href.startsWith('/') || !href.startsWith('http'))) total++
	}
	return total
}

function normalizeSlug(slug) {
	return slug.replace(/[^a-z0-9\-]/gi, '-').toLowerCase()
}

function scoreTitleLength(title) {
	if (!title) return 0
	const len = title.length
	// ideal 50-60
	if (len >= 50 && len <= 60) return config.weights.title
	if (len >= 30 && len < 50) return Math.round(config.weights.title * 0.8)
	if (len > 60 && len <= 80) return Math.round(config.weights.title * 0.6)
	return 0
}

function scoreDescription(desc) {
	if (!desc) return 0
	const len = desc.length
	if (len >= 140 && len <= 160) return config.weights.description
	if (len >= 120 && len < 140)
		return Math.round(config.weights.description * 0.8)
	if (len > 160 && len <= 200)
		return Math.round(config.weights.description * 0.6)
	return 0
}

function scoreH1(found) {
	return found ? config.weights.h1 : 0
}

function scoreWordCount(words) {
	if (words >= 800) return config.weights.wordCount
	if (words >= 500) return Math.round(config.weights.wordCount * 0.9)
	if (words >= 300) return Math.round(config.weights.wordCount * 0.7)
	return Math.round(config.weights.wordCount * 0.3)
}

function scoreReadingTime(mins) {
	if (mins >= 2 && mins <= 8) return config.weights.readingTime
	return Math.round(config.weights.readingTime * 0.5)
}

function scoreSlugMatch(title, slug) {
	if (!title || !slug) return 0
	const titleTokens = title
		.toLowerCase()
		.split(/[^a-z0-9]+/)
		.filter(Boolean)
	const slugNorm = normalizeSlug(slug)
	const matches = titleTokens.filter(t => slugNorm.includes(t)).length
	const ratio = matches / Math.max(1, titleTokens.length)
	return Math.round(config.weights.slugMatch * ratio)
}

function scoreOgImage(frontmatter) {
	return frontmatter.image || frontmatter.ogImage || frontmatter.og_image
		? config.weights.ogImage
		: 0
}

function scoreImageAlt(total, withAlt) {
	if (total === 0) return Math.round(config.weights.imageAlt * 0.75)
	const ratio = withAlt / total
	return Math.round(config.weights.imageAlt * ratio)
}

function scoreInternalLinks(n) {
	return n >= 1 ? config.weights.internalLinks : 0
}

function scoreCanonical(frontmatter) {
	return frontmatter.canonical ||
		frontmatter.canonical_url ||
		frontmatter.canonicalUrl
		? config.weights.canonical
		: 0
}

function scoreAccessibility(totalImages, withAlt) {
	if (totalImages === 0) return Math.round(config.weights.accessibility * 0.9)
	const ratio = withAlt / totalImages
	return Math.round(config.weights.accessibility * ratio)
}

function clamp(n, min = 0, max = 100) {
	return Math.max(min, Math.min(max, n))
}

function analyzePost(file) {
	const slug = file.replace(/\.mdx?$/, '')
	const filePath = path.join(contentDir, file)
	const raw = fs.readFileSync(filePath, 'utf8')
	const { data: fm, content } = matter(raw)

	const title = fm.title || fm.metaTitle || ''
	const description = fm.description || fm.metaDescription || ''
	const bodyH1 = extractFirstH1(content)
	// The site template (`app/blog/[slug]/page.tsx`) uses frontmatter.title as the H1
	// so consider frontmatter.title as satisfying the H1 requirement.
	const h1Present = bodyH1 || fm.title || ''
	const words = wordsCount(content)
	const mins = readingTimeMins(words)
	const images = countImages(content)
	const links = countInternalLinks(content)

	const signals = {}
	signals.title = { value: title, score: scoreTitleLength(title) }
	signals.description = {
		value: description,
		score: scoreDescription(description),
	}
	signals.h1 = {
		value: h1Present,
		from: bodyH1 ? 'body' : fm.title ? 'frontmatter' : 'missing',
		score: scoreH1(!!h1Present),
	}
	signals.wordCount = { value: words, score: scoreWordCount(words) }
	signals.readingTime = { value: mins, score: scoreReadingTime(mins) }
	signals.slugMatch = { value: slug, score: scoreSlugMatch(title, slug) }
	signals.ogImage = {
		value: !!(fm.image || fm.ogImage || fm.og_image),
		score: scoreOgImage(fm),
	}
	signals.imageAlt = {
		value: images,
		score: scoreImageAlt(images.total, images.withAlt),
	}
	signals.internalLinks = { value: links, score: scoreInternalLinks(links) }
	signals.canonical = {
		value: !!(fm.canonical || fm.canonical_url || fm.canonicalUrl),
		score: scoreCanonical(fm),
	}
	signals.accessibility = {
		value: { totalImages: images.total, withAlt: images.withAlt },
		score: scoreAccessibility(images.total, images.withAlt),
	}

	let totalScore = 0
	for (const k in signals) totalScore += signals[k].score
	totalScore = clamp(totalScore, 0, 100)

	const recommendations = []
	if (!fm.title) recommendations.push('Add a title in frontmatter')
	if (!description)
		recommendations.push('Add a meta description (140-160 chars)')
	// H1 is provided via frontmatter.title in the site template; do not recommend adding an H1 here
	if (words < 300)
		recommendations.push('Consider increasing word count (min 300 words)')
	if (!fm.image && !fm.ogImage && !fm.og_image)
		recommendations.push(
			'Add an og/image in frontmatter for social previews',
		)
	if (images.total > 0 && images.withAlt < images.total)
		recommendations.push('Add alt text to images for accessibility and SEO')
	if (links < 1)
		recommendations.push('Add at least one internal link to other content')
	if (!(fm.canonical || fm.canonical_url || fm.canonicalUrl))
		recommendations.push('Add a canonical URL to frontmatter')

	return { slug, file: filePath, score: totalScore, signals, recommendations }
}

function ensureOutDir() {
	if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
}

function run() {
	const files = readPosts()
	if (!files.length) {
		console.log('No blog posts found in content/blog')
		process.exit(0)
	}

	ensureOutDir()
	const reports = []
	for (const f of files) {
		const r = analyzePost(f)
		reports.push(r)
		const outPath = path.join(outDir, `${r.slug}.json`)
		fs.writeFileSync(outPath, JSON.stringify(r, null, 2), 'utf8')
		// Human summary
		console.log(`Post: ${r.slug} — Score: ${r.score}/100`)
		for (const rec of r.recommendations) console.log(`  - ${rec}`)
		console.log('')
	}

	// Summary
	const avg = Math.round(
		reports.reduce((s, r) => s + r.score, 0) / reports.length,
	)
	console.log(`Average SEO score: ${avg}/100 across ${reports.length} posts`)

	if (reports.some(r => r.score < config.minScore)) {
		console.error(
			`One or more posts scored below the minScore (${config.minScore})`,
		)
		process.exit(2)
	}
}

run()
