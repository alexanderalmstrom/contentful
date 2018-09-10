import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Products from './Products'
import Product from './Product'
import NotFound from './NotFound'

import Main from './Main'

import './App.scss'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Main>
          <Switch>
            <Route exact path="/" component={Products}></Route>
            <Route path="/product/:slug" component={Product}></Route>
            <Route path="*" component={NotFound}></Route>
          </Switch>
        </Main>
      </Router>
    )
  }
}

export default App