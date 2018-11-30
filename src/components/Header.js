import React from 'react'
import { Link } from 'react-router-dom'

import * as cartServive from '../services/cart'

import './Header.scss'

class Header extends React.Component {
  constructor (props) {
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
          <button className="cart-btn" onClick={cartServive.toggleCart.bind(this)}>Bag</button>
        </div>
      </header>
    )
  }
}

export default Header
