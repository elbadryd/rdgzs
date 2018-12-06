import { connect } from "react-redux";
import Axios from "axios";
const turf = require('@turf/helpers');
const along = require('@turf/along');

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

    )
  }
}
export default connect(
  state=>({
    origin: state.origin,
    destination: state.destination,
    waypoints: state.waypoints,
  })
)(Spotify)
