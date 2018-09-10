import React from 'react'
import { Link } from 'react-router-dom'

import './Main.scss'

class Main extends React.Component {
  render () {
    return (
      <main className="main">
        <header className="main-header">
          <h1 className="main-brand">
            <Link className="main-brand-link" to="/">Contentful</Link>
          </h1>
        </header>
        <section className="main-section">
          {this.props.children}
        </section>
        <footer className="main-footer">
          <small>&copy; Copyright 2018</small>
        </footer>
      </main>
    )
  }
}

export default Main