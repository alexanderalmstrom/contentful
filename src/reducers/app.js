import { makeReducer } from './util'

export const app = makeReducer(function() {}, {
  name: process.env.NAME || 'Contentful',
  description: process.env.DESCRIPTION || ''
})
