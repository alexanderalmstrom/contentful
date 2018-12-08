import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { connectComponent } from '../connect'
import * as cartServive from '../services/cart'

import './Header.scss'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="site-brand">
            <Link className="site-brand-link" to="/">
              Contentful
            </Link>
          </div>
          <button
            className="cart-btn"
            onClick={cartServive.openCart.bind(this)}>
            Bag
          </button>
        </div>
      </header>
    )
  }
}

export default Header
