import React from 'react'

import { getEntries } from '../client'

import './Home.scss'

class Home extends React.Component {
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
              <img src={`${entry.fields.image.fields.file.url}?fm=jpg&q=70&w=600`}
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
        <div className="products">
          {products}
        </div>
      )
    } else {
      return null
    }
  }
}

export default Home