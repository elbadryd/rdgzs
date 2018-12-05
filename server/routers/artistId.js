const express = require('express');
const helpers = require('../helpers.js');

const artistId = express.Router();

const token = 'BQDocJtwZKEf2TJRheAgNEx8a4ZJx0DV7gadjcBdGB66UoMTYp3YXszC45j-WhFa0XKoIEcDbtwtguiS_5o'


artistId.get('/', (req, res) => {
  console.log('in getTracks');
  // console.log(req.query.name, 'in getTracks router');
  helpers.artistId(req.query.name, token, (err, response) => {
    if (response) {
      console.log(response.data.artists.items[0].id, 'response');
      res.send(response.data.artists.items[0].id);
    }
  });
});


module.exports.artistIdRouter = artistId;

// 60 min = 3600000 ms
// accepts an array of spotify ids, returns a playlist that is approx 80 min long
// edge cases: not enough tracks to make long enough playlist
// const localMusic = (spotifyIDs) => {
//   // array to collect tracks
//     let playlist = [];
//     // keep track of time
//     const duration = [0];
//     // make each spotify ID a promise that returns top tracks
//     const promises = spotifyIDs.map((id) => {
//       return axios.get('/getTracks', {
//         params: id,
//       });
//     });
//     // resolve top tracks call
//     Promise.all(promises).then((tracks) => {
//       // slice off the first most popular track if it exists and push into playlist
//       if (tracks.length) {
//       // if duration is less than an hour (translate 60min to seconds or whatever)
//         if (duration[0] < 80) {
//           playlist = playlist.concat(tracks.slice(0, 1));
//         }
//         duration[0] += tracks.duration;
//       }
//     }).then(() => {
//       return playlist;
//     });
//   };
//   // accepts an array of artist names, returns spotify artist IDs
//   // edge cases: unpopular artist gets wrong spotify id (need way to measure result confidence or artist popularity)
//   const getIDs = (names) => {
//     const promises = names.map((name) => {
//       return axios.get('/artistId', {
//         params: name,
//       });
//     });
//     return Promise.all(promises)
//     // returns array of spotifyIDs
//   };
//   // accepts a linestring, returns an array of points spaced by 100km
//   const getPoints = (lineString) => {
//     // returns array with each element lng/lat coords
//   };
//   // accepts an array of points, returns an array of city names
//   // edge cases: no nearby city
//   const getCityNames = (points) => {
//     // returns array of city names
//   };
//   // accepts a city (and genre?) and returns an array of artist names
//   // edge cases: no matching artists or not enough of them
//   // add a get songs function?
//   const getArtists = (city, genre) => {
//     // returns artist names by city
//   };
  
  
  // getQueryPoints('lineString')
  //   .then(getCities)
  //   .then((cityNames) => {
  //   // array of city names
  //     const promises = cityNames.map(city => getArtists(city));
  //     return Promise.all(promises);
  //   })
  //   .then((namesOfArtists) => {
  //     // array of promises?
  //     const allIds = namesOfArtists.map((names) => getIDs(names));
  //     return Promise.all(allIds);
  //   })
  //   .then((arraysOfIDs) => {
  //     const promises = arraysOfIDs.map(spotifyIDs => localMusic(spotifyIDs));
  //     return Promise.all(promises);
  //   })
  //   .then((playlists) => {
  //     let fullPlaylist = [];
  //     playlists.forEach((list) => {
  //       fullPlaylist = fullPlaylist.concat(list);
  //     });
  //     return fullPlaylist;
  //   })
  //   .then((fullPlaylist) => {
  //     // writePlaylist
  //   });
  