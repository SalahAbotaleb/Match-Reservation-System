const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const asyncHandler = require("./utils/asyncHandler");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const expressSession = require("express-session");
const authorizeUser = require("./utils/authorizeUser");

/**
 * Mongoose connection
*/
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION_STRING);
const db = mongoose.connection;

db.once("connected", () => {
    console.log("connected to db");
});
db.on("error", (err) => {
    console.log(err);
});

/**
 * Models
*/
const userModel = require('./models/userModel');
const matchModel = require('./models/matchModel');
const stadiumModel = require('./models/stadiumModel');
const teamModel = require('./models/teamModel');
const ticketModel = require('./models/ticketModel');

/**
 * Passport configuration
*/
passport.use(new LocalStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
/**
 * Session configuration
*/
const session = expressSession({
    secret: "this is a secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60
    }
});
app.use(session);

const corsOptions = {
    origin: 'http://localhost:5173', // replace with your client's origin
    credentials: true,  // This allows the session cookie to be sent back and forth
};

app.use(cors(corsOptions));

/**
 * Middleware
*/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 */

app.post('/register', asyncHandler(async (req, res) => {
    const { password } = req.body;
    const user = new userModel(req.body);
    user.status = "pending";
    try {
        await userModel.register(user, password);
        const userDataObject = { id: user._id, username: user.username, role: user.role };

        req.session.user_id = user._id;
        req.session.user_role = user.role;
        req.session.status = user.status;

        res.status(201).send(userDataObject);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error registering user");
    }
}));

app.get('/teams', asyncHandler(async (req, res) => {
    const teams = await teamModel.find({});
    res.send(teams);
}));

app.post('/login', passport.authenticate("local"), (req, res) => {
    const userDataObject = { username: req.user.username, role: req.user.role };
    /**
     * For each request we will store the user id in the session
     */
    if (req.user.status === "pending") {

        return res.status(401).send("Unauthorized");
    }

    req.session.user_id = req.user._id;
    req.session.user_role = req.user.role;
    req.session.status = req.user.status;
    res.status(200).send({ ...userDataObject, success: true, id: req.user._id });
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send("logged out");
});

app.get('/matches', asyncHandler(async (req, res) => {
    const todayDate = new Date();
    const matches = await matchModel.find({ date: { $gt: todayDate } }).populate("homeTeam").populate("awayTeam").populate("stadium");
    res.send(matches);
}));

app.get('/matches/:id', asyncHandler(async (req, res) => {
    const match = await matchModel.findById(req.params.id).populate("homeTeam").populate("awayTeam").populate("stadium");
    res.send(match);
}));

app.post('/matches', authorizeUser(["manager"]), asyncHandler(async (req, res) => {
    const match = new matchModel(req.body);
    await match.save();
    const todayDate = new Date();
    const matches = await matchModel.find({ date: { $gt: todayDate } }).populate("homeTeam").populate("awayTeam").populate("stadium");
    res.status(201).send(matches);
}));

app.post('/matches/:id', authorizeUser(["manager"]), asyncHandler(async (req, res) => {
    const match = await matchModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).end();
}));

app.post('/stadiums', authorizeUser(["manager"]), asyncHandler(async (req, res) => {
    const stadium = new stadiumModel(req.body);
    await stadium.save();
    res.status(201).end();
}));

app.get('/stadiums', asyncHandler(async (req, res) => {
    const stadiums = await stadiumModel.find({});
    res.send(stadiums);
}));

app.get('/stadiums/:id', asyncHandler(async (req, res) => {
    const stadium = await stadiumModel.findById(req.params.id);
    res.send(stadium);
}));

app.post('/stadiums/:id', authorizeUser(["manager"]), asyncHandler(async (req, res) => {
    const stadium = stadiumModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).end();
}));

app.get('/requests', authorizeUser(["admin"]), asyncHandler(async (req, res) => {
    const users = await userModel.find({ status: "pending" });
    res.send(users);
}));

app.get('/requests/:id', authorizeUser(["admin"]), asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    res.send(user);
}));

app.post('/requests/users/:id', authorizeUser(["admin"]), asyncHandler(async (req, res) => {
    const action = req.body.action;
    const user = await userModel.findById(req.params.id);

    if (action === "accept") {
        user.status = "accepted";
    } else {
        user.status = "rejected";
    }
    await user.save();
    res.status(200).send(`user ${user.username} ${action}ed`);
}));

app.get('/users', authorizeUser(["admin"]), asyncHandler(async (req, res) => {
    const users = await userModel.find({ status: { $in: ["accepted", "pending"] } });
    res.send(users);
}));

// authorizeUser(["admin", "manager", "fan"])
app.get('/users/:id', authorizeUser(["admin", "manager", "fan"]), asyncHandler(async (req, res) => {
    if (req.session.user_role != "admin" && req.session.user_id != req.params.id) {
        return res.status(401).send("Unauthorized");
    }

    const user = await userModel.findById(req.params.id);
    res.send(user);
}));

app.get('/users/:id/tickets', authorizeUser(["fan"]), asyncHandler(async (req, res) => {
    if (req.session.user_id != req.params.id)
        return res.status(401).send("Unauthorized");
    const userTickets = await userModel.findById(req.params.id).populate("tickets");
    await Promise.all(userTickets.tickets.map(async (ticket) => {
        await ticket.populate('match');
        await ticket.populate('match.homeTeam');
        await ticket.populate('match.stadium');
        await ticket.populate('match.awayTeam');
        return ticket;
    }));
    res.send(userTickets.tickets);
}));

app.delete('/users/:id/tickets/:ticketId', authorizeUser(["fan"]), asyncHandler(async (req, res) => {
    if (req.session.user_id != req.params.id)
        return res.status(401).send("Unauthorized");
    const userTickets = await userModel.findById(req.params.id).populate("tickets");
    const ticket = await ticketModel.findById(req.params.ticketId);
    if (!ticket) {
        return res.status(404).send("Ticket not found");
    }
    const ticketIndex = userTickets.tickets.findIndex((ticket) => ticket._id == req.params.ticketId);
    if (ticketIndex == -1) {
        return res.status(404).send("Ticket not found");
    }
    const ticketToRemove = userTickets.tickets[ticketIndex];
    await ticketToRemove.populate('match');
    const threeDaysBeforeMatch = new Date();
    threeDaysBeforeMatch.setDate(ticketToRemove.match.date.getDate() - 3);
    const todayDate = new Date();
    console.log(threeDaysBeforeMatch);
    console.log(todayDate);
    if (threeDaysBeforeMatch <= todayDate) {
        return res.status(400).send("You can cancel your ticket only 3 days before the match");
    }
    await userModel.updateOne(
        { _id: req.params.id },
        { $pull: { tickets: req.params.ticketId } }
    );
    await ticketModel.findOneAndDelete({ _id: req.params.ticketId });
    res.status(200).send("Ticket cancelled successfully");

}));

app.get('/userId', asyncHandler(async (req, res) => {
    if (req.session.user_id) {
        res.status(200).send(req.session.user_id);
    } else {
        res.status(401).send("Unauthorized");
    }
}));

app.get('/userRole', asyncHandler(async (req, res) => {
    if (req.session.user_role) {
        res.status(200).send(req.session.user_role);
    } else {
        res.status(401).send("Unauthorized");
    }
}));
app.post('/users/:id', asyncHandler(async (req, res) => {

    if (req.session.user_id != req.params.id)
        return res.status(401).send("Unauthorized");
    await userModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).end();
}));

app.delete('/users/:id', authorizeUser(["admin"]), asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    await userModel.findOneAndDelete({ _id: req.params.id });
    res.status(200).send(`user ${user.username} deleted`);
}));


app.get('/matches/:id/reservations', asyncHandler(async (req, res) => {
    const locations = await matchModel.findById(req.params.id).select("reservationMap");
    res.send(locations);
}));

/**
 * Expects to receive time in query parameter using ISO 8601 format
 */
app.get('/matches/:id/reservationsAfter', asyncHandler(async (req, res) => {
    const stringDate = req.query.date;
    const locations = await matchModel.findById(req.params.id).select("reservationMap");
    const dateObj = new Date(stringDate);
    const locationsAfterTime = locations.reservationMap.filter((location) => {
        return location.reservationDate > dateObj;
    });
    res.send(locationsAfterTime);
}));

app.post('/matches/:id/reservations', authorizeUser(["fan"]), asyncHandler(async (req, res) => {
    const locations = req.body.locations;
    const matchId = req.params.id;
    const match = await matchModel.findById(matchId);
    const ticketPrice = match.ticketPrice;
    const cardNumber = req.body.cardNumber;
    const cardPin = req.body.cardPin;

    const userId = req.session.user_id;
    const user = await userModel.findById(userId);

    const reservedLocations = match.reservationMap;
    for (let i = 0; i < locations.length; i++) {
        for (let j = 0; j < reservedLocations.length; j++) {
            if (locations[i].row == reservedLocations[j].row && locations[i].column == reservedLocations[j].column) {
                return res.status(400).send("location is already reserved");
            }
        }
    }

    const ticket = new ticketModel({
        match: matchId,
        user: userId,
        locations: locations,
        totalPrice: locations.length * ticketPrice,
        cardNumber: cardNumber,
        cardPin: cardPin
    });

    await ticket.save();

    if (!user.tickets) {
        user.tickets = [];
    }

    user.tickets.push(ticket._id);
    await user.save();

    res.status(201).send("Ticket reserved successfully").end();
}));

app.all("*", (req, res) => {
    res.status(404).send("Page not found");
});

/**
 * Error handling
 */
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something went wrong\n" + err);
});

app.listen(3000, () => {
    console.log("server is running on port ", 3000);
});