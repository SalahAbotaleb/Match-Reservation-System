// Match (Home team, Away team, key to stadium, reservation map (which are free seats), date&time, referee, linesman)
const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  homeTeam: {
    type: String,
    required: true,
  },
});
