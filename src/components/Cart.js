import React from 'react'
import PropTypes from 'prop-types'

import { connectComponent } from '../connect'
import * as cartService from '../services/cart'

import './Cart.scss'

class Cart extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      items: []
    }
  }

  componentDidMount() {
    cartService.getCart().then(items => {
      this.setState({ items: items })
    })
  }

  render() {
    return (
      <div className="cart">
        {this.state.items.length ? (
          <div className="cart-items">
            {this.state.items.map(item => {
              return <div
                key={item.sys.id}
                className="cart-item">
                <h3 className="cart-item-name">{item.fields.name}</h3>
                <h3 className="cart-item-price">{item.fields.price} {item.fields.currency}</h3>
              </div>
            })}
          </div>
        ) : (
          <div className="cart-empty">Your bag is empty :(</div>
        )}
      </div>
    )
  }
}

export default Cart
