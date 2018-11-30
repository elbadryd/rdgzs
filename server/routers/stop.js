const express = require('express');
const db = require('../models');

const stop = express.Router();

stop.post('/', (req, res) => {
  console.log(req.body, 'STOP');
  const longlat = `${req.body.stop.lng},${req.body.stop.lat}`;
  db.sequelize.models.stop.create({
    long_lat: longlat,
    name: req.body.stop.name,
    tripId: req.body.stop.tripId,
  })
    .then((dbres) => {
      res.send(dbres);
    })
    .catch((err) => {
      res.send(err);
    });
});

stop.get('/', (req, res) => {
  db.sequelize.models.stops.findAll({
    where: { tripId: req.body.tripId },
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

stop.delete('/', (req, res) => {
  // delete stop from table;
});


module.exports.stopRouter = stop;
