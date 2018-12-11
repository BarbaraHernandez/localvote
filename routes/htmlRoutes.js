var db = require("../models");

module.exports = function(app) {
  //Get most recent post
  app.get("/", function(req, res) {
    db.Post.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]]
    }).then(function(dbPost) {
      res.render("index", { policy: dbPost });
    });
  });

  app.get("/submission", function(req, res) {
    res.render("submission");
  });

  app.get("/policies", function(req, res) {
    db.Post.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]]
    }).then(function(dbPost) {
      console.log(JSON.stringify(dbPost));
      res.render("policies", { policy: dbPost });
    });
  });

  // Render 404 page for any unmatched routes
  /* app.get("*", function(req, res) {
    res.render("404");
  }); */
};
