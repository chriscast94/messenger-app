import { PubSub } from 'graphql-subscriptions';
const { AuthenticationError } = require('apollo-server-express');
const { withFilter } = require('graphql-yoga');
const { User, Messages } = require('../models');

const pubsub = new PubSub();

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
        //from 21 act 25
        //might be (parent, {name, email})
        createUser: async (parent, args) => {
            const user = await User.create(args);
            // const token = signToken(user);

            return { user };
        },
        //update user mutation
        //might be (parent, {name, email})
        //from 21 act 25
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findIdAndUpdate(context.user_id, args, { new: true });
            }
            throw new AuthenticationError('Not logged in');
        },

        //deleteuser
        deleteUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }
            throw new AuthenticationError('Did this user even exist?');
        },

        //view messages being sent and when it's types

        createMessage: async (parent, { messSender, messReceiver, messTime, messText }, context) => {
            const userText = new Messages({
                messSender,
                messReceiver,
                messText,
                messTime
            });
            await userText.save();
            pubsub.publish('newMessage', {
                newMessage: userText,
                messReceiver: messReceiver
            })
            return userText;
        },

        updateMessage: async (parent, { id, messages }) => {
            const userText = await Messages.findOneAndUpdate(
                { _id: id },
                { messages },
                { new: true }
            );
            return userText;
        },

        //deletemessages
        deleteMessages: async (parent, { id }) => {
            await Messages.findOneAndDelete({ _id: id });
            return true;
        }
    },

    Subscription: {
        newMessage: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("newMessage"),
                (payload, variables) => {
                    return payload.messReceiver === variables.messReceiver
                }
            )
        },

        newUser: {
            subscribe: (parent, { args }, { pubsub }) => {
                return pubsub.asyncIterator("newUser");
            }
        },

        oldUser: {
            subscribe: (parent, { args }, { pubsub }) => {
                return pubsub.asyncIterator("newUser");
            }
        },

        //send message awareness

    }
};

module.exports = resolvers;