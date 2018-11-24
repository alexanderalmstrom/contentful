import React from 'react'
import PropTypes from 'prop-types'

import { connectComponent } from '../connect'

import Loading from './Loading'
import Image from './Image'
import Products from './Products'

import './Product.scss'
import { getEnvironment } from '../services/management'

class Product extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      locale: 'en-US',
      available: true
    }
  }

  componentDidMount() {
    if (!this.props.products.entries.length) {
      this.props.loadProducts()
    }
  }

  componentDidUpdate() {
    window.scrollTo(0, 0)
  }

  addToCart (e, id) {
    e.preventDefault()

    if (this.props.management.authState == 'success') {
      getEnvironment()
        .then(environment => environment.getEntry(id))
        .then(entry => {
          let stock = parseInt(entry.fields.stock[this.state.locale])

          if (stock < 1) {
            this.setState({
              available: false
            })
          } else {
            stock--
            entry.fields.stock[this.state.locale] = stock
            entry.update()
          }
        })
        .catch(console.error)
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
                onClick={(e) => this.addToCart(e, entry.sys.id) }>
                Add to cart
              </button>
              { !this.state.available ? (
                <p>Product is out of stock.</p>
              ) : null }
            </div>
            { entry.fields.related ? (
              <div className="related-products">
                <h3 className="related-products-title">Related products</h3>
                <Products products={entry.fields.related} />
              </div>
            ) : null }
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
