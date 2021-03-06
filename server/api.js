require('dotenv').config()

const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')
const requestPromise = require('request-promise')

const app = express()
const router = express.Router()

const KLARNA_URL = process.env.KLARNA_URL || 'https://api.playground.klarna.com'

const credentials = {
  username: process.env.KLARNA_USERNAME,
  password: process.env.KLARNA_PASSWORD
}

function headers () {
  const token = `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`

  return {
    'Content-Type': 'application/json',
    'Authorization': token
  }
}

router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST")
  next()
})

router.post('/orders', function (req, res, next) {
  requestPromise({
    method: 'POST',
    uri: `${KLARNA_URL}/checkout/v3/orders`,
    body: req.body,
    json: true,
    headers: headers()
  }).then(response => {
    console.log(response)
    res.send({
      html_snippet: response.html_snippet,
      order_id: response.order_id
    })
  }).catch(error => {
    console.log(error)
  })
})

router.get('/orders/:id', function (req, res, next) {
  requestPromise({
    method: 'GET',
    uri: `${KLARNA_URL}/checkout/v3/orders/${req.params.id}`,
    json: true,
    headers: headers()
  }).then(response => {
    console.log(response)
    res.send({
      html_snippet: response.html_snippet
    })
  }).catch(error => {
    console.log(error)
  })
})

app.use(bodyParser.json())
app.use('/api', router)
app.use('/.netlify/functions/api', router)

module.exports = app
module.exports.handler = serverless(app)