import React from 'react'
import PropTypes from 'prop-types'
import { connectComponent } from '../connect'

import * as cartService from '../services/cart'
import { createOrder, getOrder, getTax } from '../services/klarna'

import Image from './Image'

import './Checkout.scss'

class Checkout extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tax_rate: 2500
    }
  }

  componentDidMount () {
    this.props.loadCart()
    cartService.closeCart()
  }

  componentDidUpdate () {
    const order = JSON.parse(localStorage.getItem('order'))

    if (order) {
      this.getOrder(order)
    } else {
      this.createOrder()
    }
  }

  createOrder () {
    const { cart } = this.props
    const { entries } = cart

    if (!cart.fetching && entries.length > 0) return

    const order = {
      "order_lines": [],
      "shipping_options": [
        {
          "id": "free_shipping",
          "name": "Free shipping",
          "price": 0,
          "tax_amount": 0,
          "tax_rate": 0
        }
      ]
    }

    entries.map(entry => {
      const { quantity } = entry
      const { name, price } = entry.fields

      order.order_lines.push({
        "name": name,
        "quantity": quantity,
        "unit_price": (price * 100),
        "tax_rate": this.state.tax_rate,
        "total_amount": (price * 100) * quantity,
        "total_tax_amount": getTax((price * 100) * quantity, this.state.tax_rate)
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

  getOrder ({ quantity, order_id }) {
    const { cart } = this.props
    const { entries } = cart

    if (entries.length == quantity) {
      getOrder(order_id)
    } else {
      this.createOrder()
    }
  }

  render () {
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
                  <div className="cart-item-quantity">
                    QTY {item.quantity}
                  </div>
                </div>
              </div>
            )
          })}
          <div id="kco-container"></div>
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