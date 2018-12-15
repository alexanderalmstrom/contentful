import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { connectComponent } from '../connect'
import * as contentfulService from '../services/contentful'
import * as managementService from '../services/management'

import Loading from './Loading'
import Notice from './Notice'

import Products from './Products'
import Product from './Product'
import Checkout from './Checkout'
import NotFound from './NotFound'

import Layout from './Layout'

import './App.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    contentfulService
      .initClient()
      .then(
        () => this.props.setAppContentfulState('success'),
        () => this.props.setAppContentfulState('error')
      )

    managementService
      .initClient()
      .then(
        () => this.props.setAppManagementState('success'),
        () => this.props.setAppManagementState('error')
      )
  }

  renderLocales () {
    return (
      <div className="locales">
        { this.props.contentful.space.locales.map(locale => {
          return <div
            key={locale.code}
            className="locale"
            onClick={contentfulService.setLocale.bind(this, locale.code)}>
              {locale.name}
            </div>
        }) }
      </div>
    )
  }

  render() {
    return (
      <div className="app">
        {this.props.contentful.authState == 'error' ? (
          <Notice message="Error when establishing connection with Contentful" />
        ) : null}
        {this.props.contentful.authState == 'success' ? (
          <Router>
            <Helmet>
              <title>{this.props.contentful.space.name}</title>
              <meta name="description" content="" />
            </Helmet>
            { this.renderLocales() }
            <Layout>
              <Switch>
                <Route exact path="/" component={Products} />
                <Route path="/product/:slug" component={Product} />
                <Route path="/checkout" component={Checkout} />
                <Route path="*" component={NotFound} />
              </Switch>
            </Layout>
          </Router>
        ) : null}
        {this.props.contentful.authState == 'loading' ? <Loading /> : null}
      </div>
    )
  }
}

export default connectComponent(App)
