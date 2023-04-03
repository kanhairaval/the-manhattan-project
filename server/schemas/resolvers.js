const { User, PaymentIntent } = require('../models/User');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const userResolvers = {
    Query: {
        Users: async () => {
            return User.find()
        },

        User: async (parent, { userId }) => {
            return User.findOne({ _id: userId
            });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            throw new AuthenticationError('Not logged in');
        },
        paymentIntent: async (parent, args, context) => {
            const paymentIntent = await stripe.paymentIntents.retrieve(args.id);
            const user = await User.findById(paymentIntent.metadata.userId);
            if (!user) {
              throw new AuthenticationError('You are not authorized to view this PaymentIntent');
            }
            return {
              id: paymentIntent.id,
              amount: paymentIntent.amount,
              currency: paymentIntent.currency,
              status: paymentIntent.status,
              created: paymentIntent.created,
              customer: user,
            };
        },
    },

    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        }, 

        addUser: async (parent, args) => {
            const {name, email, password} = args;
            const user = await User.create({name, email, password});
            const token = signToken(user);
            return {token, user};
        },

        saveScore: async (parent, args, context) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedScores: args } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        
        createPaymentIntent: async (parent, args, context) => {
            const { userId } = context;
            if (!userId) {
              throw new AuthenticationError('You must be logged in to create a PaymentIntent');
            }
            const user = await User.findById(userId);
            const paymentIntent = await stripe.paymentIntents.create({
              amount: args.amount,
              currency: args.currency,
              metadata: {
                userId: user._id.toString(),
              },
            });
            const newPaymentIntent = new PaymentIntent({
              amount: paymentIntent.amount,
              currency: paymentIntent.currency,
              status: paymentIntent.status,
              created: paymentIntent.created,
              customer: user._id,
            });
            await newPaymentIntent.save();
            return {
              id: newPaymentIntent._id,
              amount: newPaymentIntent.amount,
              currency: newPaymentIntent.currency,
              status: newPaymentIntent.status,
              created: newPaymentIntent.created,
              customer: {
                id: user._id,
                name: user.name,
                email: user.email,
              },
            };
        },  
    }
};

module.exports = userResolvers;
