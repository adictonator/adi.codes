'use client'

import { useState } from 'react'

export default function Newsletter() {
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		// Here you would typically send the email to your API
		setMessage('Thanks for subscribing!')
		setEmail('')
	}

	return (
		<section id="newsletter" className="py-20 bg-white">
			<div className="max-w-3xl mx-auto text-center">
				<h2 className="text-3xl font-bold mb-4 text-primary">
					Subscribe to My Newsletter
				</h2>
				<p className="text-lg mb-8">
					Get the latest updates on web development, AI, and tech
					insights delivered straight to your inbox.
				</p>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
					<input
						type="email"
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder="Enter your email"
						required
						className="px-4 py-2 w-full md:w-64 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
					/>
					<button
						type="submit"
						className="bg-accent hover:bg-accent/90 text-white px-6 py-2 rounded-full transition-colors">
						Subscribe
					</button>
				</form>
				{message && <p className="mt-4 text-green-600">{message}</p>}
			</div>
		</section>
	)
}
