require('dotenv').config()

const path = require('path')
const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const requestPromise = require('request-promise')

const env = process.env.NODE_ENV || 'production'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 5000

const credentials = {
  username: process.env.KLARNA_USERNAME,
  password: process.env.KLARNA_PASSWORD
}

const config = {
  purchase_country: "se",
  purchase_currency: "sek",
  locale: "sv-se"
}

app.use(bodyParser.json())

if (env == 'development') {
  app.use(morgan('dev'))
}

if (env == 'production') {
  app.use(morgan('combined'))
}

app.use(express.static(path.resolve(__dirname, 'build')))

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.post('/api/create-order', function (req, res) {
  const data = Object.assign(config, req.body)

  const token = `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`

  requestPromise({
    method: 'POST',
    uri: 'https://api.playground.klarna.com/checkout/v3/orders',
    body: data,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    json: true
  }).then(response => {
    console.log(response)
    res.send({ html_snippet: response.html_snippet })
  }).catch(error => {
    console.log(error)
  })
})

server.listen(port, function () {
  console.log("Listening on port %s", server.address().port)
})
