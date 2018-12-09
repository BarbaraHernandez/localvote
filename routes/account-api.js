var db = require("../models");

module.exports = function(app) {
  app.post("/api/accounts", function(req, res) {
    // Create a new account from the signup form
    db.Account.create({
      firstName: req.body.account_firstName,
      lastName: req.body.account_lastName
    })
      .then(function(dbAccount) {
        res.json(dbAccount);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  });
  app.get("/api/account", function(req, res) {
    // Create a new account from the signup form
    console.log(req);
    console.log(req.user);
    db.Account.findOne({
      where: {
        accountId: req.user.id
      }
    })
      .then(dbAccount => {
        res.json(dbAccount);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  });
};
