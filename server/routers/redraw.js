const express = require('express');
const helpers = require('../helpers.js');

const redraw = express.Router();

redraw.get('/redraw', (req, res) => {
  const points = req.query.points;
  helpers.redrawRoute(points, (newRoute) => {
    res.send(newRoute);
  });
});

module.exports.redraw = redraw;
