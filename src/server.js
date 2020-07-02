const { ApolloServer } = require('apollo-server')
const typeDefs = require('./db/schema')
const resolvers = require('./db/resolvers')
const jwt = require('./lib/jwt')
require('dotenv').config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // console.log(req.headers.authorization)
    const { authorization: token } = req.headers
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY)
        return { user }
      } catch (error) {
        console.error('Error: ', error)
      }
    }
  }
})

module.exports = server
