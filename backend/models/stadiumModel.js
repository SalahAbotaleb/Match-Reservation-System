const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stadiumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    dimensions: {
        rows: {
            type: Number,
            required: true
        },
        columns: {
            type: Number,
            required: true
        }
    }
});

module.exports = mongoose.model("Stadium", stadiumSchema);