const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

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

const PaymentIntent = model('PaymentIntent', PaymentIntentSchema);

module.exports = {PaymentIntent};