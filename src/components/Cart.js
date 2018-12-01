import React from 'react'
import PropTypes from 'prop-types'

import * as cartService from '../services/cart'
import { connectComponent } from '../connect'

import './Cart.scss'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.loadCart()
  }

  render() {
    const { entries } = this.props.cart

    return (
      <div className="cart">
        {entries && entries.length ? (
          <div className="cart-items">
            {entries.map(item => {
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

Cart.propTypes = {
  cart: PropTypes.object,
  loadCart: PropTypes.func
}

export default connectComponent(Cart)
