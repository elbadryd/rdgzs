const request = require('request');
const axios = require('axios');
const turf = require('@turf/helpers');
const along = require('@turf/along');
const dotenv = require('dotenv').config();

const catObj = {
  parks: '52e81612bcbc57f1066b7a21',
  food: '4d4b7105d754a06374d81259',
  hotels: '4bf58dd8d48988d1fa931735',
  history: '4deefb944765f83613cdba6e',
  museums: '4bf58dd8d48988d181941735',
};

const makeTrip = (waypoints, context, callback) => {
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
  request({
    url: `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints}?geometries=geojson&roundtrip=false&source=first&destination=last&access_token=${process.env.MAPBOX_API_KEY}`,
  }, (err, res, body) => {
    const data = JSON.parse(body);
    console.log(data);
    const line = turf.lineString(data.trips[0].geometry.coordinates);
    console.log(line);
    let points = Array(Math.floor((data.trips[0].distance / 1000) / 100)).fill().map((_, i) => along.default(line, i * 200).geometry.coordinates);

    // if (points.length > 10) {
    //   while (points > 10) {
    //     if (points > 15) {
    //       points = points.filter((point, i) => i % 2);
    //     } else {
    //       points = points.filter((point, i) => i % 3);
    //     }
    //   }
    // }

    // const num = 2;
    // // throttle?
    // const promisesP = points.map(point => getPoi(point[1], point[0], catObj.parks, num));
    // const promisesF = points.map(point => getPoi(point[1], point[0], catObj.food, num));
    // const promisesHot = points.map(point => getPoi(point[1], point[0], catObj.hotels, num));
    // const promisesH = points.map(point => getPoi(point[1], point[0], catObj.history, num));
    // const promisesM = points.map(point => getPoi(point[1], point[0], catObj.museums, num));
    // const promises = promisesP.concat(promisesF).concat(promisesHot).concat(promisesH).concat(promisesM);

    // Promise.all(promises).then((values) => {
    //   const venues = [];
    //   const allVenues = [].concat(...values)
    //     .map((result, i) => {
    //     // array of 10 arrays (5 responses from each point searched, 2 points searched)
    //       if (result.group.results) {
    //         // if length is less than num, push null for the difference
    //         if (result.group.results.length < num) {
    //           const diff = num - result.group.results.length;
    //           for (let d = 0; (d < num - diff); d += 1) {
    //             venues.push({ category: i, lat: null });
    //           }
    //         }
    //         return result.group.results.map((obj) => {
    //           const poi = {
    //             category: i,
    //             venueID: obj.venue.id,
    //             name: obj.venue.name,
    //             lat: obj.venue.location.lat,
    //             lng: obj.venue.location.lng,

    //           };
    //           if (obj.photo) {
    //             poi.img = `${obj.photo.prefix}250x250${obj.photo.suffix}`;
    //           }
    //           venues.push(poi);
    //           return poi;
    //         });
    //       }
    //       for (let x = 0; x < num; x += 1) {
    //         venues.push({ category: i, lat: null });
    //       }
    //     });
    //   const pois = venues.map((poi) => {
    //     poi.category = Math.floor((poi.category / venues.length) * 10);
    //     return poi;
    //   }).filter(poi => poi.lat !== null);
      const distance = data.trips[0].distance; 
    callback(null, { line, distance }, { 'Content-Type': 'application/json' });
  });
  // .catch((err) => {
  //   console.log(err);
  // });
  // });
};

const redrawRoute = (waypoints, callback) => {
  request({
    url: `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${waypoints}?geometries=geojson&roundtrip=false&source=first&destination=last&access_token=${process.env.MAPBOX_API_KEY}`,
  }, (err, res, body) => {
    const data = JSON.parse(body);
    console.log(data);
    callback(data);
  });
};

const getTopTracks = (id, token) => axios.get(`https://api.spotify.com/v1/artists/${id}/top-tracks?market=us`, {
  headers: {
    client_id: process.env.SPOTIFY_ID,
    Authorization: `Bearer ${token}`,
  },
});

const artistId = (name, token) => axios.get(`https://api.spotify.com/v1/search?q=${name}&type=artist`, {
  headers: {
    client_id: process.env.SPOTIFY_ID,
    Authorization: `Bearer ${token}`,
  },
});

module.exports.makeTrip = makeTrip;
module.exports.redrawRoute = redrawRoute;
module.exports.getTopTracks = getTopTracks;
module.exports.artistId = artistId;
