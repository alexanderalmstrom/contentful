import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import { connectComponent } from '../connect'
import * as productService from '../services/product'
import * as cartService from '../services/cart'

import Loading from './Loading'
import Image from './Image'

import './Product.scss'

class Product extends React.Component {
  text = {
    DEFAULT: 'Add to cart',
    UNAVAILABLE: 'Out of stock',
    LOADING: 'Loading',
    SUCCESS: 'Added!',
    ERROR: 'Error'
  }

  constructor(props) {
    super(props)

    this.state = {
      button: this.text.DEFAULT
    }
  }

  componentDidMount() {
    if (!this.props.products.entries.length) {
      this.props.loadProducts()
    }

    window.scrollTo(0, 0)
  }

  addToCart(id, e) {
    e.preventDefault()

    if (this.props.management.authState == 'success') {
      this.setState({ button: this.text.LOADING })

      productService.cart('add', id, 1).then(response => {
        if (response) {
          this.props.loadCart().then(() => {
            cartService.openCart()
          })

          this.setState({ button: this.text.SUCCESS })

          setTimeout(() => {
            this.setState({ button: this.text.DEFAULT })
          }, 1000)
        } else {
          this.setState({ button: this.text.UNAVAILABLE })
        }
      })
    } else {
      this.setState({ button: this.text.ERROR })
    }
  }

  render() {
    const { match, products } = this.props
    const entry = products.entries[match.params.slug]

    if (!entry || !entry.fields) return null

    return (
      <div className="container">
        {!this.props.products.fetching ? (
          <div className="product">
            <Helmet>
              <title>
                {entry.fields.name} - {this.props.contentful.space.name}
              </title>
              <meta name="description" content={entry.fields.description} />
            </Helmet>
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
                  {entry.fields.stock
                    ? this.state.button
                    : this.text.UNAVAILABLE}
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
  loadCart: PropTypes.func,
  cart: PropTypes.object
}

export default connectComponent(Product)
