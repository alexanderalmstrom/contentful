import React from 'react'
import PropTypes from 'prop-types'

import { connectComponent } from '../connect'
import { increaseProductStock } from '../services/product'

import Loading from './Loading'
import Image from './Image'

import './Product.scss'

class Product extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: null
    }
  }

  componentDidMount() {
    if (!this.props.products.entries.length) {
      this.props.loadProducts()
    }
  }

  addToCart(id, e) {
    e.preventDefault()

    this.setState({
      message: null
    })

    if (this.props.management.authState == 'success') {
      increaseProductStock(id, 1).then(response => {
        if (response && response.message) {
          this.setState({
            message: response.message
          })
        }
      })
    }
  }

  render() {
    const { match, products } = this.props
    const entry = products.entries[match.params.slug]

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
              <button
                className="product-btn"
                onClick={this.addToCart.bind(this, entry.sys.id)}>
                Add to cart
              </button>
              {this.state.message ? <p>{this.state.message}</p> : null}
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
  app: PropTypes.object
}

export default connectComponent(Product)
