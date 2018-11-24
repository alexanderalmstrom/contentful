import { createClient } from 'contentful'
import qs from 'query-string'

let config = {}
let client
let auth = false
let preview = false
let query

export function initClient() {
  if (process.env.CONTENTFUL_SPACE && process.env.CONTENTFUL_ACCESS_TOKEN) {
    config.space =  process.env.CONTENTFUL_SPACE
    config.accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
  } else {
    throw new Error('Contentful space id and access token is required in .env')
  }

  if (isPreview()) {
    config.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
    config.host = 'preview.contentful.com'
  } else {
    config.host = 'cdn.contentful.com'
  }

  if (process.env.CONTENTFUL_ENVIRONMENT) {
    config.environment = process.env.CONTENTFUL_ENVIRONMENT
  }

  client = createClient(config)

  return client.getSpace().then(space => {
    auth = true
    return space
  })
}

export function getClient() {
  return auth && client
}

export function isPreview() {
  if  (!process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN) return

  if  (process.env.NODE_ENV == 'development' || process.env.CONTENTFUL_PREVIEW == 'true')
    preview = true

  if (location.search)
    query = qs.parse(location.search)

  if (query && query.preview)
    preview = true

  return preview
}