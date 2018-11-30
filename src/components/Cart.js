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
        {entries ? (
          <div className="cart-items">
            {Object.keys(entries).map((id, index) => {
              return <div
                key={entries[id].sys.id}
                className="cart-item">
                <h3 className="cart-item-name">{entries[id].fields.name}</h3>
                <h3 className="cart-item-price">{entries[id].fields.price} {entries[id].fields.currency}</h3>
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
