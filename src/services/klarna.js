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
  order = Object.assign(config, order)

  axios.post(`${API_URL}/orders`, { crossDomain: true }, order)
    .then(response => {
      const { html_snippet } = response.data

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
    }).catch(error => {
      console.log(error)
    })
}

export function getOrder (id) {
  axios.get(`${API_URL}/${id}`)
    .then(response => {
      const { html_snippet } = response.data

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
    }).catch(error => {
      console.log(error)
    })
}

export function getTax (total_amount, tax_rate) {
  return total_amount - total_amount * 10000 / (10000 + tax_rate)
}