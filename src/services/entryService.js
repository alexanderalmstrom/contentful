import { getClient } from './client'

export function getEntries (content_type) {
  return getClient().getEntries({
    'content_type': content_type,
    'include': 1,
    'order': 'sys.createdAt'
  })
  .then(payload => {
    return payload.items
  })
}

export function getEntryBySlug (content_type, slug) {
  return getClient().getEntries({
    'content_type': content_type,
    'include': 2,
    'fields.slug': slug
  }).then(payload => {
    if (!payload.items.length) {
      throw new Error('Entry not found')
    }

    return payload.items[0]
  })
}