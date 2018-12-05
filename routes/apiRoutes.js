var db = require("../models");
var passport = require("passport"),
  // eslint-disable-next-line no-unused-vars
  FacebookStrategy = require("passport-facebook").Strategy;

require("../auth/facebook");

module.exports = function(app) {
  /*
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.json(dbExample);
    });
  });
  */

  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      authType: "rerequest",
      scope: "user_location"
    })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/signin" }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );
};
