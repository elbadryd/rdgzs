const express = require('express');
const db = require('../models');

const stop = express.Router();

stop.post('/', (req, res) => {
<<<<<<< HEAD
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
=======
  const obj = req.body;
  // query to add stop to table
  // res.send('ok')
>>>>>>> dc96d180524d1a392c9b46275d34b8f1643551d5
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
