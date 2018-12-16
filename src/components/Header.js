import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { matchPath } from 'react-router'

import { connectComponent } from '../connect'
import * as cartServive from '../services/cart'

import './Header.scss'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const isCheckout = matchPath(window.location.pathname, {
      path: '/checkout',
      exact: true
    })

    return (
      <header className="header">
        <div className="container">
          <div className="site-brand">
            <Link className="site-brand-link" to="/">
              Contentful
            </Link>
          </div>
          { !isCheckout ? (
            <button
              className="cart-btn"
              onClick={cartServive.openCart.bind(this)}>
              Bag <span>{cartServive.getCart().length}</span>
            </button>
          ) : null }
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  cart: PropTypes.object
}

export default connectComponent(Header)
