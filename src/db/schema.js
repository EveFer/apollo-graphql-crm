const { gql } = require('apollo-server')

// Schema
const typeDefs = gql`
    type User {
        id: ID
        name: String
        lastName: String
        email: String
        createdAt: String
        updatedAt: String
    }

    type Product {
        id: ID
        name: String
        stock: Int
        price: Float
        createdAt: String
        updatedAt: String
    }

    type Client {
        id: ID
        name: String!
        lastName: String!
        company: String!
        email: String!
        phone: String
        seller: ID
        createdAt: String
        updatedAt: String
    }

    type Token {
        token: String
    }

    input UserInput {
        name: String!
        lastName: String!
        email: String!
        password: String!
    }

    input ProductInput {
        name: String!
        stock: Int!
        price: Float!
    }

    input ClientInput {
        name: String!
        lastName: String!
        company: String!
        email: String!
        phone: String
    }

    input AuthenticationInput {
        email: String!
        password: String!
    }

    type Query {
        #users
        getUserByToken(token: String!): User
        getAllUsers: [User]
        #products
        getAllProducts: [Product]
        getAProduct(id: ID!): Product
        #clients
        getAllClients: [Client]
        getClientsBySeller: [Client]
        getAClient(id: ID!): Client
    }

    type Mutation {
        #users
        newUser(input: UserInput): User
        authentication(input: AuthenticationInput): Token
        #products
        newProduct(input: ProductInput): Product
        updatedProduct(id: ID!, input: ProductInput): Product
        deleteProduct(id: ID!): String
        #clients
        newClient(input: ClientInput): Client
        updateClient(id: ID!, input: ClientInput): Client
        deleteClient(id: ID!): String
    }
`

module.exports = typeDefs
