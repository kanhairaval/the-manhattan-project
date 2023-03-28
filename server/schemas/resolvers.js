const UserSchema = new mongoose.Schema({
    username: { type: String,   required: true, unique: true, trim: true },
    email:    { type: String,   required: true, unique: true, match: [/.+@.+\..+/, 'Must use a valid email address'] },
    password: { type: String,   required: true, minlength: 5 },
    savedScores: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Score'
        }
    ]
});

const User = mongoose.model('User', UserSchema);

const userResolvers = {
    Query: {
        users: async () => {
            const users = await User.find();
            return users;
        },
        user: async (parent, { _id }) => {
            const user = await User.findById(_id);
            return user;
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const {name, email, password} = args;
            const user = await User.create({name, email, password});
            await user.save();
            return user;
        },
        updateUser: async (parent, args) => {
            const {name, email, password} = args;
            const user = await User.findById(args._id);
            if (name) user.name = name;
            if (email) user.email = email;
            if (password) user.password = password;
            await user.save();
            return user;
        },
        deleteUser: async (parent, args) => {
            const user = await User.findByIdAndDelete(args._id);
            return user;
        },                
    }
};

module.exports = userResolvers;
