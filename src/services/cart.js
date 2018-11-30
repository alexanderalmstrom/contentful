import { getClient } from './contentful'

const Selector = {
  BODY: document.querySelector('body')
}

const State = {
  IS_CART_OPEN: 'is-cart-open'
}

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

export function openCart () {
  Selector.BODY.classList.add(State.IS_CART_OPEN)
}

export function closeCart () {
  Selector.BODY.classList.add(State.IS_CART_OPEN)
}

export function toggleCart () {
  if (Selector.BODY.classList.contains(State.IS_CART_OPEN)) {
    Selector.BODY.classList.remove(State.IS_CART_OPEN)
  } else {
    Selector.BODY.classList.add(State.IS_CART_OPEN)
  }
}
