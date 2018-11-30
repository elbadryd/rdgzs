const express = require('express');
const db = require('../models');

const stop = express.Router();

stop.post('/', (req, res) => {
  console.log(req.body, 'STOP');
  const longlat = `${req.body.stop.lng}, ${req.body.stop.lat}`;
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
  // (fired on trip click)
  // return all stops associated with a tripID
});

stop.delete('/', (req, res) => {
  // delete stop from table;
});


module.exports.stopRouter = stop;
