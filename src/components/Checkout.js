import React from 'react'
import PropTypes from 'prop-types'
import { connectComponent } from '../connect'

import { createOrder, getTax } from '../services/klarna'

import Image from './Image'

import './Checkout.scss'

class Checkout extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tax_rate: 2500
    }
  }

  componentWillMount () {
    this.props.loadCart()
  }
  
  componentDidMount() {
    
  }

  componentDidUpdate () {
    const { cart } = this.props
    const { entries } = cart

    if (!cart.fetching && entries.length > 0) {
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
        order.order_lines.push({
          "name": entry.fields.name,
          "quantity": entry.quantity,
          "unit_price": entry.fields.price,
          "tax_rate": this.state.tax_rate,
          "total_amount": entry.fields.price * entry.quantity,
          "total_tax_amount": getTax(entry.fields.price * entry.quantity, this.state.tax_rate)
        })

        order.order_amount = order.order_lines.reduce((acc, obj) => {
          return acc + obj.total_amount
        }, 0)

        order.order_tax_amount = order.order_lines.reduce((acc, obj) => {
          return acc + obj.total_tax_amount
        }, 0)
      })

      console.log(order)

      createOrder(order)
    }
  }

  createOrder () {
    
  }

  getOrder (item) {

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