const express = require('express');
const helpers = require('../helpers.js');

const getTracks = express.Router();

getTracks.get('/', (req, res) => {
  console.log('in getTracks');
  // console.log(req.query, 'in getTracks router');
  console.log(req.query.id, 'artist ID');
  helpers.getTopTracks(req.query.id, (err, response) => {
    if (err) {
      console.log(err, 'error');
    } if (response) {
      res.send(response.data.tracks);
    }
  });
});

module.exports.getTracksRouter = getTracks;
