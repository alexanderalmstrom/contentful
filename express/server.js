const path = require('path')
const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

router.get('/hello', function(req, res) {
  res.json({ message: "Hello!" })
})

app.use(bodyParser.json())
app.use('/.netlify/functions/server', router)

module.exports = app
module.exports.handler = serverless(app)