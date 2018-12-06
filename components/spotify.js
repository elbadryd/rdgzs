import { connect } from "react-redux";
<<<<<<< HEAD
import Axios from "axios";
=======
import axios from 'axios';
>>>>>>> 3754d38611e10a8b50760466b6b2b94372928c93
const turf = require('@turf/helpers');
const along = require('@turf/along');
const distance = require('@turf/distance');

class Spotify extends React.Component {
  constructor(props){
    super(props);
      this.state={
      }
    }

  // accept a line, returns array of points ()
  getQueryPoints(){

  }
  // accepts array of points, returns array of arrays of city names
  getCities(){
  }
  // accepts array of arrays of city names, returns array of arrays of artist names
  getArtistNames(citiesArray) {

  }
  // accepts array of arrays of artist names, returns array of arrays of artist IDs
  // with each array containing a single string of ids separated by commas
  getArtistIds(namesArray){
    return Axios.all(namesArray.map((names) => {
      return Axios.all(names.map((name) => Axios.get(`/soundtrack/artistId/?name=${name}`)));
    }));
  }
  // accepts array of arrays of IDs, returns array of arrays of playlists
  getPlaylists(idsArray){
    let idStringArr = idsArray.map((ids) => {
      let string = '' 
      ids.map()
    })
    idsArray.map(ids => Axios.get(`/soundtrack/allTracks?ids=${ids}`))
      this.getCities = this.getCities.bind(this);
      this.getQueryPoints = this.getQueryPoints.bind(this);
      this.getEntities = this.getEntities.bind(this);
    }   
  
  
  getCities(coords){
    let citySearch = coords.map(coord=>{
      return axios.get(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=1000-largest-us-cities-by-population-with-geographic-coordinates%40public&sort=-rank&facet=city&facet=state&geofilter.distance=${coord.geometry.coordinates[1]}%2C${coord.geometry.coordinates[0]}%2C200000`)
    })
    axios.all(citySearch)
    .then(response=>{
      let top = [];
      response.forEach((result, i)=>{
        let highest = result.data.records.slice(0, 1);
        highest.forEach(record=>{
          if (!top[i]){
            top[i] = [`${record.fields.city}, ${record.fields.state}`];
          } else {
            top[i].push(`${record.fields.city}, ${record.fields.state}`);
          }
        })
      })
      let known = {}
      let filtered = top.map(subarray =>
        subarray.filter(item => !known.hasOwnProperty(item) && (known[item] = true))
      )
      this.getEntities(filtered);
    })
    .catch(err=>{
      console.log(err)
    })
  }

  getQueryPoints(){
    //shoud only fire if these props exist
    const { line, origin, destination } = this.props
    var polyline = turf.lineString(line);
    let dist = distance.default([origin.lng, origin.lat], [destination.lng, destination.lat]);
    let points = line.map((coords, i) => {
      if (dist > (i * 150) + 1){
        return along.default(polyline, i * 150)
      }
    })
    let coords = points.filter(coord =>{
      return coord !== undefined;
    })
    this.getCities(coords);
  }

  getEntities(results){
    let queries = results.map(cities=>{
      if (cities.length){
      return axios.all(cities.map(city=>{
        return axios.get(`https://query.wikidata.org/sparql?query=SELECT DISTINCT ?item WHERE { ?item (wdt:P31/wdt:P279*) wd:Q515. ?item ?label "${city}"@en.}&format=JSON`)
      }));
      }
    })
    axios.all(queries)
    .then(responses=>{
      let ids = responses.map(response=>{
        if (response){
        return response.map(obj=>{
          if(obj.data.results.bindings){
            return obj.data.results.bindings[0].item.value.slice(31);
          }
        })
        }
      });
      console.log(ids);
    })
    .catch(err=>{
      console.log(err);
    })
  }

// ACCEPTS A GET REQUEST FOR A CITY AND RETURNS WIKI Q-ID
//   const city = req.query.city;
//   axios.get(encodeURI(`https://query.wikidata.org/sparql?query=SELECT DISTINCT ?item WHERE { ?item (wdt:P31/wdt:P279*) wd:Q515. ?item ?label "${city}"@en.}&format=JSON`))
//     .then((response) => {
//       console.log(response.data.results.bindings[0].item.value.slice(31));
//       res.send(response.data.results.bindings[0].item.value.slice(31));
//     })
//     .catch(err => console.log(err));









//   // 60 min = 3600000 ms
// // accepts an array of spotify ids, returns a playlist that is approx 80 min long
// // edge cases: not enough tracks to make long enough playlist
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
//   const getQueryPoints = (lineString) => {
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
  
  
//   getQueryPoints('lineString')
//     .then(getCities)
//     .then((cityNames) => {
//     // array of city names
//       const promises = cityNames.map(city => getArtists(city));
//       return Promise.all(promises);
//     })
//     .then((namesOfArtists) => {
//       // array of promises?
//       const allIds = namesOfArtists.map(names => getIDs(names));
//       return Promise.all(allIds);
//     })
//     .then((arraysOfIDs) => {
//       const promises = arraysOfIDs.map(spotifyIDs => localMusic(spotifyIDs));
//       return Promise.all(promises);
//     })
//     .then((playlists) => {
//       let fullPlaylist = [];
//       playlists.forEach((list) => {
//         fullPlaylist = fullPlaylist.concat(list);
//       });
//       return fullPlaylist;
//     })
//     .then((fullPlaylist) => {
//       // writePlaylist
//     });
  


  render(){
    return(
      <div>
      {/* <div><img onClick={this.getQueryPoints} src="/static/spotify.png"></img></div> */}
      {/* <div onClick={this.getEntities}>getentities</div> */}
      </div>
    )
  }
}
export default connect(
  state=>({
    origin: state.origin,
    destination: state.destination,
    waypoints: state.waypoints,
    line: state.line,
  })
)(Spotify)
