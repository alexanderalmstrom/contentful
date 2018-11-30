import { makeReducer } from './util'

export const cart = makeReducer(
  function(action) {
    switch (action.type) {
      case 'LOAD_CART_PENDING':
        return {
          fetching: true
        }

      case 'LOAD_CART_FULFILLED':
        return {
          fetching: false,
          entries: action.payload.reduce((collection, entry) => {
            collection[entry.sys.id] = entry
            return collection
          }, {})
        }

      case 'LOAD_CART_REJECTED':
        return {
          error: true,
          fetching: false
        }
    }
  },
  { entries: [] }
)
