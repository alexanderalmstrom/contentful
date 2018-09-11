import React from 'react'

import { getEntries } from '../client'

import Loading from './Loading'
import Card from './Card'

import './Products.scss'

class Products extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      products: null
    }
  }

  componentDidMount () {
    getEntries('product').then((products) => {
      this.setState({ products: products })
    })
  }

  render () {
    const { products } = this.state

    return (
      <div className="container">
        <div className="products">
          { products ? (
            products.map((entry, index) => {
              return (
                <Card key={index} entry={entry} />
              )
            })
          ) : (
            <Loading />
          ) }
        </div>
      </div>
    )
  }
}

export default Products
