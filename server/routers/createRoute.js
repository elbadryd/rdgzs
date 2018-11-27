const express = require('express');
const helpers = require('../helpers');

const createRoute = express.Router();

createRoute.get('/', (req, res) => {
  console.log(req.query, 'in createRoute router');
  const origin = JSON.parse(req.query.originCoords);
  const dest = JSON.parse(req.query.destCoords);
  const start = `${origin.lng},${origin.lat}`;
  const end = `${dest.lng},${dest.lat}`;
  helpers.makeTrip(start, end, 'context', (a, obj) => {
    console.log(obj, 'helper');
    res.send(obj);
  });
});

module.exports.createRoute = createRoute;
