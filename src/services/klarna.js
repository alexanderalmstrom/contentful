import axios from 'axios'

const API_URL = process.env.NODE_ENV == 'production' ? 'https://contentful-api.netlify.com/.netlify/functions/server' : 'http://localhost:3000/api'

const config = {
  purchase_country: "SE",
  purchase_currency: "SEK",
  locale: "sv-SE",
  merchant_urls: {
    terms: "https://www.contentfulapp.com/terms",
    checkout: "https://www.contentfulapp.com/checkout",
    confirmation: "https://www.contentfulapp.com/confirmation",
    push: "https://www.contentfulapp.com/api/push"
  }
}

function renderCheckout (html_snippet) {
  const checkoutContainer = document.getElementById('kco-container')

  checkoutContainer.innerHTML = html_snippet

  const scriptsTags = checkoutContainer.getElementsByTagName('script')

  for (let i = 0; i < scriptsTags.length; i++) {
    const parentNode = scriptsTags[i].parentNode
    const newScriptTag = document.createElement('script')
    newScriptTag.type = 'text/javascript'
    newScriptTag.text = scriptsTags[i].text
    parentNode.removeChild(scriptsTags[i])
    parentNode.appendChild(newScriptTag)
  }
}

export function createOrder (order) {
  order = Object.assign(config, order)

  console.log('CREATE ORDER: ', order)

  const response = axios.post(`${API_URL}/orders`, order)
    .then(response => {
      const { html_snippet, order_id } = response.data

      if (!html_snippet) return

      renderCheckout(html_snippet)
      
      const quantity = order.order_lines.reduce((acc, obj) => {
        return acc + obj.quantity
      }, 0)

      localStorage.setItem('order', JSON.stringify({
        quantity: quantity,
        order_id: order_id
      }))

      return response
    }).catch(error => {
      console.log(error)
    })

  return response
}

export function getOrder (id) {
  console.log('GET ORDER: ', id)

  const response = axios.get(`${API_URL}/orders/${id}`)
    .then(response => {
      const { html_snippet } = response.data

      if (!html_snippet) return

      renderCheckout(html_snippet)

      return response
    }).catch(error => {
      console.log(error)
    })

  return response
}

export function getTax (total_amount, tax_rate) {
  return total_amount - total_amount * 10000 / (10000 + tax_rate)
}
