// Keys
require("dotenv").config();

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy;
// var session = require("express-session");
var db = require("./models");

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Passport
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
require("./public/js/auth.js")(app);

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
require("./routes/auth-routes")(app);
require("./routes/html-routes")(app);
require("./routes/api-routes")(app);

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
