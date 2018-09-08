import React from 'react'

import { getEntryBySlug } from '../client'

import './Product.scss'

class Product extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      product: null
    }
  }

  componentDidMount () {
    getEntryBySlug('product', this.props.match.params.slug).then((product) => {
      this.setState({
        product: product
      })
    })
  }

  render () {
    const { product } = this.state

    return (
      <div className="container">
        { product ?
          (
            <div className="product">
              <div className="product-image">
                <img
                  className="image"
                  src={`${product.fields.image.fields.file.url}?fm=jpg&q=70&w=1200`}
                  alt={product.fields.image.fields.title} />
              </div>
              <div className="product-content">
                <h2 className="product-name">
                  {product.fields.name}
                </h2>
                <div className="product-price">
                  {product.fields.price} {product.fields.currency}
                </div>
                <p className="product-description">
                  {product.fields.description}
                </p>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )
        }
      </div>
    )
  }
}

export default Product