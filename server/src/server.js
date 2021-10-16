require('dotenv').config()
const http = require('http')
const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const api = require('./routes/api')
const { loadInitialData } = require('./graphql/waitlist.model')

const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { loadFilesSync } = require('@graphql-tools/load-files')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'))
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'))

const { mongoConnect } = require('./services/mongo')

const PORT = process.env.PORT || 5000

async function startApolloServer() {
  const app = express()

  const httpServer = http.createServer(app)

  // graphql api
  const schema = makeExecutableSchema({
    typeDefs: typesArray,
    resolvers: resolversArray,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  const server = new ApolloServer({
    schema,
  })

  await server.start()

  server.applyMiddleware({ app, path: '/graphql' })
  app.use(
    cors({
      origin: 'http://localhost:3000',
    })
  )
  app.use(morgan('tiny'))
  app.use(express.json())

  // rest api version 1
  app.use('/v1', api)
  app.use(express.static(path.join(__dirname, '..', 'public')))
  app.get('/*', (req, res) => {
    console.log(path.join(__dirname, '..', 'public', 'index.html'))
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
  })

  await mongoConnect()
  await loadInitialData()
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve))
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
  console.log(`⬡ GraphQL playground ready at http://localhost:${PORT}${server.graphqlPath}`)
}

startApolloServer()
