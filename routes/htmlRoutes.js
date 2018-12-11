var db = require("../models");

module.exports = function(app) {
  // Get most recent policy
  app.get("/", (req, res) => {
    db.Post.findOne({
      order: [["createdAt", "DESC"]]
    }).then(dbPost => {
      res.render("index", { policy: dbPost });
    });
  });

  // Render submission page
  app.get("/submission", function(req, res) {
    res.render("submission");
  });

  // Get most recent policies
  app.get("/policies", (req, res) => {
    db.Post.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]]
    }).then(dbPost => {
      res.render("policies", { policy: dbPost });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
