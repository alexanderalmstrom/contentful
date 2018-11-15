import { createClient } from 'contentful'
import qs from 'query-string'

let client
let auth

export function initClient() {
  const config = {
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  }

  const query = qs.parse(location.search)
  const isPreview = query && query.preview ? true : false

  if (
    (process.env.NODE_ENV == 'development' ||
      process.env.CONTENTFUL_PREVIEW == 'true' ||
      isPreview) &&
    process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
  ) {
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
