import axios from 'axios'

export function createOrder (order) {
  axios.post('https://contentful-api.netlify.com/.netlify/functions/server/orders', order)
    .then(response => {
      console.log(response.data)
      let checkoutContainer = document.getElementById('klarna-checkout-iframe')
      
      checkoutContainer.innerHTML = response.data.html_snippet

      let scriptsTags = checkoutContainer.getElementsByTagName('script')
      // This is necessary otherwise the scripts tags are not going to be evaluated
      for (let i = 0; i < scriptsTags.length; i++) {
        let parentNode = scriptsTags[i].parentNode
        let newScriptTag = document.createElement('script')
        newScriptTag.type = 'text/javascript'
        newScriptTag.text = scriptsTags[i].text
        parentNode.removeChild(scriptsTags[i])
        parentNode.appendChild(newScriptTag)
      }
    }).catch(error => {
      console.log(error)
    })
}