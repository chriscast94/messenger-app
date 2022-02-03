const { PubSub } = require('graphql-subscriptions');
const { AuthenticationError } = require('apollo-server-express');
const { withFilter } = require('graphql-yoga');
const { Users, Messages } = require('../models/models-index');

const pubsub = new PubSub();

const resolvers = {
    //query for messages
    Query: {
        users: async () => {
            return Users.find();
        },

        messages: async () => {
            return Messages.find();
        }
    },

    Mutation: {
        createUser: async (_, { userName, email }) => {
            const user = new Users({ userName, email });
            await user.save();
            pubsub.publish("newUser", { newUser: user });

            return user;
        },

        updateUser: async (_, { id, userName }) => {
            const user = await Users.findOneAndUpdate(
                { _id: id },
                { userName },
                { new: true }
            );

            return user;
        },

        deleteUser: async (_, { email }) => {
            await Promise.all([
                Users.findOneAndDelete({ email: email }),
                Messages.deleteMany({ senderMail: email })
            ]);
            pubsub.publish("oldUser", { oldUser: email });
            return true;
        },

        //send message awareness

        // userTyping: (_, { email, receiverMail }) => {
        //     pubsub.publish("userTyping", { userTyping: email, receiverMail });
        //     return true;
        // },

        createMessage: async (
            _,
            { senderMail, receiverMail, message, timestamp }
        ) => {
            const userText = new Messages({
                senderMail,
                receiverMail,
                message,
                timestamp
            });
            await userText.save();
            pubsub.publish("newMessage", {
                newMessage: userText,
                receiverMail: receiverMail
            });
            return userText;
        },

        updateMessages: async (_, { id, message }) => {
            const userText = await Messages.findOneAndUpdate(
                { _id: id },
                { message },
                { new: true }
            );
            return userText;
        },

        deleteMessages: async (_, { id }) => {
            await Messages.findOneAndDelete({ _id: id });
            return true;
        }
    },

    Subscription: {
        newMessages: {
            subscribe: withFilter(
                () => pubsub.asyncIterator("newMessage"),
                (payload, variables) => {
                    return payload.receiverMail === variables.receiverMail;
                }
            )
        },

        newUser: {
            subscribe: (_, { }, { pubsub }) => {
                return pubsub.asyncIterator("newUser");
            }
        },

        oldUser: {
            subscribe: (_, { }, { pubsub }) => {
                return pubsub.asyncIterator("oldUser");
            }
        },

        //send message awareness

    }
};

module.exports = resolvers;