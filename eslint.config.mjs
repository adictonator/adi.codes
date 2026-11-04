// ESLint 10 reads flat config only, and Next 16 removed `next lint`, so the
// old .eslintrc.json was silently ignored. Same rules: next/core-web-vitals.
import nextVitals from 'eslint-config-next/core-web-vitals'

const config = [
	...nextVitals,
	{
		ignores: [
			'.next/**',
			'node_modules/**',
			'public/**',
			'scripts/seo-reports/**',
			'next-env.d.ts',
		],
	},
]

export default config
