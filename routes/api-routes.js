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
          barber_name: req.params.barberId
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
    console.log("this is req.body", req.body);
    db.Reservation.create({
        customer_first_name: req.body.customerName,
        reservation_date: req.body.reservation_date,
        barber_name: req.body.barber,
        reservation_time: req.body.time
      })
      .then(function (dbReservation) {
        console.log(dbReservation)

        // console.log("this isdbReservation:", dbReservation)
        //       res.json(dbPost);
        //     });
        // });
        res.json({
          dbReservation
        });
      })
    // .catch(function (err) {
    //   // handle error;
    //   console.log("appointment already booked")
    // });
  });


  // DELETE route for deleting posts
  app.delete("/api/reservations/:id", function (req, res) {
    db.Reservation.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });

  // PUT route for updating posts
  app.put("/api/reservations", function (req, res) {
    db.Reservation.update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(function (dbPost) {
        res.json(dbPost);
      });
  });
};