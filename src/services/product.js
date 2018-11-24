import { getLocale, getEnvironment } from './management'

export function increaseProductStock(id, amount) {
  const locale = getLocale()

  return getEnvironment()
    .then(environment => environment.getEntry(id))
    .then(entry => {
      let stock

      if (!entry) {
        throw new Error(`Failed to get product.`)
      }

      if (entry.fields && entry.fields.stock) {
        stock = entry.fields.stock[locale]
      } else {
        throw new Error(`Could not find product stock for id ${entry.sys.id}`)
      }

      stock = parseInt(stock)

      if (stock < 1) {
        return {
          success: false
        }
      } else {
        stock = stock - amount
        entry.fields.stock[locale] = stock
        entry.update()

        return {
          success: true
        }
      }
    })
    .catch(error => console.error(error))
}