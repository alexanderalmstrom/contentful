import React from 'react'

import Header from './Header'
import Footer from './Footer'
import Cart from './Cart'

import './Layout.scss'

class Layout extends React.Component {
  render() {
    return (
      <div className="layout">
        <Header />
        <main className="main">{this.props.children}</main>
        <Cart className="cart-modal" />
        <Footer />
      </div>
    )
  }
}

export default Layout
