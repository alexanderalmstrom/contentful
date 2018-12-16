import axios from 'axios'

const API_URL = 'https://contentful-api.netlify.com/.netlify/functions/server'

const config = {
  merchant_urls: {
    terms: "https://www.contentfulapp.com/terms",
    checkout: "https://www.contentfulapp.com/checkout",
    confirmation: "https://www.contentfulapp.com/confirmation",
    push: "https://www.contentfulapp.com/push"
  }
}

export function createOrder (order) {
  const _order = Object.assign(config, order)

  const response = axios.post(`${API_URL}/orders`, _order)
    .then(response => {
      const { html_snippet, order_id } = response.data

      if (!html_snippet) return

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

      localStorage.setItem('order', JSON.stringify(order_id))

      return response
    }).catch(error => {
      console.log(error)
    })

  return response
}

export function getOrder (id) {
  const response = axios.post(`${API_URL}/${id}`)
    .then(response => {
      const { html_snippet } = response.data.response

      if (!html_snippet) return

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

      return response
    }).catch(error => {
      console.log(error)
    })

  return response
}

export function getTax (total_amount, tax_rate) {
  return total_amount - total_amount * 10000 / (10000 + tax_rate)
}