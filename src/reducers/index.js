import { combineReducers } from 'redux'

import { app } from './app'
import { product } from './product'
import { products } from './products'

const rootReducer = combineReducers({
  app,
  product,
  products
})

export default rootReducer
