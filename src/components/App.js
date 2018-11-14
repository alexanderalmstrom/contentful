import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { connectComponent } from '../connect'
import { initClient } from '../services/client'

import Products from './Products'
import Product from './Product'
import NotFound from './NotFound'

import Layout from './Layout'

import './App.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    initClient().then(
      () => this.props.setAppClientState('success'),
      () => this.props.setAppClientState('error')
    )
  }

  render() {
    return (
      <div className="app">
        {(() => {
          if (this.props.app.authState == 'success') {
            return (
              <Router>
                <Layout>
                  <Switch>
                    <Route exact path="/" component={Products} />
                    <Route path="/product/:slug" component={Product} />
                    <Route path="*" component={NotFound} />
                  </Switch>
                </Layout>
              </Router>
            )
          }
        })()}
      </div>
    )
  }
}

export default connectComponent(App)
