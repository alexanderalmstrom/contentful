import axios from 'axios'

export function createOrder (order) {
  axios.post('https://contentful-api.netlify.com/.netlify/functions/server/orders', order)
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