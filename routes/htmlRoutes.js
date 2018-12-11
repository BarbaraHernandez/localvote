var db = require("../models");

module.exports = function(app) {
  // Construct object
  function RenderedView(policy) {
    this.policy = JSON.parse(JSON.stringify(policy));
  }

  // Get most recent policy
  app.get("/", function(req, res) {
    db.Post.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]]
    }).then(function(dbPost) {
      var policy = new RenderedView(dbPost);
      console.log(policy);
      res.render("index", { policy: policy });
    });
  });

  // Render submission page
  app.get("/submission", function(req, res) {
    res.render("submission");
  });

  // Get most recent policies
  app.get("/policies", function(req, res) {
    db.Post.findAll({
      limit: 10,
      order: [["createdAt", "DESC"]]
    }).then(function(dbPost) {
      res.render("policies", { policy: dbPost });
    });
  });

  // Render 404 page for any unmatched routes
  /* app.get("*", function(req, res) {
    res.render("404");
  }); */
};
