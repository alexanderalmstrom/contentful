import { getLocale, getSpace } from './management'
import * as cartService from './cart'

export function cart(event, id, quantity) {
  const locale = getLocale()

  return getSpace()
    .then(space => space.getEntry(id))
    .then(entry => {
      if (!entry) {
        throw new Error('Entry not found')
      }

      if (!entry.fields) {
        throw new Error('Fields not found')
      }

      const stock = entry.fields.stock
        ? parseInt(entry.fields.stock[locale])
        : 0

      switch (event) {
        case 'add':
          if (stock > 0) {
            const newStock = stock - quantity
            entry.fields.stock[locale] = newStock

            cartService.addToCart(id)

            return entry.update()
          } else {
            return false
          }

          break
        case 'remove':
          const newStock = stock + quantity
          entry.fields.stock[locale] = newStock

          cartService.removeFromCart(id)

          return entry.update()
          break
        default:
          throw new Error('Event is required')
          break
      }
    })
    .catch(error => console.error(error))
}
