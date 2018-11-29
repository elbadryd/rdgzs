const express = require('express');
const db = require('../models');

const trip = express.Router();

trip.post('/', (req, res) => {
  let obj = req.body;
  // db query adding trip to trip table
  // res.send(tripID)
});

trip.get('/', (req, res) => {
  // should be fired when profile loads
  // db query return all trips by userID
});

trip.delete('/', (req, res) => {
  // delete trip from table
});


module.exports.tripRouter = trip;