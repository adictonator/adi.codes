/**
 * Format section name for minimized terminal view
 */
export function formatSectionName(section: string): string {
	switch (section) {
		case 'experience':
			return '~/exp'
		case 'connect':
			return '~/contact'
		case 'skills':
			return '~/skills'
		default:
			return `~/${section}`
	}
}
