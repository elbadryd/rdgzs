/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
const axios = require('axios');
const express = require('express');
const helpers = require('../helpers.js');

const test = express.Router();
const token = 'BQDY6O5qsmVk3F6tEmn7izZF1wJGY6W0o2w0GX1G6WT1xbtZYvjOEXSMzKHjPOrMVUTuPPn7lhpcAt2EHl4';

test.get('/', (req, res) => {
  axios.get(encodeURI(`https://query.wikidata.org/sparql?query=SELECT ?bandLabel WHERE {
      SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      ?band (p:P31/ps:P31/wdt:P279*) wd:Q215380.
      ?band wdt:P740 wd:Q34404.
      ?band wikibase:statements ?outcoming.
    }
    ORDER BY DESC(?outcoming)
    LIMIT 20&format=json`))
    .then((bandsRes) => {
      const bands = bandsRes.data.results.bindings.map(band => band.bandLabel.value);
      res.send(bands);
    }).catch(err => res.send(err));
});
// axios.get(encodeURI(`https://query.wikidata.org/sparql?query=SELECT ?bandLabel WHERE {
//   SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
//   ?band wdt:P19 wd:Q34404.
//   ?band wikibase:statements ?outcoming.
//   ?band wdt:P31 wd:Q5.
//   ?band wdt:P136 wd:Q8341.
// }
// ORDER BY DESC(?outcoming)
// LIMIT 20&format=json`))
//   .then((response) => {
//     const jazz = response.data.results.bindings.map(person => person.bandLabel.value);
//     console.log(jazz);

//     axios.get(encodeURI(`https://query.wikidata.org/sparql?query=SELECT ?bandLabel WHERE {
//       SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
//       ?band (p:P31/ps:P31/wdt:P279*) wd:Q215380.
//       ?band wdt:P740 wd:Q34404.
//       ?band wikibase:statements ?outcoming.
//     }
//     ORDER BY DESC(?outcoming)
//     LIMIT 20&format=json`))
//   .then((bandsRes) => {
//         const bands = bandsRes.data.results.bindings.map(band => band.bandLabel.value);
//         const all = [];
//         for (let i = 0; i < 20; i++) {
//           if (bands[i]) {
//             all.push(bands[i]);
//           }
//           if (jazz[i]) {
//             jazz.push(jazz[i]);
//           }
//         }
//         res.send(all);
//       }).catch(err => console.log(err));
//   // res.send(response.data.results);
//   }).catch(err => console.log(err));


// ACCEPTS A GET REQUEST FOR A CITY AND RETURNS WIKI Q-ID
//   const city = req.query.city;
//   axios.get(encodeURI(`https://query.wikidata.org/sparql?query=SELECT DISTINCT ?item WHERE { ?item (wdt:P31/wdt:P279*) wd:Q515. ?item ?label "${city}"@en.}&format=JSON`))
//     .then((response) => {
//       console.log(response.data.results.bindings[0].item.value.slice(31));
//       res.send(response.data.results.bindings[0].item.value.slice(31));
//     })
//     .catch(err => console.log(err));


//  ACCEPTS AN ARRAY CALLED ids (array of arrays of spotify ids) returns a playlist
//   // array of promises, getTopTracks
//   const promises = ids.map(id => helpers.getTopTracks(id, token));
//   Promise.all(promises)
//     .then((allTracks) => {
//       // array of objects, each object a top tracklist
//       return allTracks.map((list) => {
//         // array of top tracks for a single id
//         return list.data.tracks.map((track) => {
//           // formatting obj for a single track
//           return {
//             uri: track.uri,
//             // duration: track.duration_ms,
//           };
//         });
//       });
//     })
//     .then((tracks) => {
//       const playlistHour = [];
//       let playLength = 0;
//       let trackNum = 0;
//       while (trackNum < 10 && playLength < 3600000) {
//         tracks.map((tracklist) => {
//         // if there is a track
//           if (tracklist[trackNum]) {
//           // if playlist is less than an hour
//             if (playLength < 3600000) {
//               playlistHour.push(tracklist[trackNum]);
//             }
//             playLength += tracklist[trackNum].duration;
//           }
//         });
//         trackNum++;
//       }
//       res.send(playlistHour);
//     })
//     .catch(err => console.log(err));
//


module.exports.test = test;
