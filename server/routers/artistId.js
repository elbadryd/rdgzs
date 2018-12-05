const express = require('express');
const helpers = require('../helpers.js');

const artistId = express.Router();

artistId.get('/', (req, res) => {
  console.log('in getTracks');
  // console.log(req.query.name, 'in getTracks router');
  console.log(req.query.name, 'artist ID');
  helpers.artistId(req.query.name, (err, response) => {
    if (response) {
      console.log(response.data.artists.items[0].id, 'response');
      res.send(response.data.artists.items[0].id);
    }
  });
});


module.exports.artistIdRouter = artistId;
