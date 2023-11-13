// Ticket (match, locations, price of totals)
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  match: {
    type: Schema.Types.ObjectId,
    ref: "Match",
  },
  locations: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  }
});
module.exports = mongoose.model("Ticket", ticketSchema);
