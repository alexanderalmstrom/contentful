import { createClient } from 'contentful-management'

let client
let auth
let space

export function initClient() {
  if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN)
    throw new Error('Contentful management token is required in .env')

  client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
  })

  space = client.getSpace(process.env.CONTENTFUL_SPACE_ID).then(space => {
    auth = true
    return space
  })

  return space
}

export function getSpace() {
  const env = process.env.CONTENTFUL_ENVIRONMENT
    ? process.env.CONTENTFUL_ENVIRONMENT
    : 'master'

  return space.then(contentful => contentful.getEnvironment(env))
}

export function getClient() {
  return auth && client
}
