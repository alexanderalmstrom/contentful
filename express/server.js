const path = require('path')
const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

router.get('/hello', function(res, req) {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write('<h1>Hello!</h1>')
  res.end()
})

app.use(bodyParser.json())
app.use('/.netlify/functions/server', router)

module.exports = app
module.exports.handler = serverless(app)