import { combineReducers } from 'redux'

import { app } from './app'
import { contentful } from './contentful'
import { management } from './management'
import { product } from './product'
import { products } from './products'
import { cart } from './cart'

const rootReducer = combineReducers({
  app,
  contentful,
  management,
  product,
  products,
  cart
})

export default rootReducer
