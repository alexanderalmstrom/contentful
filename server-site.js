require('dotenv').config()

const path = require('path')
const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const env = process.env.NODE_ENV || 'production'

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 5000

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

server.listen(port, function () {
  console.log("Listening on port %s", server.address().port)
})
