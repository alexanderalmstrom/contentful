import React from 'react'
import PropTypes from 'prop-types'

import { connectComponent } from '../connect'

import Loading from './Loading'
import Image from './Image'

import './Product.scss'

class Product extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { slug } = this.props.match.params

    this.props.loadProduct(slug)
  }

  render() {
    const { slug } = this.props.match.params
    const entry = this.props.product.entry[slug]

    return (
      <div className="container">
        {entry && entry.fields ? (
          <div className="product">
            <div className="product-image">
              <Image
                src={entry.fields.image.fields.file.url}
                alt={entry.fields.image.fields.title}
                width={800}
              />
            </div>
            <div className="product-content">
              <h2 className="product-name">{entry.fields.name}</h2>
              <div className="product-price">
                {entry.fields.price} {entry.fields.currency}
              </div>
              <p className="product-description">{entry.fields.description}</p>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

Product.propTypes = {
  app: PropTypes.object,
  product: PropTypes.object,
  loadProduct: PropTypes.func
}

export default connectComponent(Product)
