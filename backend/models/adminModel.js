const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({});
module.exports = mongoose.model("Admin", adminSchema);