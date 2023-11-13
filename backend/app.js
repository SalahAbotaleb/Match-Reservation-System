const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/TicketReservation');
const db = mongoose.connection;
db.once("connected", () => {
    console.log("connected to db");
});
db.on("error", (err) => {
    console.log(err);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("server is running");
});

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>");
});
