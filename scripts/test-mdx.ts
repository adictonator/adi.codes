import fs from 'fs'
import path from 'path'
import { getAllPosts, getPostBySlug } from '../lib/mdx'

async function run() {
	const posts = getAllPosts()
	if (!posts || posts.length === 0) {
		console.log('No posts found in content/blog')
		process.exit(0)
	}

	let failed = false

	for (const p of posts) {
		const slug = p.slug
		process.stdout.write(`Checking ${slug} ... `)
		try {
			await getPostBySlug(slug)
			console.log('OK')
		} catch (err: any) {
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
		console.error('\nOne or more posts failed to compile')
		process.exit(1)
	} else {
		console.log('\nAll MDX posts compiled successfully')
		process.exit(0)
	}
}

run()
