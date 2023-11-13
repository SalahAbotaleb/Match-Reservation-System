const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    }, firstName: {
        type: String,
        required: true
    }, lastName: {
        type: String,
        required: true
    }, birthDate: {
        type: Date,
        required: true
    }, gender: {
        type: String,
        required: true
    }, city: {
        type: String,
        required: true
    }, address: {
        type: String,
    }, email: {
        type: String,
        required: true
    }, role: {
        type: string
    }, pending: {
        type: Boolean
    }, tickets: {
        type: [Schema.Types.ObjectId],
        ref: 'Ticket'
    }
});

module.exports = mongoose.model("User", userSchema);
