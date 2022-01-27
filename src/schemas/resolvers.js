const { AuthenticationError } = require('apollo-server-express');
const { User, Messages } = require('../models');

const resolvers = {
    //query for messages
    Query: {
        users: async () => {
            return User.find();
        },

        messages: async () => {
            return Messages.find();
        }
    },

    Mutation: {
        //create user mutation
        createUser: async (parent, args) => {
            const user = await User.create(args);
            // const token = signToken(user);

            return { user };
        },

        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findIdAndUpdate(context.user_id, args, { new: true });
            }
            throw new AuthenticationError('Not logged in');
        },
        //might be (parents, {messId, messText, messSent})
        createMessage: async (parent, args) => {
            return Messages.create(args);
        }
    }
}