import { getClient } from './contentful'

let cartItems

export function getCart() {
  cartItems = getCartItems()

  if (!cartItems) return

  return getClient()
    .getEntries({
      content_type: 'product',
      'sys.id[in]': cartItems.join(',')
    })
    .then(payload => {
      return payload.items
    })
}

export function setCartItem(item) {
  cartItems.push(item)

  localStorage.setItem('cartItems', cartItems)
}

export function getCartItems() {
  let items = localStorage.getItem('cartItems')

  return items ? [items] : []
}
