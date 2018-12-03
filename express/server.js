const path = require('path')
const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

app.use(bodyParser.json())

router.get('/*', function(res, req) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.use('/.netlify/functions/server', router)

module.exports = app
module.exports.handler = serverless(app)