import React from 'react'
import { matchPath } from 'react-router'

import Header from './Header'
import Footer from './Footer'
import Cart from './Cart'

import './Layout.scss'

class Layout extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    const isCheckout = matchPath(window.location.pathname, {
      path: '/checkout',
      exact: true
    })

    return (
      <div className="layout">
        <Header />
        <main className="main">{this.props.children}</main>
        { !isCheckout ? (
          <Cart className="cart-modal" />
        ) : null }
        <Footer />
      </div>
    )
  }
}

export default Layout
