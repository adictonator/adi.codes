export const siteConfig = {
	name: 'Aditya Bhaskar Sharma',
	firstName: 'Aditya',
	role: 'Product Engineer',
	shortName: 'adi.codes',
	title: 'Aditya Bhaskar Sharma — Product Engineer · iOS, React Native & Web',
	// Meta description — keep it under ~160 characters, Google truncates the rest.
	description:
		'Product engineer, 13+ years, shipping iOS (Swift, SwiftUI), React Native and full-stack web apps solo. Open to full-time, contract & freelance work.',
	// Longer version for structured data, where there is no length budget.
	longDescription:
		'Product engineer with 13+ years of experience shipping iOS apps (Swift, SwiftUI), React Native, and full-stack web products (Next.js, Laravel, TypeScript). I own the whole loop — product decisions, architecture, code, and App Store releases. Founder of LazyCodeLab, a one-person app, Shopify and web studio. Open to full-time roles, contract work (short or long term) and freelance projects, remote.',
	url: 'https://adi.codes',
	baseKeywords: [
		'Aditya Bhaskar Sharma',
		'product engineer',
		'senior product engineer',
		'product engineer portfolio',
		'software engineer portfolio',
		'senior software engineer',
		'iOS engineer',
		'iOS developer',
		'Swift developer',
		'SwiftUI',
		'React Native developer',
		'Next.js developer',
		'full-stack engineer',
		'TypeScript engineer',
		'Laravel developer',
		'Shopify developer',
		'WordPress plugin developer',
		'indie app developer',
		'remote software engineer India',
		'hire product engineer',
		'contract iOS developer',
		'freelance React Native developer',
	],
	email: 'adityabhaskarsharma@gmail.com',
	image: '/assets/images/adi-new.png',
	// Small square crop of the about-section photo, for avatars.
	avatar: '/assets/images/me-avatar.jpg',
	resume: '/assets/resume/mobile-resume-latest.pdf',
	// What recruiters need to know without scrolling. Rendered in the mobile
	// intro, the hire section, and the availability card on every sub-page.
	availability: {
		headline: 'Open to full-time, contract & freelance work',
		location: 'Punjab, India',
		timezone: 'IST (GMT+5:30)',
		workMode: 'Remote-first, open to relocation for the right role',
	},
	studio: {
		name: 'LazyCodeLab',
		url: 'https://lazycodelab.com',
		start: 'https://lazycodelab.com/start',
		// Same words lazycodelab.com uses for itself — keep them in sync.
		tagline: 'one-person app, Shopify & web studio',
	},
	social: {
		linkedin: 'https://www.linkedin.com/in/-abs-',
		github: 'https://github.com/adictonator',
		threads: 'https://www.threads.com/@adictonator',
		x: 'https://x.com/adictonator',
		xHandle: '@adictonator',
		instagram: 'https://www.instagram.com/adictonator',
	},
	sameAs: [
		'https://www.linkedin.com/in/-abs-',
		'https://github.com/adictonator',
		'https://www.threads.com/@adictonator',
		'https://x.com/adictonator',
		'https://www.instagram.com/adictonator',
		'https://lazycodelab.com',
	],
	feed: '/feed.xml',
} as const

/** mailto: link with a pre-filled subject, so recruiter mail is easy to spot. */
export function mailto(subject = 'Role inquiry via adi.codes') {
	return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`
}
