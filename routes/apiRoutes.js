module.exports = function(app, passport) {
  console.log("Seting up routes...")
  app.get(
    "/auth/facebook",
   // passport.authenticate("facebook", // {
      // authType: "rerequest",
      // scope: "user_location"
    // }
    // ),
    // eslint-disable-next-line no-unused-vars
    (req, res) => {
      console.log("Sign in sucessful!");
    }
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "/signin"
    }),
    (req, res) => {
      // req.session.user = req.user;
      res.redirect("/");
    }
  );
};
