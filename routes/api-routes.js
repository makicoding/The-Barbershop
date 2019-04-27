// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the posts
  app.get("/api/posts/", function (req, res) {
    db.Post.findAll({})
      .then(function (dbPost) {

        res.json(dbPost);
      });
  });

  // Get route for returning posts of a specific category
  app.get("/api/posts/category/:category", function (req, res) {
    db.Post.findAll({
        where: {
          category: req.params.category
        }
      })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/posts/:id", function (req, res) {
    db.Post.findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // POST route for saving a new post
  app.post("/api/posts", function (req, res) {
    console.log(req.body);
    db.Post.create({
        customerName: req.body.title,
        date: req.body.body,
        barber: req.body.category,
        time: req.body.body + "/ " + req.body.time
      })
      .then(function (dbPost) {
        //       res.json(dbPost);
        //     });
        // });
        res.json({
          dbPost
        });
      }).catch(function (err) {
        // handle error;
        console.log("appointment already booked")
      });
  });


  // DELETE route for deleting posts
  app.delete("/api/posts/:id", function (req, res) {
    db.Post.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating posts
  app.put("/api/posts", function (req, res) {
    db.Post.update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });
};