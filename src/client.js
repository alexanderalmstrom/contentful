import { createClient } from 'contentful'

export const client = createClient({
	space: process.env.CONTENTFUL_SPACE,
	accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
})

export function getEntries (content_type) {
	const entries = client.getEntries({
			content_type: content_type
		})
		.catch((error) => console.log(error))
		.then((entries) => {
			return entries
		})

	return entries
}