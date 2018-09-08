import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import Products from './Products'
import Product from './Product'
import NotFound from './NotFound'

class App extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Products}></Route>
          <Route path="/:slug" component={Product}></Route>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    )
  }
}

export default App