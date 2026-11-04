/**
 * Format section name for minimized terminal view
 */
export function formatSectionName(section: string): string {
	switch (section) {
		case 'experience':
			return '~/exp'
		case 'connect':
			return '~/social'
		case 'lab':
			return '~/projects'
		case 'blog':
			return '~/notes'
		default:
			return `~/${section}`
	}
}
