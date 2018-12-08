import React from 'react'
import PropTypes from 'prop-types'

import { connectComponent } from '../connect'
import * as productService from '../services/product'
import * as cartService from '../services/cart'

import Loading from './Loading'
import Image from './Image'

import './Product.scss'
import { getEntryBySlug } from '../services/entry';

class Product extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      button: "Add to cart"
    }
  }

  componentDidMount() {
    if (!this.props.products.entries.length) {
      this.props.loadProducts()
    }
  }

  addToCart(id, e) {
    e.preventDefault()

    this.setState({ button: "Loading" })

    if (this.props.management.authState == 'success') {
      productService.stock('add', id, 1).then(response => {
        if (!response.error) {
          cartService.addToCart(id)
          this.props.loadCart().then(() => {
            cartService.openCart()
          })
        }

        if (response && response.message) {
          this.setState({ button: response.message })
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
                  disabled={entry.fields.stock > 0 ? false : true}>
                  { entry.fields.stock ? this.state.button : "Out of stock" }
                </button>
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
  loadProducts: PropTypes.func,
  loadCart: PropTypes.func
}

export default connectComponent(Product)
