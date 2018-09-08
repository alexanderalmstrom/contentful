import React from 'react'

import { getEntries } from '../client'

import './App.scss'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      products: null
    }
  }

  componentDidMount () {
    getEntries('product').then((products) => {
      this.setState({
        products: products.items
      })
    })
  }

  render () {
    if (this.state.products) {
      const products = (
        this.state.products.map((entry, index) => {
          return (
            <div key={index}
              className="product">
              <img
                className="image"
                src={`${entry.fields.image.fields.file.url}?fm=jpg&q=70&w=600`}
                alt={entry.fields.image.fields.title} />
              <div className="name">
                {entry.fields.name}
              </div>
              <div className="description">
                {entry.fields.description}
              </div>
              <div className="price">
                {entry.fields.price} {entry.fields.currency}
              </div>
            </div>
          )
        })
      )

      return (
        <div className="container">
          <h1 className="title">Products</h1>
          <div className="products">
            {products}
          </div>
        </div>
      )
    } else {
      return null
    }
  }
}

export default App