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
  constructor (props) {
		super(props)
	}

	componentWillMount () {
		initClient().then(
			() => this.props.setAppClientState('success'),
			() => this.props.setAppClientState('error')
		)
  }
  
  routes () {
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

  render () {
    return (
      <div id="app">
        { (() => {
          if (this.props.app.authState == 'success') {
            return (
              <div>
                {this.routes()}
              </div>
            )
          }
        })() }
      </div>
    )
  }
}

export default connectComponent(App)