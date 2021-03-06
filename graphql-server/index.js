const express = require('express')
const { ApolloServer } = require('apollo-server-express')
// const typeDefs = require('./schema') // JS cuando es un index el sabe que exporta
const { typeDefs, resolvers } = require('./schema')
// const resolvers = require('./resolvers')
// const mocks = require('./mock')
require('./db/setup')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: error => {
    return {
      code: 'A43',
      name: error.name,
      message: error.message
    }
  }

  // mocks,
  // mockEntireSchema: false, // para anular los datos mocks y se resuelva las peticiones con los Resolvers
})

const app = express()

server.applyMiddleware({ app })

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
