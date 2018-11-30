import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

class Header extends React.Component {
  constructor (props) {
    super(props)
  }

  toggleCart () {
    const body = document.querySelector('body')

    if (body.classList.contains('is-cart-open')) {
      body.classList.remove('is-cart-open')
    } else {
      body.classList.add('is-cart-open')
    }
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
          <button className="cart-btn" onClick={this.toggleCart.bind(this)}>Bag</button>
        </div>
      </header>
    )
  }
}

export default Header
