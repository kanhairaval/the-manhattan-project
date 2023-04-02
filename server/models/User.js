const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
      },
      password: {
        type: String,
        required: true,
        minlength: 5,
      },
        savedScores: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Score',
            },
        ]
    });

const PaymentIntentSchema = new Schema({
    amount: Number,
    currency: String,
    status: String,
    created: Number,
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


userSchema.pre('save', async function(next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);
const PaymentIntent = model('PaymentIntent', PaymentIntentSchema);

module.exports = {User, PaymentIntent};

