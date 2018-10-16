import { createClient } from 'contentful'

let client
let auth

export function initClient() {
  const config = {
    space: process.env.CONTENTFUL_SPACE,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  }

  if (process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN)
    config.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN

  if (
    process.env.NODE_ENV == 'development' ||
    process.env.CONTENTFUL_PREVIEW == 'true'
  ) {
    config.host = 'preview.contentful.com'
  } else {
    config.host = 'cdn.contentful.com'
  }

  if (process.env.CONTENTFUL_ENVIRONMENT)
    config.environment = process.env.CONTENTFUL_ENVIRONMENT

  client = createClient(config)

  return client.getSpace().then(space => {
    auth = true
    return space
  })
}

export function getClient() {
  return auth && client
}
