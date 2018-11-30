import { getLocale, getSpace } from './management'

export function addToCart(productId, productCount) {
  const locale = getLocale()

  return getSpace()
    .then(space => space.getEntry(productId))
    .then(entry => {
      let stockCount, isInStock

      if (!entry) {
        throw new Error('Failed to get entry.')
      }

      if (!entry.fields) {
        throw new Error('Failed to get fields.')
      }

      if (entry.fields.stock) {
        stockCount = parseInt(entry.fields.stock[locale])
        isInStock = stockCount > 0 ? true : false
      } else {
        isInStock = false
      }

      if (isInStock) {
        stockCount = stockCount - productCount
        entry.fields.stock[locale] = stockCount
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
