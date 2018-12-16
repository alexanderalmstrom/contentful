import React from 'react'
import { createOrder } from '../services/klarna'

const order = require('../../order.json')

import './Checkout.scss'

class Checkout extends React.Component {
  constructor (props) {
    super(props)
  }
  
  componentDidMount() {
    createOrder(order)
  }

  render () {
    return (
      <div className="checkout">
        <div className="container">
          <div id="kco-container"></div>
        </div>
      </div>
    )
  }
}

export default Checkout