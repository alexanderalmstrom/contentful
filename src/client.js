import { createClient } from 'contentful'

const config = {}

config.space = process.env.CONTENTFUL_SPACE
config.accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

if (process.env.CONTENTFUL_ENVIRONMENT) {
	config.environment = process.env.CONTENTFUL_ENVIRONMENT
}

export const client = createClient(config)

export function getEntries (content_type) {
	const entries = client.getEntries({
			'content_type': content_type
		})
		.catch((error) => console.log(error))
		.then((entries) => {
			return entries.items
		})

	return entries
}

export function getEntryBySlug (content_type, slug) {
	const entries = client.getEntries({
			'content_type': content_type,
			'fields.slug': slug
		})
		.catch((error) => console.log(error))
		.then((entries) => {
			return entries.items[0]
		})

	return entries
}