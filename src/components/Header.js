import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

class Header extends React.Component {
  render() {
    return (
      <header id="header">
        <div className="container">
          <h1 className="site-brand">
            <Link className="site-brand-link" to="/">
              Contentful
            </Link>
          </h1>
        </div>
      </header>
    )
  }
}

export default Header
