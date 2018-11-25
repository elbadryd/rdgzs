const express = require('express');
const helpers = require('../helpers');

const createRouter = express.Router();

createRouter.get('/createRoute', (req, res) => {
  console.log(req.query);
  const origin = JSON.parse(req.query.originCoords);
  const dest = JSON.parse(req.query.destCoords);
  const start = `${origin.lng},${origin.lat}`;
  const end = `${dest.lng},${dest.lat}`;
  console.log(end, start);
  helpers.makeTrip(start, end, 'context', (a, obj) => {
    res.send(obj);
  });
});
