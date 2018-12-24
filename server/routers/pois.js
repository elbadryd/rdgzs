/* eslint-disable arrow-parens */
const express = require('express');
const turf = require('@turf/helpers');
const along = require('@turf/along');
const distance = require('@turf/distance');
const axios = require('axios');
const dotenv = require('dotenv').config();


const pois = express.Router();

pois.get('/:key', (req, res) => {
  console.log(req.params);
  const key = req.params.key;
  const catObj = {
    park: '52e81612bcbc57f1066b7a21',
    food: '4d4b7105d754a06374d81259',
    hotel: '4bf58dd8d48988d1fa931735',
    history: '4deefb944765f83613cdba6e',
    museum: '4bf58dd8d48988d181941735',
  };
  console.log(catObj[key]);
  const line = req.query['0'].map(el => JSON.parse(el));
  const dist = distance.default(line[0], line[line.length - 1]);
  const poly = turf.lineString(line);
  const points = line.map((coords, i) => {
    if (dist * 1.25 > (i * 200) + 1) {
      return along.default(poly, i * 150).geometry.coordinates;
    }
  });
  const coords = points.filter(coord => coord !== undefined);
  console.log(coords);
  const num = 3;
  function getPoi(latitude, longitude, categoryID, resultNum) {
    return new Promise((resolve, revoke) => {
      axios.get('https://api.foursquare.com/v2/search/recommendations', {
        params: {
          client_id: process.env.FOURSQUARE_ID,
          client_secret: process.env.FOURSQUARE_SECRET,
          ll: `${latitude},${longitude}`,
          categoryId: categoryID,
          v: '20181202',
          limit: resultNum,
          radius: 100000,
        },
      }).then(response => resolve(response.data.response)).catch(error => revoke(error));
    });
  }
  const promises = coords.map(coord => getPoi(coord[1], coord[0], catObj[key], num));
  Promise.all(promises)
    .then((responses) => {
      console.log(catObj[key]);
      const result = responses.map((response) => response.group.results.map(place => {
        const ven = {
          venueID: place.venue.id,
          name: place.venue.name,
          lat: place.venue.location.lat,
          lng: place.venue.location.lng,
        };
        if (place.photo) {
          ven.photo = `${place.photo.prefix}250x250${place.photo.suffix}`;
        }
        return ven;
      }));
      res.send(result);
      // const venues = [];
      // response.map((result, i) => {
      //   // array of 10 arrays (5 responses from each point searched, 2 points searched)
      //   if (result.group.results) {
      //     // if length is less than num, push null for the difference
      //     if (result.group.results.length < num) {
      //       const diff = num - result.group.results.length;
      //       for (let d = 0; (d < num - diff); d += 1) {
      //         venues.push({ category: i, lat: null });
      //       }
      //     }
      //     return result.group.results.map((obj) => {
      //       const poi = {
      //         category: i,
      //         venueID: obj.venue.id,
      //         name: obj.venue.name,
      //         lat: obj.venue.location.lat,
      //         lng: obj.venue.location.lng,

      //       };
      //       if (obj.photo) {
      //         poi.img = `${obj.photo.prefix}250x250${obj.photo.suffix}`;
      //       }
      //       venues.push(poi);
      //       return poi;
      //     });
      //   }
      //   for (let x = 0; x < num; x += 1) {
      //     venues.push({ category: i, lat: null });
      //   }
      // });
      // const markers = venues.map((poi) => {
      //   poi.category = Math.floor((poi.category / venues.length) * 10);
      //   return poi;
      // }).filter(poi => poi.lat !== null);
      // console.log(markers);
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports.poiRouter = pois;
