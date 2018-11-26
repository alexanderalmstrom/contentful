import { createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducers from './reducers/index'

export function configureStore () {
    const middleware = applyMiddleware(
      promiseMiddleware(),
      thunk,
      createLogger()
    )
  
    const enhancer = compose(middleware)
    
    const store = createStore(
      reducers,
      enhancer
    )
  
    if (module.hot) {
      module.hot.accept('./reducers', () => {
        const nextRootReducer = require('./reducers/index')
        store.replaceReducer(nextRootReducer)
      })
    }
  
    return store
  }