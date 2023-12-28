// Ticket (match, locations, price of totals)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reservationMapSchema = new Schema({ row: Number, column: Number }, { _id: false });
const ticketSchema = new Schema({
  match: {
    type: Schema.Types.ObjectId,
    ref: "Match",
    required: true
  },
  locations: [reservationMapSchema],
  totalPrice: {
    type: Number,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  cardPin: {
    type: Number,
    required: true
  }
});

ticketSchema.post("save", async function (doc, next) {
  await this.populate("match");
  const match = await this.model("Match").findById(doc.match);
  match.reservationMap = match.reservationMap.concat(doc.locations);
  await match.save();
  next();
});
module.exports = mongoose.model("Ticket", ticketSchema);
