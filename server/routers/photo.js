const express = require('express');
const db = require('../models');

const photo = express.Router();

photo.post('/', (req, res) => {
  console.log(req.body.params);
  db.sequelize.models.photo.create({
    tripId: req.body.params.tripId,
    geotag: req.body.params.geotag,
    link: req.body.params.url,
    publicId: req.body.params.publicId,
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

photo.get('/', (req, res) => {
  db.sequelize.models.photo.findAll({
    where: { tripId: req.query.tripId },
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports.photoRouter = photo;
