import { createClient } from 'contentful'

let client
let auth

export function initClient () {
  const config = {
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  }
  
  if (process.env.CONTENTFUL_PREVIEW && process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN)
    config.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    config.host = process.env.CONTENTFUL_PREVIEW ? 'preview.contentful.com' : 'cdn.contentful.com'
  
  if (process.env.CONTENTFUL_ENVIRONMENT)
    config.environment = process.env.CONTENTFUL_ENVIRONMENT

  client = createClient(config)

  return client.getSpace()
		.then((space) => {
      auth = true
			return space
		})
}

export function getClient () {
  return auth && client
}