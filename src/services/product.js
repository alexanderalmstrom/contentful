import { getLocale, getSpace } from './management'

export function stock(event, id, quantity) {
  const locale = getLocale()

  return getSpace()
    .then(space => space.getEntry(id))
    .then(entry => {
      if (!entry) {
        throw new Error('Failed to get entry.')
      }

      if (!entry.fields) {
        throw new Error('Failed to get fields.')
      }

      const stock = entry.fields.stock ? parseInt(entry.fields.stock[locale]) : 0
      const hasStock = stock > 0 ? true : false

      switch (event) {
        case 'add':
          if (hasStock) {
            const newStock = stock - quantity
            entry.fields.stock[locale] = newStock
            entry.update()
    
            return {
              error: false,
              message: 'Added!'
            }
          } else {
            return {
              error: true,
              message: 'Out of stock.'
            }
          }

          break
        case 'remove':
          const newStock = stock + quantity
          entry.fields.stock[locale] = newStock
          entry.update()
    
          return {
            error: false,
            message: 'Removed!'
          }

          break
        default:
          throw new Error('No event specified.')
          break
      }
    })
    .catch(error => console.error(error))
}