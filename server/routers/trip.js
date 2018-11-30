const express = require('express');
const db = require('../models');

const trip = express.Router();

trip.post('/', (req, res) => {
  const start = `${req.body.originCoords.lng},${req.body.originCoords.lat}`;
  const end = `${req.body.destinationCoords.lng},${req.body.destinationCoords.lat}`;
  const tripName = req.body.tripName;
  const originName = req.body.originName;
  const destinationName = req.body.destinationName;
  console.log(req.body, 'REQ BODY');

  db.sequelize.models.trip.create({
    origin: start,
    destination: end,
    trip_name: tripName,
    userId: req.body.userID,
    origin_name: originName,
    destination_name: destinationName,
  })
    .then((dbres) => {
      console.log(dbres, 'RESPONSE');
      res.send(dbres);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

trip.get('/', (req, res) => {
  console.log(req, 'trip req');
  db.sequelize.models.trip.findAll({
    where: { userId: req.user.id },
  })
    .then((response) => {
      res.send(response);
      console.log(response);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
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
