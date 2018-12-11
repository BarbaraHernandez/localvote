const db = require("../models");
const FacebookStrategy = require("passport-facebook").Strategy;

module.exports = passport => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        enableProof: true,
        profileFields: ["id", "first_name", "last_name", "location"]
      },
      (accessToken, refreshToken, profile, done) => {
        db.Account.findOrCreate({
          where: {
            accountId: profile.id
          },
          defaults: {
            accountId: profile.id,
            firstName: "Test"
          }
        })
          .spread((dbAccount, created) => {
            var user = dbAccount.get({
              plain: true
            });
            done(null, user);
          })
          .catch(err => {
            console.log(err);
          });
      }
    )
  );
};
