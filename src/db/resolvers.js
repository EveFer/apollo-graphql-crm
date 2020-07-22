const users = require('../useCases/users')
const products = require('../useCases/products')
const clients = require('../useCases/clients')
const orders = require('../useCases/orders')

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
        throw new Error(error)
      }
    },
    getAProduct: async (_, { id }) => {
      try {
        const product = await products.getById(id)
        return product
      } catch (error) {
        throw new Error(error)
      }
    },
    getAllClients: async () => {
      try {
        const allClients = await clients.getAll()
        return allClients
      } catch (error) {
        throw new Error(error)
      }
    },
    getClientsBySeller: async (_, { }, ctx) => {
      try {
        const { _id: seller } = ctx.user
        const clientsBySeller = await clients.getBySeller(seller)
        return clientsBySeller
      } catch (error) {

      }
    },
    getAClient: async (_, { id }, ctx) => {
      try {
        const { _id: seller } = ctx.user
        const client = await clients.getById(id, seller)
        return client
      } catch (error) {
        throw new Error(error)
      }
    },
    getOrders: async () => {
      try {
        const allOrders = await orders.getAll()
        return allOrders
      } catch (error) {
        throw new Error(error)
      }
    },
    getOrdersBySeller: async (_, {}, ctx) => {
      try {
        const { _id: sellerCurrent } = ctx.user
        const allOrders = await orders.getBySeller(sellerCurrent)
        return allOrders
      } catch (error) {
        throw new Error(error)
      }
    },
    getAOrder: async (_, { id }, ctx) => {
      try {
        const { _id: sellerCurrent } = ctx.user
        const order = await orders.getAOrder(id, sellerCurrent)
        return order
      } catch (error) {
        throw new Error(error)
      }
    },
    getOrdersByStatus: async (_, { status }, ctx) => {
      try {
        const { _id: sellerCurrent } = ctx.user
        const allOrders = orders.getOrdersByStatus(status, sellerCurrent)
        return allOrders
      } catch (error) {
        throw new Error(error)
      }
    },
    betterClients: async () => {
      try {
        const betterClients = await clients.betterClients()
        return betterClients
      } catch (error) {
        throw new Error(error)
      }
    },
    betterSellers: async () => {
      try {
        const betterSellers = await users.betterSellers()
        return betterSellers
      } catch (error) {

      }
    },
    searchProducts: async (_, { text }) => {
      try {
        const searchedProducts = await products.search(text)
        return searchedProducts
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
    },
    newClient: async (_, { input }, ctx) => {
      try {
        const { _id: seller } = ctx.user
        const clientCreated = await clients.create(input, seller)
        return clientCreated
      } catch (error) {
        throw new Error(error)
      }
    },
    updateClient: async (_, { id, input }, ctx) => {
      try {
        const { _id: seller } = ctx.user
        const clientUpdated = await clients.updateById(id, input, seller)
        return clientUpdated
      } catch (error) {
        throw new Error(error)
      }
    },
    deleteClient: async (_, { id }, ctx) => {
      try {
        const { _id: seller } = ctx.user
        await clients.deleteById(id, seller)
        return 'Client successfully deleted'
      } catch (error) {
        throw new Error(error)
      }
    },
    newOrder: async (_, { input }, ctx) => {
      try {
        const { _id: seller } = ctx.user
        const orderCreated = await orders.create(input, seller)
        return orderCreated
      } catch (error) {
        throw new Error(error)
      }
    },
    updateOrder: async (_, { id, input }, ctx) => {
      try {
        const { _id: seller } = ctx.user
        const orderUpdated = await orders.updatedById(id, seller, input)
        return orderUpdated
      } catch (error) {
        throw new Error(error)
      }
    },
    deleteOrder: async (_, { id }, ctx) => {
      try {
        const { _id: seller } = ctx.user
        await orders.deleteById(id, seller)
        return 'Order deleted successfully'
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}

module.exports = resolvers
