const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const app = express();
const passport = require("passport");
const session = require("express-session");

const {MongoStore} = require("connect-mongo")
const flash = require("express-flash");
const connectDB = require("./config/database")
const mainRoutes = require("./routes/main");
const letterRoutes = require("./routes/letter");
// Passport config (the login strategy)
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));
//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
// app.use(logger("dev"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_CONNECTIION }), // records are saved in a sessions collections act as record
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

app.use("/", mainRoutes);
app.use("/", letterRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});
