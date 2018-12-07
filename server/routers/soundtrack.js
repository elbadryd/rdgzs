const express = require('express');
const helpers = require('../helpers.js');

const soundtrack = express.Router();

const token = 'BQD9cuWm9pT2Rc2aXG2WzuUpuJTeGa9rue2Uos-A9pchwoYjzlCqhiUYz1GQLimtvxwvobXTpugmSHToZr0';

// accepts a name (string) and returns an artist id (number)
soundtrack.get('/artistId', (req, res) => {
  helpers.artistId(req.query.name, token)
    .then((response) => {
      if (response) {
        console.log(response.data.artists.items[0].id, 'response');
        res.send(response.data.artists.items[0].id);
      }
    }).catch(err => res.send(err));
});

//  ACCEPTS a string of artist ids separated by comma, returns an 80 minute playlist
soundtrack.get('/allTracks', (req, res) => {
  const ids = req.query.ids.split(',');
  const promises = ids.map(id => helpers.getTopTracks(id, token));
  Promise.all(promises)
    .then((allTracks) => {
    // array of objects, each object a top tracklist
      return allTracks.map((list) => {
        // array of top tracks for a single id
        return list.data.tracks.map((track) => {
          // formatting obj for a single track
          return {
            uri: track.uri,
            duration: track.duration_ms,
          };
        });
      });
    })
    .then((tracks) => {
      const playlistHour = [];
      let playLength = 0;
      let trackNum = 0;
      const limit = 10000000;
      while (trackNum < 10 && playLength < limit) {
        // eslint-disable-next-line no-loop-func
        tracks.map((tracklist) => {       
        // if there is a track
          if (tracklist[trackNum]) {
            // if playlist is less than an hour
            if (playLength < limit) {
              playlistHour.push(tracklist[trackNum]);
            }
            playLength += tracklist[trackNum].duration;
          }
        });
        trackNum += 1;
      }
      res.send({ duration: playLength, tracks: playlistHour });
    })
    .catch(err => res.send(err));
});

module.exports.soundtrackRouter = soundtrack;
