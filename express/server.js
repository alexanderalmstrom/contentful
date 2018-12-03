const path = require('path')
const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, 'build')))

router.get('*', (res, req) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

router.get('/product', (res, req) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.use('/.netlify/functions/server', router)

module.exports = app
module.exports.handler = serverless(app)