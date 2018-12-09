import React from 'react'
import PropTypes from 'prop-types'

import * as cartService from '../services/cart'
import * as productService from '../services/product'
import { connectComponent } from '../connect'

import Image from './Image'

import './Cart.scss'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadCart()
  }

  removeFromCart(id, quantity, e) {
    e.preventDefault()

    if (this.props.management.authState == 'success') {
      e.target.parentNode.classList.add('loading')
      
      productService.cart('remove', id, quantity).then(() => {
        this.props.loadCart()
      })
    }
  }

  render() {
    const { entries } = this.props.cart

    return (
      <div className="cart">
        <div className="cart-content">
          {entries && entries.length ? (
            <div className="cart-items">
              {entries.map(item => {
                return (
                  <div
                    key={item.sys.id}
                    className="cart-item">
                    <Image
                      image={item.fields.image}
                      width={100}
                      className="cart-item-image"
                    />
                    <div className="cart-item-details">
                      <div className="cart-item-name">{item.fields.name}</div>
                      <div className="cart-item-price">
                        {item.fields.price}
                        <span className="currency">{item.fields.currency}</span>
                      </div>
                      <div className="cart-item-quantity">
                        QTY {item.quantity}
                      </div>
                    </div>
                    <button
                      className="cart-remove"
                      onClick={this.removeFromCart.bind(
                        this,
                        item.sys.id,
                        item.quantity
                      )}>
                      X
                    </button>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="cart-empty">Your bag is empty :(</p>
          )}
        </div>
        <div
          className="backdrop cart-backdrop"
          onClick={cartService.closeCart.bind(this)}
        />
      </div>
    )
  }
}

Cart.propTypes = {
  cart: PropTypes.object,
  loadCart: PropTypes.func
}

export default connectComponent(Cart)
