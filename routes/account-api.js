var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Account.findAll({
      include: [db.Post]
    }).then(function(dbAccount) {
      res.json(dbAccount);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.Account.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Post]
    }).then(function(dbAccount) {
      res.json(dbAccount);
    });
  });

  app.post("/api/account", function(req, res) {
    db.Account.create(req.body).then(function(dbAccount) {
      res.json(dbAccount);
    });
  });

  app.delete("/api/account/:id", function(req, res) {
    db.Account.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbAccount) {
      res.json(dbAccount);
    });
  });
};
