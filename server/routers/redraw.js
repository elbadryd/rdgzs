const express = require('express');
const helpers = require('../helpers.js');

const createRouter = express.Router();


createRouter.get('/redraw', (req, res) => {
  const points = req.query.points;
  helpers.redrawRoute(points, (newRoute) => {
    res.send(newRoute);
  });
});
