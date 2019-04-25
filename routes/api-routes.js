// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Reservation model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the posts
  app.get("/api/reservations/", function (req, res) {
    db.Reservation.findAll({})
      .then(function (dbReservation) {
        res.json(dbReservation);
      });
  });

  // Get route for returning posts of a specific category
  app.get("/api/reservations/barber/:barberId", function (req, res) {
    db.Reservation.findAll({
        where: {
          barber_id: req.params.barberId
        }
      })
      .then(function (dbReservation) {
        res.json(dbReservation);
      });
  });

  // Get route for retrieving a single post
  app.get("/api/reservations/:id", function (req, res) {
    db.Reservation.findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function (dbReservation) {
        res.json(dbReservation);
      });
  });

  // POST route for saving a new post
  app.post("/api/reservations", function (req, res) {
    console.log(req.body);
    db.Reservation.create({
        customerName: req.body.title,
        appointment_date: req.body.body,
        barber: req.body.category,
        time: req.body.body + "/ " + req.body.time
      })
      .then(function (dbReservation) {
        //       res.json(dbPost);
        //     });
        // });
        res.json({
          dbReservation
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