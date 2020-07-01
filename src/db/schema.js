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
    }

    type Mutation {
        #users
        newUser(input: UserInput): User
        authentication(input: AuthenticationInput): Token
        #products
        newProduct(input: ProductInput): Product
        updatedProduct(id: ID!, input: ProductInput): Product
        deleteProduct(id: ID!): String

    }
`

module.exports = typeDefs
