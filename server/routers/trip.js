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

// Test uris
  // const uris = ["spotify:track:1jRzdY7oUBOhrylNtiMtBD",
  //  "spotify:track:0dbTQYW3Ad1FTzIA9t90E8",
  //  "spotify:track:5htB2gxndGHrLb09x1Q3Vp",
  //  "spotify:track:5QwU7QaUPx0jUNwnd6h9Nb",
  //  "spotify:track:4nefFqiukTvjgt8hkv73PP",
  //  "spotify:track:0e42i89bY2NmPuVDtey8pg",
  //  "spotify:track:3wScL5W8H40zzCKN0atfBk",
  //  "spotify:track:66mbI5v6PcCH3VKGJqdFfr",
  //  "spotify:track:0yWJGIMwBgrGdpQ4sG6zaj",
  //  "spotify:track:7hCKt8Z6GLk4yWVrvnzytP",
  //  "spotify:track:6uWliNGZEZKGMPwSwccdjG",
  //  "spotify:track:5BQrp63SHCVf4bzCzJePne",
  //  "spotify:track:0u4Eadez2FojayRgAQfMhT",
  //  "spotify:track:3OVqNSAxYNHgmhFLzOZpK2",
  //  "spotify:track:2OxZdTC2HdbAz9Gu956wzo",
  //  "spotify:track:0Sizq91V0brNa9RBpMfeOB"];

trip.get('/pl', (req, res) => {
  // accessToken needed to use spotifyWebApi
  spotify.spotifyApi.setAccessToken(req.user.accessToken);
  // create playlist
    // name param needs to be dynamic and take the current trip name
  spotify.spotifyApi.createPlaylist(req.user.spotifyId, 'i hope this works', { public: true })
    .then((data) => {
      console.log('Created playlist!');
      return spotify.spotifyApi.addTracksToPlaylist(data.body.id, uris);
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
