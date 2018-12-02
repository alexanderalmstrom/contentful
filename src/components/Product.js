import React from 'react'
import PropTypes from 'prop-types'

import { connectComponent } from '../connect'
import * as productService from '../services/product'
import * as cartService from '../services/cart'

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

    this.setState({ message: null })

    if (this.props.management.authState == 'success') {
      productService.addToCart(id, 1).then(response => {
        if (!response.error) {
          cartService.setCartItem(id)
        }

        if (response && response.message) {
          this.setState({ message: response.message })
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
              {entry.fields.image ? (
                <Image image={entry.fields.image} width={800} />
              ) : null}
            </div>
            <div className="product-content">
              <h2 className="product-name">{entry.fields.name}</h2>
              <div className="product-price">
                {entry.fields.price} {entry.fields.currency}
              </div>
              <p className="product-description">{entry.fields.description}</p>
              <div className="product-form">
                <button
                  className="product-btn"
                  onClick={this.addToCart.bind(this, entry.sys.id)}
                  disabled={entry.fields.stock ? false : true}>
                  {entry.fields.stock ? "Add to bag" : "Out of stock"}
                </button>
                {this.state.message ? <p>{this.state.message}</p> : null}
                {entry.fields.stock ? <p>{entry.fields.stock} items left</p> : null}
              </div>
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
  products: PropTypes.object,
  loadProducts: PropTypes.func
}

export default connectComponent(Product)
