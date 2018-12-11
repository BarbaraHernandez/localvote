var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  //============================
  //Functions
  //============================

  function RenderedView(policy, vote, voting, voted, unauthenticated) {
    this.policy = JSON.parse(JSON.stringify(policy));
    this.vote = JSON.parse(JSON.stringify(vote));
    this.voting = voting;
    this.voted = voted;
    this.unauthenticated = unauthenticated;
  }

  //============================
  //Policy routes
  //============================

  // Get all of the posts related to a search term
  app.get("/api/search/:term", (req, res) => {
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

  // Get policy and render partial
  app.get("/policy/:id", (req, res) => {
    var accountId = req.user.accountId;
    var postId = req.params.id;
    db.Post.findOne({
      where: {
        id: postId
      }
    }).then(dbPost => {
      var policy = dbPost;
      if (accountId) {
        db.Count.findOne({
          where: {
            postId: postId,
            accountId: accountId
          }
        }).then(dbCount => {
          console.log(dbCount);
          if (dbCount) {
            // render vote result
            view = new RenderedView(policy, dbCount, false, true, false);
            res.render("policydetail", { policy: view });
          } else {
            // render vote form
            view = new RenderedView(policy, null, true, false, false);
            res.render("policydetail", { policy: view });
          }
        });
      } else {
        // render login message
        view = new RenderedView(policy, null, false, false, true);
        res.render("policydetail", { policy: view });
      }
    });
  });

  // Policy submission
  app.post("/api/post", (req, res) => {
    db.Post.create({
      title: req.body.title,
      policyDetail: req.body.policyDetail,
      category: req.body.category //,
      // AccountId: req.body.accountId
    })
      .then(dbPost => {
        res.json(dbPost);
      })
      .catch(error => {
        console.log("error", error);
      });
  });

  //============================
  //Vote routes
  //============================

  // Post new vote record
  app.post("/api/vote", (req, res) => {
    db.Count.create({
      accountId: req.user.accountId,
      postId: req.body.postId,
      choice: req.body.choice
    })
      .then(dbInput => {
        res.json(dbInput);
      })
      .catch(error => {
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
      res.redirect("/");
    }
  );
};
