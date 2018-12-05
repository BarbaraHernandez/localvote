// Keys
require("dotenv").config();

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
// var session = require("express-session");
var passport = require("passport");
var db = require("./models");
var authInit = require("./auth/init");
var authFacebookStrategy = require("./auth/facebook");

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Passport
authInit(passport);
authFacebookStrategy(passport);
app.use(passport.initialize());
/*
app.use(
  session({
    secret: "votes",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.session());
*/

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    partialsPath: "views/partials"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/htmlRoutes.js")(app);
require("./routes/post-api.js")(app);
require("./routes/user-api.js")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
