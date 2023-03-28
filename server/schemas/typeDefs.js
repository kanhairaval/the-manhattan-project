const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        savedScores: [Score]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Score {
        _id: ID
        score: Int
        name: String
        createdAt: String
    }

    type Query {
        users: [User]
        user(_id: ID!): User
        scores(username: String): [Score]
        score(_id: ID!): Score
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(_id: ID!, username: String, email: String, password: String): User
        deleteUser(_id: ID!): User
        addScore(score: Int!, name: String!): Score
        removeScore(_id: ID!): Score
    }
`;

module.exports = typeDefs;
