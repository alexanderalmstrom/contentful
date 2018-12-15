import axios from 'axios'

const credentials = {
  username: process.env.KLARNA_USERNAME,
  password: process.env.KLARNA_PASSWORD
}

const config = {
  purchase_country: "se",
  purchase_currency: "sek",
  locale: "sv-se"
}

function headers () {
  const token = `Basic ${Buffer.from(`${credentials.username}:${credentials.password}`).toString('base64')}`

  return {
    'Content-Type': "application/json",
    'Authorization': token
  }
}

export function createOrder (order) {
  const data = Object.assign(config, order)

  return axios({
    method: 'post',
    url: 'https://api.playground.klarna.com/checkout/v3/orders',
    data: data,
    headers: headers()
  })
}