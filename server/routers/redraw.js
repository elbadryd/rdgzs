const express = require('express');
const helpers = require('../helpers.js');

const redraw = express.Router();

redraw.get('/', (req, res) => {
  const points = req.query['0'];
  console.log(points, 'points at the endpoint');
  helpers.redrawRoute(points, (newRoute) => {
    res.send(newRoute);
  });
});

module.exports.redrawRouter = redraw;
