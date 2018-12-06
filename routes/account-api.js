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
};
