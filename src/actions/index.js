import * as entryService from '../services/entry'
import * as cartService from '../services/cart'
import * as contentfulService from '../services/contentful'

export function setAppContentfulState(authState) {
  return {
    type: 'LOADED_CONTENTFUL',
    payload: contentfulService.getSpace(),
    meta: {
      authState: authState
    }
  }
}

export function setAppManagementState(authState) {
  return {
    type: 'LOADED_MANAGEMENT',
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

export function loadCart() {
  return {
    type: 'LOAD_CART',
    payload: cartService.getCartItems()
  }
}
