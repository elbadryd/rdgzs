const express = require('express');
const db = require('../models');

const photo = express.Router();

photo.post('/', (req, res) => {
  console.log(req.body.params);
  db.sequelize.models.photo.create({
    tripId: 135,
    geotag: req.body.params.geotag,
    link: req.body.params.url,
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

photo.get('/', (req, res) => {
  res.send('got photos');
});

module.exports.photoRouter = photo;
