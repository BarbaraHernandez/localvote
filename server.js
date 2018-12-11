// Keys
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var favicon = require("serve-favicon");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
var db = require("./models");
var authInit = require("./auth/init");
var authFacebookStrategy = require("./auth/facebook");

// Passport
// strategy first
authFacebookStrategy(passport);
// serialize/deserialize second
authInit(passport);

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    partialsPath: "views/partials"
  })
);
app.set("view engine", "handlebars");

// Middleware
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(favicon(__dirname + "/favicon.ico"));

// express session
app.use(
  session({
    secret: "votes",
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

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
