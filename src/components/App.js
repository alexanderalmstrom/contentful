import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Products from './Products'
import Product from './Product'
import NotFound from './NotFound'

import Layout from './Layout'

import './App.scss'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Products}></Route>
            <Route path="/product/:slug" component={Product}></Route>
            <Route path="*" component={NotFound}></Route>
          </Switch>
        </Layout>
      </Router>
    )
  }
}

export default App
