import axios from 'axios'

class Klarna {
  constructor () {

  }

  createOrder () {
    const request = await axios.get('/checkout/v3/orders', {
      "purchase_currency": "sek",
      "locale": "sv-se",
      "order_amount": 1000,
      "order_tax_amount": 250,
      "order_lines": [
        {
          "name": "Cat t-shirt",
          "quantity": 2,
          "unit_price": 500,
          "tax_rate": 2500,
          "total_amount": 1000,
          "total_tax_amount": 250
        }
      ],
      "merchant_urls": {
        "terms": "https://www.contentfulapp.com/terms",
        "checkout": "https://www.contentfulapp.com/checkout",
        "confirmation": "https://www.contentfulapp.com/confirmation",
        "push": "https://www.contentfulapp.com/push"
      },
      "shipping_options": [
        {
          "id": "free_shipping",
          "name": "Free shipping",
          "price": 0,
          "tax_amount": 0,
          "tax_rate": 0
        }
      ]
    })
  }

  updateOrder () {

  }

  getOrder () {

  }
}

export default Klarna