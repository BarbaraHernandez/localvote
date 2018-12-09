var db = require("../models");
var passport = require("passport");

module.exports = function(app) {
  // Routes
  // =============================================================
  // GET route for getting all of the posts
  app.get("/posts", function(req, res) {
    db.Post.findAll().then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get all posts of a certain category
  app.get("/api/posts/:category", function(req, res) {
    db.Post.findAll({
      where: { category: req.params.category }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Get one posts detail by post id
  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({ where: { postID: reqparams.id } }).then(function(dbPost) {
      console.log("data", dbPost);
      res.render("policydetail", { posts: data });
    });
  });

  // Create a new post from the submission
  app.post("/api/post", function(req, res) {
    console.log("api route accessed");
    db.Post.create({
      title: req.body.title,
      policyDetail: req.body.policyDetail,
      category: req.body.category,
      AccountId: req.body.accountId
    })
      .then(function(dbPost) {
        console.log("data", dbPost);
        res.json(dbPost);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  });

  //=====================================
  //vote routes
  //=====================================
  // search for all votes
  app.get("/votes", function(req, res) {
    db.Count.findAll().then(function(dbResult) {
      res.json(dbResult);
    });
  });

  // GET(find) one vote record by policy and user id
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

  // POST route for saving a new vote record
  app.post("/api/votes", function(req, res) {
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

  //Authentication
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
