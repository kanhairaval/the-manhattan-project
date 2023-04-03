const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const saveScoreSchema = new Schema({
    score: {
        type: Number,
        required: true,
    }

});

const SaveScore = model('SaveScore', saveScoreSchema);

module.exports = {SaveScore};
