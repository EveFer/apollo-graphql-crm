const { ApolloServer } = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    const miContext = 'Hola'
    return { miContext }
  }
})

module.exports = server
