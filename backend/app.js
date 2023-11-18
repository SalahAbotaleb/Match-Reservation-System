const express = require("express");
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
mongoose.connect('mongodb://127.0.0.1:27017/TicketReservation');
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
const adminModel = require('./models/adminModel');

/**
 * Summary to avoid confusion:
 * 1. authenticate: is to verify user credentials (email and password)
 * 2. authorize: is to verify user role (admin or user)
 * 3. cookie: is piece of information stored in client browser
 * 4. session: is introduced to store user data in the server as a cookie can have maximum limited size
 * 5. session is used to store user data in the server and cookie is used to store session id in the client browser
 * 6. session id is used to retrieve session data from the server
 * 7. session id is stored in the cookie
 * 8. we use passport to do authentication
 * 9. we use passport-local as a strategy to do authentication with username and password
 * 10. we use passport-local-mongoose as they have implemented the logic of passport-local strategy
 * 11. serialize User: is to store user data in the session
 * 12. deserialize User: is to retrieve user data from the session
 * 13. passport-local-mongoose implements serialize and deserialize User
 * 14. all previous was related to authentication
 * 15. now we will talk about session
 * 16. express-session is used to store session data in the server
 * 17. for any session we can add variables that are specific for the user example req.session.name = "ahmed"
 * 18. when passport authenticates a user it uses username and password send to do that
 * 19. passport will store the user data in the session but only for each route it is used to authenticate for
 * 20. the idea behind is to store the user in the session, to avoid using passport authentication on each route
 */
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
    user.pending = true;
    await userModel.register(user, password);
    const userDataObject = { id: user._id, username: user.username, role: user.role };

    req.session.user_id = req.user._id;
    req.session.user_role = req.user.role;

    res.status(201).send(userDataObject);
}));

app.post('/login', passport.authenticate("local"), (req, res) => {
    const userDataObject = { username: req.user.username, role: req.user.role };
    /**
     * For each request we will store the user id in the session
     */
    req.session.user_id = req.user._id;
    req.session.user_role = req.user.role;

    console.log(req.session.user_id);
    res.status(200).send(userDataObject);
});

app.get('/logout', (req, res) => {
    console.log(req.session.user_id);
    res.status(200).send("logged out");
});

/**
 * Logic is not correct just for testing
 */
app.get('/matches', authorizeUser("fan"), asyncHandler(async (req, res) => {
    const matches = await matchModel.find({});
    res.send(matches);
}));
app.all("*", (req, res) => {
    res.status(404).send("Page not found");
});

/**
 * Error handling
 */
app.use((err, req, res, next) => {
    res.status(500).send("Something went wrong\n" + err);
});

app.listen(3000, () => {
    console.log("server is running");
});