var db = require("../models/account");

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    console.log("serializeUser");
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log("deseralizeUser");
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
