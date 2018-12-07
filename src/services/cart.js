import { getClient } from './contentful'

const Selector = {
  BODY: document.querySelector('body')
}

const State = {
  IS_CART_OPEN: 'is-cart-open'
}

export function getCart() {
  const cartItems = getCartItems()

  const countObj = cartItems.reduce((acc, curr) => {
    return (acc[curr] = ++acc[curr] || 1, acc)
  }, {})

  return getClient()
    .getEntries({
      content_type: 'product',
      'sys.id[in]': cartItems.join(',')
    })
    .then(payload => {
      const items = payload.items.map(item => {
        item.quantity = countObj[item.sys.id]
        return item
      })

      return items
    })
}

export function addCartItem (item) {
  const cartItems = getCartItems()

  cartItems.push(item)

  localStorage.setItem('cartItems', JSON.stringify(cartItems))
}

export function removeCartItem (id) {
  const cartItems = getCartItems()
  const newCartItems = cartItems.filter(item => item != id)

  localStorage.setItem('cartItems', JSON.stringify(newCartItems))
}

export function getCartItems () {
  return localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
}

export function isCartOpen () {
  return Selector.BODY.classList.contains(State.IS_CART_OPEN)
}

export function openCart () {
  Selector.BODY.classList.add(State.IS_CART_OPEN)
}

export function closeCart () {
  Selector.BODY.classList.remove(State.IS_CART_OPEN)
}

export function toggleCart () {
  if (isCartOpen()) {
    closeCart()
  } else {
    openCart()
  }
}