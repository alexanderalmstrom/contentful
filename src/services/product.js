import { getLocale, getSpace } from './management'

export function stock(event, id, quantity) {
  const locale = getLocale()

  return getSpace()
    .then(space => space.getEntry(id))
    .then(entry => {
      if (!entry) {
        throw new Error('Entry not found.')
      }

      if (!entry.fields) {
        throw new Error('Fields not found.')
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
          throw new Error('Event is required.')
          break
      }
    })
    .catch(error => console.error(error))
}