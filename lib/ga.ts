export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ''

export const isGaEnabled = GA_MEASUREMENT_ID.length > 0

type EventParams = Record<string, unknown>

const hasWindow = () => typeof window !== 'undefined'

export function pageview(url: string) {
	if (!isGaEnabled || !hasWindow()) return
	window.gtag?.('config', GA_MEASUREMENT_ID, {
		page_path: url,
	})
}

export function trackEvent(action: string, params: EventParams = {}) {
	if (!isGaEnabled || !hasWindow()) return
	window.gtag?.('event', action, params)
}

export function trackScrollDepth({
	slug,
	percent,
}: {
	slug: string
	percent: number
}) {
	trackEvent('scroll_depth', {
		event_category: 'engagement',
		content_type: 'blog_post',
		content_slug: slug,
		percent_scrolled: percent,
	})
}

export function trackOutboundClick({
	url,
	text,
	slug,
	location,
}: {
	url: string
	text: string
	slug?: string
	location: string
}) {
	trackEvent('outbound_click', {
		event_category: 'engagement',
		link_url: url,
		link_text: text,
		link_domain: getDomain(url),
		content_type: slug ? 'blog_post' : 'site',
		content_slug: slug,
		page_location: location,
	})
}

export function trackNewsletterSignup({
	method = 'newsletter_form',
	slug,
}: {
	method?: string
	slug?: string
}) {
	trackEvent('sign_up', {
		method,
		content_type: slug ? 'blog_post' : 'site',
		content_slug: slug,
	})
}

export function trackHireClick({ method }: { method: 'book' | 'email' }) {
	trackEvent('hire_click', {
		event_category: 'engagement',
		method,
	})
}

export function trackResumeClick({ variant }: { variant: string }) {
	trackEvent('resume_download', {
		event_category: 'engagement',
		variant,
	})
}

export function trackProjectClick({
	project,
	linkType,
	url,
}: {
	project: string
	linkType: string
	url: string
}) {
	trackEvent('project_click', {
		event_category: 'engagement',
		project_title: project,
		link_type: linkType,
		link_url: url,
		link_domain: getDomain(url),
	})
}

function getDomain(url: string) {
	try {
		return new URL(url).hostname
	} catch (error) {
		return 'unknown'
	}
}
