const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const saveScoreSchema = new Schema({
    score: {
        type: Number,
        required: true,
        unique: true,
        trim: true,
        },
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        },
    createdAt: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        },
});

const Score = model('SaveScore', saveScoreSchema);

module.exports = {Score};
