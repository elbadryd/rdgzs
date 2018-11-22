const request = require('request')
const axios   = require('axios')
const turf    = require('@turf/helpers')
const along   = require('@turf/along')
const dotenv = require('dotenv').config();

const makeTrip = (start = '-90.071533,29.9511', end = '-95.366302,29.761993', context, callback) => {
function getParks(latitude, longitude) {
    // return a promise from request to foursquare
    return new Promise((resolve, revoke) => {
      axios.get('https://api.foursquare.com/v2/search/recommendations', {
        params: {
          // foursquare authentication
          client_id: process.env.FOURSQUARE_ID,
          client_secret: process.env.FOURSQUARE_SECRET,
          // lat/long points passed as arguments to getVenues
          ll: `${latitude},${longitude}`,
          // categoryID (national park, historic site, museum, food, hotel)
          categoryId: '52e81612bcbc57f1066b7a21',
          // date to determine version
          v: '20181120',
          // total number of results
          limit: 2,
          // 100 km radius
          radius: 100000,
        },
        // venues found near the point
      }).then(response => resolve(response.data.response)).catch(error => revoke(error));
    });
  }
  function getMuseums(latitude, longitude) {
    // return a promise from request to foursquare
    return new Promise((resolve, revoke) => {
      axios.get('https://api.foursquare.com/v2/search/recommendations', {
        params: {
          // foursquare authentication
          client_id: process.env.FOURSQUARE_ID,
          client_secret: process.env.FOURSQUARE_SECRET,
          // lat/long points passed as arguments to getVenues
          ll: `${latitude},${longitude}`,
          // categoryID (national park, historic site, museum, food, hotel)
          categoryId: '4bf58dd8d48988d181941735',
          // date to determine version
          v: '20181120',
          // total number of results
          limit: 2,
          // 100 km radius
          radius: 100000,
        },
        // venues found near the point
      }).then(response => resolve(response.data.response)).catch(error => revoke(error));
    });
  }
  function getFood(latitude, longitude) {
    // return a promise from request to foursquare
    return new Promise((resolve, revoke) => {
      axios.get('https://api.foursquare.com/v2/search/recommendations', {
        params: {
          // foursquare authentication
          client_id: process.env.FOURSQUARE_ID,
          client_secret: process.env.FOURSQUARE_SECRET,
          // lat/long points passed as arguments to getVenues
          ll: `${latitude},${longitude}`,
          // categoryID (national park, historic site, museum, food, hotel)
          categoryId: '4d4b7105d754a06374d81259',
          // date to determine version
          v: '20181120',
          // total number of results
          limit: 2,
          // 100 km radius
          radius: 100000,
        },
        // venues found near the point
      }).then(response => resolve(response.data.response)).catch(error => revoke(error));
    });
  }
  function getHotels(latitude, longitude) {
    // return a promise from request to foursquare
    return new Promise((resolve, revoke) => {
      axios.get('https://api.foursquare.com/v2/search/recommendations', {
        params: {
          // foursquare authentication
          client_id: process.env.FOURSQUARE_ID,
          client_secret: process.env.FOURSQUARE_SECRET,
          // lat/long points passed as arguments to getVenues
          ll: `${latitude},${longitude}`,
          // categoryID (national park, historic site, museum, food, hotel)
          categoryId: '4bf58dd8d48988d1fa931735',
          // date to determine version
          v: '20181120',
          // total number of results
          limit: 2,
          intent: 'browse',
          // 100 km radius
          radius: 100000,
        },
        // venues found near the point
      }).then(response => resolve(response.data.response)).catch(error => revoke(error));
    });
  }
  function getHist(latitude, longitude) {
    // return a promise from request to foursquare
    return new Promise((resolve, revoke) => {
      axios.get('https://api.foursquare.com/v2/search/recommendations', {
        params: {
          // foursquare authentication
          client_id: process.env.FOURSQUARE_ID,
          client_secret: process.env.FOURSQUARE_SECRET,
          // lat/long points passed as arguments to getVenues
          ll: `${latitude},${longitude}`,
          // categoryID (national park, historic site, museum, food, hotel)
          categoryId: '4deefb944765f83613cdba6e',
          // date to determine version
          v: '20181120',
          // total number of results
          limit: 2,
          intent: 'browse',
          // 100 km radius
          radius: 100000,
        },
        // venues found near the point
      }).then(response => resolve(response.data.response)).catch(error => revoke(error));
    });
  }
  
  request({
    url: `https://api.mapbox.com/directions/v5/mapbox/driving/${start};${end}?geometries=geojson&access_token=${process.env.MAPBOX_API_KEY}`
  }, (err, res, body) => {
    let data = JSON.parse(body)
    let line = turf.lineString(data.routes[0].geometry.coordinates)
    let points = Array(Math.floor((data.routes[0].distance/1000)/200)).fill().map((_, i) => along.default(line, i * 200).geometry.coordinates)
    
    const promisesP = points.map(point => getParks(point[1], point[0]));
    const promisesF = points.map(point => getFood(point[1], point[0]));
    const promisesHot = points.map(point => getHotels(point[1], point[0]));
    const promisesH = points.map(point => getHist(point[1], point[0]));
    const promisesM = points.map(point => getMuseums(point[1], point[0]));
    const promises = promisesP.concat(promisesF).concat(promisesHot).concat(promisesH).concat(promisesM);
    
    Promise.all(promises).then(values => {
      let venues = [];
      let allVenues = [].concat(...values)
      .map((result, i) => {
        // array of 10 arrays (5 responses from each point searched, 2 points searched)

        if (result.group.results){
        return result.group.results.map((obj) => {
          let poi =  {
          category: i,
          name: obj.venue.name,
          lat: obj.venue.location.lat,
          lng: obj.venue.location.lng,
         
          }
          if (obj.photo) {
          poi.img = obj.photo.prefix + '250x250' + obj.photo.suffix;
          }
          venues.push(poi)
          return poi;
          }) 
        }
      })
      let pois = venues.map((poi) => {
       poi.category = Math.floor((poi.category/venues.length)*10)
      return poi
      })
      callback(null, { line, pois }, {'Content-Type': 'application/json'})
    })
  })
};

module.exports.makeTrip = makeTrip;