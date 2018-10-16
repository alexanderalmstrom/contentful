import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import reducers from './reducers'

const store = applyMiddleware(promiseMiddleware(), thunk, createLogger())(
  createStore
)

import App from './components/App'

const render = Component => {
  ReactDOM.render(
    <Provider store={store(reducers)}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    document.getElementById('app')
  )
}

render(App)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  })
}
