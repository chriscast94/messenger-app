const { PubSub, withFilter, GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
const { typeDefs, resolvers } = require('./schemas/schema-index');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect("mongodb://localhost/chatapp", {
    useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true
});

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
mongoose.connection.once("open", () =>
    server.start(() => console.log("Check it out at localhost:4000"))
);