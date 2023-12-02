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
// app.use(cors());

/**
 * Routes
 */
app.post('/register', asyncHandler(async (req, res) => {
    const { password } = req.body;
    const user = new userModel(req.body);
    // console.log(req.body);
    user.status = "pending";
    try {
        await userModel.register(user, password);
        console.log(user);
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

app.post('/login', passport.authenticate("local"), (req, res) => {
    const userDataObject = { username: req.user.username, role: req.user.role };
    /**
     * For each request we will store the user id in the session
     */
    req.session.user_id = req.user._id;
    req.session.user_role = req.user.role;
    req.session.status = req.user.status

    console.log(req.session.user_id);
    res.status(200).send({... userDataObject, success:true});
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    console.log(req.session.user_id);
    res.status(200).send("logged out");
});

app.get('/matches', asyncHandler(async (req, res) => {
    const matches = await matchModel.find({}).populate("homeTeam").populate("awayTeam").populate("stadium");
    res.send(matches);
}));

app.get('/matches/:id', asyncHandler(async (req, res) => {
    const match = await matchModel.findById(req.params.id).populate("homeTeam").populate("awayTeam").populate("stadium");
    res.send(match);
}));

app.post('/matches', authorizeUser("manager"), asyncHandler(async (req, res) => {
    const match = new matchModel(req.body);
    await match.save();
    res.status(201).end();
}));

app.post('/matches/:id', authorizeUser("manager"), asyncHandler(async (req, res) => {
    const match = await matchModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).end();
}));

app.post('/stadiums', authorizeUser("manager"), asyncHandler(async (req, res) => {
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

app.post('/stadiums/:id', authorizeUser("manager"), asyncHandler(async (req, res) => {
    const stadium = stadiumModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).end();
}));

app.get('/requests', authorizeUser("admin"), asyncHandler(async (req, res) => {
    const users = await userModel.find({ status: "pending" });
    res.send(users);
}));

app.get('/requests/:id', authorizeUser("admin"), asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    res.send(user);
}));

app.post('requests/users/:id', authorizeUser("admin"), asyncHandler(async (req, res) => {
    const action = req.body.action;
    const user = await userModel.findById(req.params.id);
    if (action === "accept") {
        user.status = "accepted";
    } else {
        user.status = "rejected";
    }
    res.status(200).send(`user ${user.username} ${action}ed`);
}));

app.get('/users', authorizeUser("admin"), asyncHandler(async (req, res) => {
    const users = await userModel.find({});
    res.send(users);
}));

app.get('/users/:id', authorizeUser("admin"), asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    res.send(user);
}));

app.post('/users/:id', asyncHandler(async (req, res) => {
    if (req.session.user_id != req.params.id)
        return res.status(401).send("Unauthorized");
    await userMode.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).end();
}));

app.delete('/users/:id', authorizeUser("admin"), asyncHandler(async (req, res) => {
    const user = await userModel.findById(req.params.id);
    await user.remove();
    res.status(200).send(`user ${user.username} deleted`);
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