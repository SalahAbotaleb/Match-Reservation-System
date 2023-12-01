// Match (Home team, Away team, key to stadium, reservation map (which are free seats), date&time, referee, linesman)
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  homeTeam: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  awayTeam: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  stadium: {
    type: Schema.Types.ObjectId,
    ref: "Stadium",
  },
  reservationMap: {
    type: [{ row: Number, column: Number }],
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  referee: {
    type: String,
    required: true,
  },
  linesman: {
    type: [String],
    required: true,
  }
});
module.exports = mongoose.model("Match", matchSchema);
