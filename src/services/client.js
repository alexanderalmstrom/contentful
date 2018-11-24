import { createClient } from 'contentful'
import qs from 'query-string'

let config = {}
let client
let auth
let preview
let query

export function initClient() {
  if (CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN) {
    config.space = CONTENTFUL_SPACE_ID
    config.accessToken = CONTENTFUL_ACCESS_TOKEN
  } else {
    throw new Error('Contentful space id and access token is required in .env')
  }

  if (isPreview()) {
    config.accessToken = CONTENTFUL_PREVIEW_ACCESS_TOKEN
    config.host = 'preview.contentful.com'
  } else {
    config.host = 'cdn.contentful.com'
  }

  if (CONTENTFUL_ENVIRONMENT) {
    config.environment = CONTENTFUL_ENVIRONMENT
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
  if  (!CONTENTFUL_PREVIEW_ACCESS_TOKEN) {
    preview = false
  }

  if  (process.env.NODE_ENV == 'development' || CONTENTFUL_PREVIEW == 'true') {
    preview = true
  }

  if (location.search) {
    query = qs.parse(location.search)
  }

  if (query && query.preview) {
    preview = true
  }

  return preview
}