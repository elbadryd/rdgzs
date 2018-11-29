const express = require('express');
const db = require('../models');

const addStop = express.Router();

addStop.post('/', (req, res) => {
  let obj = req.body;
  // dbHelper.addStop(obj).then
  // res.send('ok')
});


module.exports.addStopRouter = addStop;
