const { gql } = require('apollo-server-express');

//typeDefs for users and messages
const typeDefs = gql`
type User {
    _id: ID
    firstName: String!
    lastName: String!
    email: String!
    messages:[Messages]
    
}

type Messages {
    _id: ID!
    messText: String!
    messTime: Float!
    messSender: String!
    messUser: [User]
}

type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): User
    updateUser(id: ID!, name: String!): User
    deleteUser(email: String!): User

    createMessage(messText: String!, messSender: String!, messTime: Float!, messSender: String!): Messages
    updateMessage(id: ID!, messText: String!): Messages
    deleteMessage(messID: ID!): Messages
}

`
module.exports = typeDefs;


// delete user and message option?