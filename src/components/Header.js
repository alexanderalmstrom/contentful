import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

class Header extends React.Component {
  render() {
    return (
      <header className="main-header">
        <div className="container">
          <h1 className="main-brand">
            <Link className="main-brand-link" to="/">
              Contentful
            </Link>
          </h1>
        </div>
      </header>
    )
  }
}

export default Header
