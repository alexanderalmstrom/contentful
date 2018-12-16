import axios from 'axios'

export function createOrder (order) {
  axios.post('/api/orders', order)
    .then(response => {
      console.log(response)

      document.getElementById('klarna-checkout-iframe').innerHTML = response.html_snippet
    }).catch(error => {
      console.log(error)
    })
}