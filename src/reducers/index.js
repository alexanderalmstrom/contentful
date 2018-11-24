import { combineReducers } from 'redux'

import { app } from './app'
import { management } from './management'
import { product } from './product'
import { products } from './products'

const rootReducer = combineReducers({
  app,
  management,
  product,
  products
})

export default rootReducer
