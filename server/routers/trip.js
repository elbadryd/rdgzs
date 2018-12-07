const express = require('express');
const db = require('../models');
const spotify = require('../../lib/spotifyWebApi');

const trip = express.Router();


trip.post('/', (req, res) => {
  console.log(req.body, 'trip post');
  const start = `${req.body.originCoords.lng},${req.body.originCoords.lat}`;
  const end = `${req.body.destinationCoords.lng},${req.body.destinationCoords.lat}`;
  const tripName = req.body.tripName;
  const originName = req.body.originName;
  const destinationName = req.body.destinationName;
  console.log(req.body, 'REQ BODY');

  db.sequelize.models.trip.create({
    origin: start,
    destination: end,
    trip_name: tripName,
    userId: req.user.id,
    origin_name: originName,
    destination_name: destinationName,
  })
    .then((dbres) => {
      res.send(dbres);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

trip.get('/', (req, res) => {
  db.sequelize.models.trip.findAll({
    where: { userId: req.user.id },
  })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
      console.log(err);
    });
});

trip.delete('/', (req, res) => {
  console.log(req.query[0]);
  db.sequelize.models.stop.destroy({
    where: { tripId: req.query[0] },
  });
  db.sequelize.models.trip.destroy({
    where: { id: req.query[0] },
  })
    .then((response) => {
      res.send(202);
    })
    .catch((err) => {
      console.log(err);
      res.send(500);
    });
});



trip.get('/pl', (req, res) => {
  // accessToken needed to use spotifyWebApi
  spotify.spotifyApi.setAccessToken(req.user.accessToken);
  console.log(req.user.accessToken, req.query.name, req.query.tracks);
  
  // create playlist
    // name param needs to be dynamic and take the current trip name
  spotify.spotifyApi.createPlaylist(req.user.spotifyId, req.query.name, { public: true })
    .then((data) => {
      console.log('Created playlist!');
      console.log('in trip js', data.body.id, req.query.tracks)
      return spotify.spotifyApi.addTracksToPlaylist(data.body.id, req.query.tracks.slice(1));
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log('Something went wrong!', err);
      res.send(err);
    });
});

module.exports.tripRouter = trip;
