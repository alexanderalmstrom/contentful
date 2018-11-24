import { combineReducers } from 'redux'

import { contentful } from './contentful'
import { management } from './management'
import { product } from './product'
import { products } from './products'

const rootReducer = combineReducers({
  contentful,
  management,
  product,
  products
})

export default rootReducer
