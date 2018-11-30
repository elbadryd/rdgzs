const express = require('express');
const db = require('../models');

const stop = express.Router();

stop.post('/', (req, res) => {
  const obj = req.body;
  // query to add stop to table
  // res.send('ok')
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
