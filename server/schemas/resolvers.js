const { User } = require('../models');
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
                const userData = await User
                    .findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedScores')
                return userData;
            }
            throw new AuthenticationError('Not logged in');
        }
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
    }
};

module.exports = userResolvers;
