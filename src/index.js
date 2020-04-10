'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 3333,
    host: 'localhost'
  })

  await server.register({
    plugin: require('hapi-pino'),
    options: { name: 'haw.ai' }
  })

  await server.register({
    plugin: require('@hapi/inert')
  })

  require('hapi-spa-serve')(server, { assets: require('path').join(__dirname, '../dist') })

  server.route({
    method: 'POST',
    handler: async (request, h) => {
      return { text: 'Message Saved!' }
    }
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
