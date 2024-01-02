const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
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
        type: String
    }, email: {
        type: String,
        required: true
    }, role: {
        type: String
    }, status: {
        type: String
    }, tickets: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Ticket' }]
    }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);
