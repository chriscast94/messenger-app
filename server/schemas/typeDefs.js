const { gql } = require('apollo-server-express');

//typeDefs for users and messages
const typeDefs = gql`
type Users {
    _id: ID
    userName: String!
    email: String!
    messages:[Messages] 
}

type Messages {
    _id: ID!
    messText: String!
    messTime: Float!
    messSender: String!
    messReceiver: String!
    users:[Users]
}

type Query {
    users: [Users]
    messages: [Messages]
}

type Mutation {
    createUser(userName: String!, email: String!): Users
    updateUser(id: ID!, userNName: String!): Users
    deleteUser(email: String!): Boolean

    createMessage(messText: String!, messSender: String!, messTime: Float!, messSender: String!): Messages
    updateMessages(id: ID!, messText: String!): Messages
    deleteMessages(messID: ID!): Messages
}

type Subscription {
    newMessages: Messages
    newUser: Users
    oldUser: String
}

`;
module.exports = typeDefs;