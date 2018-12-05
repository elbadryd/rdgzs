const express = require('express');
const helpers = require('../helpers.js');

const getTracks = express.Router();

const token = 'BQDWseu0OXmHU1wTrdAeg6IVmGWW5iZ4buTDRpQdmraX-ZJrJiNivQFDFM8EJwjoTdZCzvjmixsYT-I-lWQ';

getTracks.get('/', (req, res) => {
  console.log('in getTracks');
  // console.log(req.query, 'in getTracks router');
  console.log(req.query.id, 'artist ID');
  helpers.getTopTracks(req.query.id, token, (err, response) => {
    if (err) {
      console.log(err, 'error');
    } if (response) {
      res.send(response.data.tracks.map((track) => {
        return {
          uri: track.uri,
          duration: track.duration_ms
        };
      }));
    }
  });
});

module.exports.getTracksRouter = getTracks;
