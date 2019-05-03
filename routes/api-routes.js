// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var moment = require("moment")

// Requiring our Reservation model
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the posts (i.e. getting all the data for all reservations of all barbers)
  app.get("/api/reservations/", function (req, res) {
    var cool = new Date();
    var Sequelize = require("sequelize")
    const Op = Sequelize.Op



    // console.log(cool)
    var nowDate = moment(cool).format("YYYY/MM/DD");
    var timeNow = moment(cool).format("LT");



    console.log(nowDate + " " + timeNow)
    var momentDateTime = (nowDate + " " + timeNow)
    db.Reservation.findAll({
        order: [
          ["reservation_date"],
          ["reservation_time"]
        ],

        where: {
          reservation_date: {
            [Op.gte]: nowDate
          }

        }

      })
      .then(function (dbReservation) {
        res.json(dbReservation);
      });
  });


  
  // ----------------------------------------
  // GET route for returning posts of a specific category (i.e. getting all the data for all reservations of a specific barber)
  app.get("/api/reservations/barber/:barberId", function (req, res) {
    var cool = new Date();
    var Sequelize = require("sequelize")
    const Op = Sequelize.Op



    // console.log(cool)
    var nowDate = moment(cool).format("YYYY/MM/DD");
    var timeNow = moment(cool).format("LT");
    db.Reservation.findAll({
        order: [
          ["reservation_date"],
          ["reservation_time"]
        ],

        where: {
          barber_name: req.params.barberId,
          reservation_date: {
            [Op.gte]: nowDate
          }
        }
      })
      .then(function (dbReservation) {
        res.json(dbReservation);
      });
  });



  // ----------------------------------------
  // GET route for retrieving a single post
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



  // ----------------------------------------
  // POST route for saving a new post
  app.post("/api/reservations", function (req, res) {
    console.log("this is req.body", req.body);
    db.Reservation.create({
        customer_name: req.body.customer_name,
        reservation_date: req.body.reservation_date,
        barber_name: req.body.barber_name,
        reservation_time: req.body.reservation_time,
        customer_phone: req.body.customer_phone,
        customer_email: req.body.customer_email
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



  // ----------------------------------------
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



  // ----------------------------------------
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