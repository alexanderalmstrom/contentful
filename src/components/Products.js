import React from 'react'
import { Link } from 'react-router-dom'

import { getEntries } from '../client'

import Loading from './Loading'
import Image from './Image'

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
                <div key={index}
                  className="card">
                  <Link to={`/product/${entry.fields.slug}`}
                    className="card-link">
                    <div className="card-image">
                      <Image src={entry.fields.image.fields.file.url}
                        alt={entry.fields.image.fields.title}
                        width={640} />
                    </div>
                    <div className="card-content">
                      <h2 className="card-name">
                        {entry.fields.name}
                      </h2>
                      <div className="card-price">
                        {entry.fields.price} {entry.fields.currency}
                      </div>
                      <p className="card-description">
                        {entry.fields.description}
                      </p>
                    </div>
                  </Link>
                </div>
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