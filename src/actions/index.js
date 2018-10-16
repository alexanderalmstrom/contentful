import * as entryService from '../services/entry'

export function setAppClientState(authState) {
  return {
    type: 'LOADED_CLIENT',
    authState
  }
}

export function loadProducts() {
  return {
    type: 'LOAD_PRODUCTS',
    payload: entryService.getEntries('product')
  }
}

export function loadProduct(slug) {
  return {
    type: 'LOAD_PRODUCT',
    payload: entryService.getEntryBySlug('product', slug),
    meta: {
      slug
    }
  }
}
