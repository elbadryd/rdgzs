const express = require('express');
const helpers = require('../helpers');

const createRoute = express.Router();

createRoute.get('/', (req, res) => {
  // console.log(req.query, 'in createRoute router');
  const qstring = req.query.qstring;
  helpers.makeTrip(qstring, 'context', (err, obj) => {
    res.send(obj);
  });
});

module.exports.createRoute = createRoute;
