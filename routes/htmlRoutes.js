var db = require("../models");

module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.posts.findAll({}).then(function(examplePost) {
  //     res.render("main", {
  //       navbar: "nav",
  //       msg: "Welcome!",
  //       examples: examplePost
  //     });
  //   });
  // });

  app.get("/", function(req, res) {
    res.render("index");
  });

  // Load example page and pass in an example by id
  app.get("/policy/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  app.get("/policies", function(req, res) {
    res.render("policies");
  });

  app.get("/submission", function(req, res) {
    res.render("submission");
  });

  app.get("/policies", function(req, res) {
    res.render("policies");
  });

  app.get("/signin", function(req, res) {
    res.render("signin");
  });

  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  app.get("/policydetail", function(req, res) {
    res.render("policydetail");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
