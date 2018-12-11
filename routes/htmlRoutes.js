// var db = require("../models");

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
    console.log("USER", JSON.stringify(req.user, null, 2));
    res.render("index");
  });

  app.get("/submission", function(req, res) {
    res.render("submission");
  });

  app.get("/policies", function(req, res) {
    res.render("policies");
  });

  // Render 404 page for any unmatched routes
  /* app.get("*", function(req, res) {
    res.render("404");
  }); */
};
