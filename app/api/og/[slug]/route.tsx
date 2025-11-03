import { ImageResponse } from 'next/og'

const BLOG_POSTS: Record<string, { title: string; description: string }> = {
	'choosing-swift-over-react-native': {
		title: 'Choosing Swift Over React Native',
		description:
			'Why I chose Swift and SwiftUI for native iOS development instead of React Native.',
	},
}

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ slug: string }> },
) {
	const { slug } = await params
	const postData = BLOG_POSTS[slug]

	let spaceMonoData: ArrayBuffer | null = null
	let spaceMonoBoldData: ArrayBuffer | null = null
	try {
		const origin = new URL(request.url).origin
		const fontRespBold = await fetch(`${origin}/fonts/SpaceMono-Bold.ttf`)
		const fontResp = await fetch(`${origin}/fonts/SpaceMono-Regular.ttf`)
		if (fontResp.ok) spaceMonoData = await fontResp.arrayBuffer()
		if (fontRespBold.ok)
			spaceMonoBoldData = await fontRespBold.arrayBuffer()
		else throw new Error(`font fetch failed: ${fontResp.status}`)
	} catch (err) {
		console.error(
			'Failed to load font for OG image, continuing without custom font',
			err,
		)
	}

	const fonts: {
		name: string
		data: ArrayBuffer
		weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
		style?: 'normal' | 'italic'
	}[] = []

	if (spaceMonoData) {
		fonts.push({
			name: 'Space Mono',
			data: spaceMonoData,
			// use numeric literal narrowing so TypeScript accepts the union type
			weight: 400 as 400,
			style: 'normal',
		})
	}
	if (spaceMonoBoldData) {
		fonts.push({
			name: 'Space Mono',
			data: spaceMonoBoldData,
			weight: 700,
			style: 'normal',
		})
	}

	//conso
	if (!postData) {
		return new ImageResponse(
			(
				<div
					style={{
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						background: '#0b1220',
						color: 'white',
					}}>
					<div style={{ fontSize: 48 }}>Post not found</div>
				</div>
			),
			{ width: 1200, height: 630 },
		)
	}

	const { title, description } = postData

	return new ImageResponse(
		(
			<div
				className="border-2 border-dashed border-red-400"
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					background:
						'linear-gradient(135deg, #0a0e1a 0%, #212121 100%)',
					fontFamily: 'Space Mono',
				}}>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						padding: '24px 48px',
						borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
						background: 'rgba(0, 0, 0, 0.3)',
					}}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 16,
						}}>
						<div style={{ display: 'flex', gap: 10 }}>
							<div
								style={{
									display: 'flex',
									width: 14,
									height: 14,
									borderRadius: 14,
									background: '#ff5f56',
								}}
							/>
							<div
								style={{
									display: 'flex',
									width: 14,
									height: 14,
									borderRadius: 14,
									background: '#ffbd2e',
								}}
							/>
							<div
								style={{
									display: 'flex',
									width: 14,
									height: 14,
									borderRadius: 14,
									background: '#27c93f',
								}}
							/>
						</div>
						<div
							style={{
								display: 'flex',
								fontFamily: 'monospace',
								color: 'rgba(255, 255, 255, 0.5)',
								fontSize: 18,
								marginLeft: 12,
							}}>
							~/blog/{slug}.md
						</div>
					</div>
					<div
						style={{
							fontFamily: 'monospace',
							color: '#10b981',
							fontSize: 20,
							fontWeight: 600,
							letterSpacing: 2,
						}}>
						adi.codes
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						flex: 1,
						padding: '0 64px',
					}}>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 12,
							marginBottom: 24,
						}}>
						<div
							style={{
								fontFamily: 'monospace',
								color: '#10b981',
								fontSize: 24,
								fontWeight: 700,
							}}>
							{'>'}
						</div>
						<div
							style={{
								fontFamily: 'monospace',
								color: 'rgba(255, 255, 255, 0.6)',
								fontSize: 20,
							}}>
							cat blog.md
						</div>
					</div>
					<div
						style={{
							fontFamily: 'monospace',
							color: '#ffffff',
							fontSize: 52,
							fontWeight: 800,
							lineHeight: 1.2,
							marginBottom: 20,
							maxWidth: 1050,
						}}>
						{title}
					</div>
					{description && (
						<div
							style={{
								fontFamily: 'monospace',
								color: 'rgba(255, 255, 255, 0.65)',
								fontSize: 22,
								lineHeight: 1.5,
								maxWidth: 950,
								marginTop: 8,
							}}>
							{description}
						</div>
					)}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: 8,
							marginTop: 32,
						}}>
						<div
							style={{
								width: 4,
								height: 24,
								background: '#10b981',
							}}
						/>
						<div
							style={{
								fontFamily: 'monospace',
								color: 'rgba(255, 255, 255, 0.4)',
								fontSize: 16,
							}}>
							Press Enter to read more
						</div>
					</div>
				</div>
			</div>
		),
		{
			width: 1200,
			height: 630,
			fonts,
		},
	)
}
