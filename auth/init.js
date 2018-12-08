var db = require("../models");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    console.log("Serialize User");
    done(null, user.accountId);
  });

  passport.deserializeUser(function(id, done) {
    console.log("Deseralize User");
    db.Account.findOne({
      where: {
        accountId: id
      }
    })
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
