import { createClient } from 'contentful'

const config = {
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
}

if (process.env.CONTENTFUL_PREVIEW && process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN)
  config.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
  config.host = process.env.CONTENTFUL_PREVIEW ? 'preview.contentful.com' : 'cdn.contentful.com'

if (process.env.CONTENTFUL_ENVIRONMENT)
  config.environment = process.env.CONTENTFUL_ENVIRONMENT

const client = createClient(config)

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