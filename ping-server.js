const axios = require('axios')
const { loadEnvConfig } = require('@next/env')

loadEnvConfig('.')

const log = (...args) => {
  console.log(new Date(), '[PING]', ...args)
}

const ping = async () => {
  const url = process.env.PING_SERVER_URL
  log(url)

  const response = await axios
    .get(url)
    .catch((error) => error.response || { data: error })
  log(response?.status, response?.data)

  setTimeout(() => ping(), process.env.PING_SERVER_INTERVAL * 1000)
}

const startServer = () => {
  // espera um pouco antes de começar para dar tempo do next iniciar o servidor
  setTimeout(() => ping(), 3000)
}

startServer()
