const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const saveScoreSchema = new Schema({
    score: Number,
    name: String,
    createdAt: String,
});

const SaveScore = model('SaveScore', saveScoreSchema);

module.exports = {SaveScore};
