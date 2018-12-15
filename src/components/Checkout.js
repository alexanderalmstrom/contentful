import React from 'react'
import { createOrder } from '../services/klarna'

const order = require('../../order.json')

class Checkout extends React.Component {
  constructor (props) {
    super(props)
  }
  
  render () {
    return (
      <div className="checkout">
        <button onClick={createOrder.bind(this, order)}>Create order</button>
        <div id="klarna-checkout-iframe"></div>
      </div>
    )
  }
}

export default Checkout