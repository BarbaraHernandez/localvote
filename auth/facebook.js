var db = require("../models");
var FacebookStrategy = require("passport-facebook").Strategy;

module.exports = function(passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        enableProof: true,
        profileFields: ["id", "first_name", "last_name", "location"]
      },
      function(accessToken, refreshToken, profile, done) {
        console.log("Facebook Strategy");
        db.Account.findAll({
          where: {
            accountId: profile.id
          }
        })
          // eslint-disable-next-line no-unused-vars
          .then((dbAccount, err) => {
            console.log(dbAccount);
            if (dbAccount) {
              console.log(dbAccount);
              done(null, dbAccount);
            } else {
              db.Account.create({
                accountId: profile.id,
                firstName: displayName
              }).then(function(dbAccount) {
                console.log(dbAccount);
                done(null, dbAccount);
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    )
  );
};
