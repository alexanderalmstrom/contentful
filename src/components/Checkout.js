import React from 'react'
import PropTypes from 'prop-types'
import { connectComponent } from '../connect'

import * as cartService from '../services/cart'
import * as productService from '../services/product'
import { createOrder, getOrder, getTax } from '../services/klarna'

import Image from './Image'

import './Checkout.scss'

class Checkout extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tax_rate: 2500
    }
  }

  componentWillMount () {
    document.querySelector('body').classList.add('is-checkout')
  }

  componentWillUnmount () {
    document.querySelector('body').classList.remove('is-checkout')
  }

  componentDidMount() {
    this.props.loadCart()
    cartService.closeCart()
  }

  componentDidUpdate() {
    if (!this.props.cart || this.props.cart.fetching) return

    const cart = cartService.getCart()

    if (!cart) return

    const order = cartService.getOrder()

    if (order) {
      const { order_length, order_id } = order

      if (order_id && order_length && order_length == cart.length) {
        getOrder(order_id)
      } else {
        this.createOrder()
      }
    } else {
      this.createOrder()
    }
  }

  createOrder() {
    const { entries } = this.props.cart

    const order = {
      order_lines: [],
      shipping_options: [
        {
          id: 'free_shipping',
          name: 'Fri frakt',
          price: 0,
          tax_amount: 0,
          tax_rate: 0
        }
      ]
    }

    entries.map(entry => {
      const { quantity } = entry
      const { name, price } = entry.fields

      order.order_lines.push({
        name: name,
        quantity: quantity,
        unit_price: price * 100,
        tax_rate: this.state.tax_rate,
        total_amount: price * 100 * quantity,
        total_tax_amount: getTax(price * 100 * quantity, this.state.tax_rate)
      })

      order.order_amount = order.order_lines.reduce((acc, obj) => {
        return acc + obj.total_amount
      }, 0)

      order.order_tax_amount = order.order_lines.reduce((acc, obj) => {
        return acc + obj.total_tax_amount
      }, 0)
    })

    createOrder(order)
  }

  removeFromCart(id, quantity, e) {
    e.preventDefault()

    if (this.props.management.authState == 'success') {
      e.target.parentNode.classList.add('loading')

      productService.cart('remove', id, quantity).then(() => {
        this.props.loadCart().then(() => {
          if (this.props.cart.entries.length < 1) {
            localStorage.removeItem('order')
            window.location = '/'
          }
        })
      })
    }
  }

  render() {
    const { entries } = this.props.cart

    return (
      <div className="checkout">
        <div className="container">
          {entries.map(item => {
            return (
              <div key={item.sys.id} className="cart-item">
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
                  <div className="cart-item-quantity">QTY {item.quantity}</div>
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
          <div id="kco-container" />
        </div>
      </div>
    )
  }
}

Checkout.propTypes = {
  loadCart: PropTypes.func,
  cart: PropTypes.object
}

export default connectComponent(Checkout)
