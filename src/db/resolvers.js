const users = require('../useCases/users')
const products = require('../useCases/products')

// require('dotenv').config()

// const crearToken = (user, secret, expiresIn) => {
//   const { id, email, name } = user
//   return jwt.sign({ id }, secret, { expiresIn })
// }

// Resolvers
const resolvers = {
  Query: {
    getUserByToken: async (resutls, { token }, ctx, info) => {
      const user = await users.getByToken(token)
      return user
    },
    getAllUsers: async () => {
      try {
        const allUsers = await users.getAll()
        return allUsers
      } catch (error) {
        return { error }
      }
    },
    getAllProducts: async () => {
      try {
        const allProducts = await products.getAll()
        return allProducts
      } catch (error) {

      }
    },
    getAProduct: async (_, { id }) => {
      try {
        const product = await products.getById(id)
        return product
      } catch (error) {
        throw new Error(error)
      }
    }
  },
  Mutation: {
    newUser: async (_, { input }) => {
      try {
        const user = await users.create(input)
        return user
      } catch (error) {
        console.error('Error: ', error)
      }
    },
    authentication: async (_, { input }) => {
      const { email, password } = input
      const token = await users.login(email, password)
      return { token }
    },
    newProduct: async (_, { input }) => {
      try {
        const newProduct = await products.create(input)
        return newProduct
      } catch (error) {
        console.error('Error:', error)
      }
    },
    updatedProduct: async (_, { id, input }) => {
      try {
        const productUpdated = await products.updateById(id, input)
        return productUpdated
      } catch (error) {
        throw new Error(error)
      }
    },
    deleteProduct: async (_, { id }) => {
      try {
        await products.deleteById(id)
        return 'Product deleted successfully'
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}

module.exports = resolvers
