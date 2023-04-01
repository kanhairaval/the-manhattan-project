const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const userResolvers = {
    Query: {
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
            const {username, email, password} = args;
            const user = await User.create({username, email, password});
            const token = signToken(user);
            return {token, user};
        },
        updateUser: async (parent, args) => {
            const {username, email, password} = args;
            const user = await User.findById(args._id);
            if (username) user.name = username;
            if (email) user.email = email;
            if (password) user.password = password;
            await user.save();
            return user;
        },
        deleteUser: async (parent, args) => {
            const user = await User.findByIdAndDelete(args._id);
            return user;
        },
        saveScore: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedScores: args.scoreId } },
                    { new: true }
                );
                return user;
            }
            throw new AuthenticationError('You need to be logged in!');
        }         
    }
};

module.exports = userResolvers;
