var db = require("../models");
var passport = require("passport"),
  // eslint-disable-next-line no-unused-vars
  FacebookStrategy = require("passport-facebook").Strategy;

require("../auth/facebook");

module.exports = function(app) {
  // Routes
  // =============================================================
  // GET route for getting all of the posts
  app.get("/post", function(req, res) {
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

  // Get all posts created by certain account using the account id
  app.get("/api/accounts/:id", function(req, res) {
    db.post
      .findAll({ where: { accountID: reqparams.id } })
      .then(function(dbPost) {
        console.log("data", dbPost);
        res.render("policies", { posts: data });
      });
  });

  // Get one posts detail by post id
  app.get("/api/posts/:id", function(req, res) {
    db.post.findOne({ where: { postID: reqparams.id } }).then(function(dbPost) {
      console.log("data", dbPost);
      res.render("policydetail", { posts: data });
    });
  });

  // POST route for saving a new post
  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // Create a new post from the submission
  app.post("/api/post", function(req, res) {
    db.Post.create({
      title: req.body.post,
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

  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({ where: { id: req.params.id } }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  //vote routes
  // search for all votes
  app.get("/votes", function(req, res) {
    db.Count.findAll().then(function(dbResult) {
      res.json(dbResult);
    });
  });

  // GET(find) one vote record by policy and user id
  app.get("/api/votes/:policy/:account", function(req, res) {
    db.post
      .findOne({
        where: {
          postID: reqparams.policy,
          accountID: reqparams.account
        }
      })
      .then(function(dbResult) {
        console.log("data", dbResult);
        res.json(dbResult);
      });
  });

  // POST route for saving a new post
  app.post("/api/votes", function(req, res) {
    db.Vote.create(req.body).then(function(dbInput) {
      res.json(dbInput);
    });
  });

  //Authentication
  app.get(
    "/auth/facebook",
    passport.authenticate("facebook", {
      authType: "rerequest",
      scope: "user_location"
    })
  );

  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/signin" }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );
};
