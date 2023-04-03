const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        name: String
        email: String
        password: String
        savedScores: [Score]
    }
    type Auth {
        token: ID!
        user: User
    }
    type Score {
        _id: ID!
        score: Int 
        name: String
        createdAt: String
    }
    type PaymentIntent {
        _id: ID!
        amount: Int!
        currency: String!
        status: String!
        created: Float!
        customer: Customer!
    }
    
    type Customer {
        _id: ID!
        name: String!
        email: String!
    }

    type Query {
        me: User
        Users: [User]
        User(_id: ID!): User
        paymentIntent(_id: ID!): PaymentIntent
    }
    type Mutation {
        addUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createPaymentIntent(amount: Int!, currency: String!): PaymentIntent!
        saveScore(_id: ID!, score: Int!): User
    }
`;

module.exports = typeDefs;