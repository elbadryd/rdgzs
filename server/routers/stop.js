const express = require('express');
const db = require('../models');

const stop = express.Router();

stop.post('/', (req, res) => {
  let obj = req.body;
  // query to add stop to table
  // res.send('ok')
});

stop.get('/', (req, res) => {
  // (fired on trip click)
  // return all stops associated with a tripID
});

stop.delete('/', (req, res) => {
  // delete stop from table;
});


module.exports.stopRouter = stop;
