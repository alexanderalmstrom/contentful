import { combineReducers } from 'redux'

import { contentful } from './contentful'
import { management } from './management'
import { product } from './product'
import { products } from './products'
import { cart } from './cart'

const rootReducer = combineReducers({
  contentful,
  management,
  product,
  products,
  cart
})

export default rootReducer
