import React from 'react'
import PropTypes from 'prop-types'

import { connectComponent } from '../connect'
import * as cartService from '../services/cart'

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
      <div id="cart">
        {this.state.items.length ? (
          <div className="cart-items">
            {this.state.items.map(item => {
              return <div className="cart-item">{item.fields.name}</div>
            })}
          </div>
        ) : null}
      </div>
    )
  }
}

export default Cart
