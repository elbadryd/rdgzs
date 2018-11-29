const express = require('express');
const db = require('../models');

const addTrip = express.Router();


addTrip.post('/', (req, res) => {
  let obj = req.body;
  // dbHelper.addStop(obj).then
  // res.send('ok')
});


module.exports.addTripRouter = addTrip;