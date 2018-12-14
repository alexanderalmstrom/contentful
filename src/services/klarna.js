import axios from 'axios'

const order = require('../../order.json')

class Klarna {
  constructor () {

  }

  createOrder () {
    return await axios.get('https://api.playground.klarna.com/checkout/v3/orders', order)
  }

  updateOrder () {

  }

  getOrder () {

  }
}

export default Klarna