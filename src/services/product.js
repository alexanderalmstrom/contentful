import { getLocale, getEnvironment } from './management'

export function increaseProductStock(id, amount) {
  const locale = getLocale()

  return getEnvironment()
    .then(environment => environment.getEntry(id))
    .then(entry => {
      let stock
      let hasStock

      if (!entry) {
        throw new Error('Failed to get entry.')
      }

      if (!entry.fields) {
        throw new Error('Failed to get fields.')
      }

      if (entry.fields.stock) {
        stock = parseInt(entry.fields.stock[locale])
        hasStock = stock > 0 ? true : false
      } else {
        hasStock = false
      }

      if (hasStock) {
        stock = stock - amount
        entry.fields.stock[locale] = stock
        entry.update()

        return {
          error: false,
          message: 'Product added to cart.'
        }
      } else {
        return {
          error: true,
          message: 'Out of stock.'
        }
      }
    })
    .catch(error => console.error(error))
}
