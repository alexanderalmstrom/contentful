import React from 'react'

import Header from './Header'
import Footer from './Footer'

import './Main.scss'

class Main extends React.Component {
  render () {
    return (
      <main className="main">
        <Header />
        <section className="main-section">
          {this.props.children}
        </section>
        <Footer />
      </main>
    )
  }
}

export default Main
