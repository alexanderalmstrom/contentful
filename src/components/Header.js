import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { connectComponent } from '../connect'
import * as cartServive from '../services/cart'

import './Header.scss'

class Header extends React.Component {
  constructor (props) {
    super(props)
  }

  openCart () {
    this.props.loadCart().then(() => {
      cartServive.openCart()
    })
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
  loadCart: PropTypes.func
}

export default connectComponent(Header)
