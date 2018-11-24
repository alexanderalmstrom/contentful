import { createClient } from 'contentful-management'

let client
let auth
let space

export function getLocale() {
  return 'en-US'
}

export function initClient() {
  client = createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
  })

  space = client.getSpace(process.env.CONTENTFUL_SPACE_ID).then(space => {
    auth = true
    return space
  })

  return space
}

export function getEnvironment() {
  return space.then(space =>
    space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT)
  )
}

export function getClient() {
  return auth && client
}
