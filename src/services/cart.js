import { getClient } from './contentful'

export function getCartItems() {
  const cart = getCart()

  const countObj = cart.reduce((acc, curr) => {
    return (acc[curr] = ++acc[curr] || 1), acc
  }, {})

  return getClient()
    .getEntries({
      content_type: 'product',
      'sys.id[in]': cart.join(',')
    })
    .then(payload => {
      const items = payload.items.map(item => {
        item.quantity = countObj[item.sys.id]
        return item
      })

      return items
    })
}

export function addToCart(item) {
  const cart = getCart()

  cart.push(item)

  localStorage.setItem('cart', JSON.stringify(cart))

  document.querySelector('.cart-btn span').innerHTML = cart.length
}

export function removeFromCart(id) {
  const cart = getCart().filter(item => item != id)

  localStorage.setItem('cart', JSON.stringify(cart))

  document.querySelector('.cart-btn span').innerHTML = cart.length
}

export function getCart() {
  return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : []
}

export function isCartOpen() {
  return document.querySelector('body').classList.contains('is-cart-open')
}

export function openCart() {
  document.querySelector('body').classList.add('is-cart-open')

  setTimeout(() => {
    document.querySelector('body').classList.add('is-cart-animated')
  }, 10)
}

export function closeCart() {
  document.querySelector('body').classList.remove('is-cart-animated')

  setTimeout(() => {
    document.querySelector('body').classList.remove('is-cart-open')
  }, 300)
}

export function toggleCart() {
  if (isCartOpen()) {
    closeCart()
  } else {
    openCart()
  }
}

export function getOrder() {
  return JSON.parse(localStorage.getItem('order')) || {}
}
