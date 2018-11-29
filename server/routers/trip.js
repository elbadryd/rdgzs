const express = require('express');
const db = require('../models');

const trip = express.Router();

trip.post('/', (req, res) => {
  // db query adding trip to trip table
  // res.send(tripID)
});

trip.get('/', (req, res) => {
  console.log(req.body);
  db.sequelize.models.trips.findAll({
    where: { userId: req.body.userId },
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

trip.delete('/', (req, res) => {
  db.sequelize.models.trips.destroy({
    where: { tripId: req.body.tripId },
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});


module.exports.tripRouter = trip;
