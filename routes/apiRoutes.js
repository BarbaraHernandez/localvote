var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  //============================
  //Policy routes
  //============================
  // Get all of the posts related to a search term
  app.get("/api/search/:term", function(req, res) {
    var term = "%" + req.params.term + "%";
    db.Post.findAll({
      where: {
        $or: [
          {
            title: {
              $like: term
            }
          },
          {
            policyDetail: {
              $like: term
            }
          }
        ]
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get one posts detail by post id
  app.get("/policy/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.render("policydetail", { policy: dbPost });
    });
  });

  //Get most recent post
  app.get("/api/posts/latest", function(req, res) {
    db.Post.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]]
    }).then(function(dbPost) {
      res.render("index", { policy: dbPost });
    });
  });

  // Post submission
  app.post("/api/post", function(req, res) {
    console.log("api route accessed");
    db.Post.create({
      title: req.body.title,
      policyDetail: req.body.policyDetail,
      category: req.body.category //,
      // AccountId: req.body.accountId
    })
      .then(function(dbPost) {
        console.log("data", dbPost);
        res.json(dbPost);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  });

  //============================
  //Vote routes
  //============================

  // Get vote record by policy and user id
  app.get("/api/votes/:policy/:account", function(req, res) {
    db.count
      .findOne({
        where: {
          postId: reqparams.policy,
          accountId: reqparams.account
        }
      })
      .then(function(dbResult) {
        console.log("data", dbResult);
        res.json(dbResult);
      });
  });

  // Post new vote record
  app.post("/api/vote", function(req, res) {
    db.Count.create({
      postId: req.body.postId,
      choice: req.body.choice
    })
      .then(function(dbInput) {
        res.json(dbInput);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  });

  //============================
  //Authentication routes
  //============================
  // Authenticate user
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      authType: "rerequest",
      scope: "user_location"
    }),
    // eslint-disable-next-line no-unused-vars
    (req, res) => {
      console.log("Sign in sucessful!");
    }
  );

  // Verify user is authenticated
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", {
      failureRedirect: "/signin"
    }),
    (req, res) => {
      // req.session.user = req.user;
      console.log(req.user);
      res.redirect("/");
    }
  );

  app.get("/api/account", function(req, res) {
    // Create a new account from the signup form
    console.log(req);
    console.log(req.user);
    console.log(req.user.id);
    db.Account.findOne({
      where: {
        accountId: req.user.id
      }
    })
      .then(data => {
        res.json(data);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  });
};
