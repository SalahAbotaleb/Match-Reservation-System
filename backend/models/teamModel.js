const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    abbreviation: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
        /**
         * TODO:
         * url link of the logo
         * to be changed to image link
         */
    }
});

module.exports = mongoose.model('Team', teamSchema);