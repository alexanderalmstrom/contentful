import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import * as cartServive from '../services/cart'
import { connectComponent } from '../connect'

import './Header.scss'

class Header extends React.Component {
  constructor (props) {
    super(props)
  }

  openCart () {
    this.props.loadCart()
    cartServive.toggleCart()
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
          <button className="cart-btn" onClick={this.openCart.bind(this)}>Bag</button>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  products: PropTypes.object,
  loadProducts: PropTypes.func
}

export default connectComponent(Header)
