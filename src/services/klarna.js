import axios from 'axios'

export function createOrder (order) {
  axios.post('https://contentful-api.netlify.com/.netlify/functions/server/orders', order)
    .then(response => {
      console.log(response.data)
      var checkoutContainer = document.getElementById('my-checkout-container')

      checkoutContainer.innerHTML = response.data.html_snippet

      var scriptsTags = checkoutContainer.getElementsByTagName('script')
      // This is necessary otherwise the scripts tags are not going to be evaluated
      for (var i = 0; i < scriptsTags.length; i++) {
        var parentNode = scriptsTags[i].parentNode
        var newScriptTag = document.createElement('script')
        newScriptTag.type = 'text/javascript'
        newScriptTag.text = scriptsTags[i].text
        parentNode.removeChild(scriptsTags[i])
        parentNode.appendChild(newScriptTag)
      }
    }).catch(error => {
      console.log(error)
    })
}