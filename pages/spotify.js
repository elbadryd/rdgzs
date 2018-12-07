import { connect } from "react-redux";
import axios from 'axios';
import Router from 'next/router';
const turf = require('@turf/helpers');
const along = require('@turf/along');
const distance = require('@turf/distance');

class Spotify extends React.Component {
  constructor(props){
    super(props);
      this.state={
        distance: null,
        access: null,
        refresh: null,
      }
      this.getCities = this.getCities.bind(this);
      this.getQueryPoints = this.getQueryPoints.bind(this);
      this.getEntities = this.getEntities.bind(this);
      this.getArtistNames = this.getArtistNames.bind(this);
      this.getArtistIds = this.getArtistIds.bind(this);
      this.getPlaylists = this.getPlaylists.bind(this);
      this.createPlaylist = this.createPlaylist.bind(this);
    }

  // makes an array of coords and calls getCities
  getQueryPoints(){
    //shoud only fire if these props exist
    let line = JSON.parse(window.sessionStorage.getItem('line'));
    let origin = JSON.parse(window.sessionStorage.getItem('origin'));
    let destination = JSON.parse(window.sessionStorage.getItem('destination'));
    // let originName = JSON.parse(window.sessionStorage.getItem('originName'));
    // let destinationName = JSON.parse(window.sessionStorage.getItem('destinationName'));

    console.log(line, origin, destination);
    var polyline = turf.lineString(line);
    let dist = distance.default([origin.lng, origin.lat], [destination.lng, destination.lat]);
    this.setState({
      distance: dist
    });
    let points = line.map((coords, i) => {
      if (dist > (i * 150) + 1){
        return along.default(polyline, i * 150)
      }
    })
    let coords = points.filter(coord =>{
      return coord !== undefined;
    })
    // add final destination to end of coords
    let obj = {geometry : { coordinates : [destination.lng, destination.lat]}};
    coords.push(obj);
    this.getCities(coords);
  }

  // accepts array of coords, makes an array of arrays of city names, calls getEntities
  getCities(coords){
    let citySearch = coords.map(coord=>{
      return axios.get(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=1000-largest-us-cities-by-population-with-geographic-coordinates%40public&sort=-rank&facet=city&facet=state&geofilter.distance=${coord.geometry.coordinates[1]}%2C${coord.geometry.coordinates[0]}%2C200000`)
    })
    axios.all(citySearch)
    .then(response=>{
      let top = [];
      response.forEach((result, i)=>{
        let add = true;
        let x = 0;
        while(add && result.data.records[x]) {
          const city = result.data.records[x].fields.city + ', ' + result.data.records[x].fields.state;
          if (top.indexOf(city) === -1) {
            top.push(city);
            add = false;
          }
          x++
        }
      });
      console.log(top);
      this.getEntities(top);
    })
    .catch(err=>{
      console.log(err)
    })
  }

  // accepts array of city names, makes city wikidata ids, calls getArtistNames
  getEntities(results){
    let queries = results.map(city=>{
      if (city === 'New York, New York') {
        city = 'New York'
      } else if (city === 'Gulfport, Mississippi') {
        city = 'Gulfport'
      }
        return axios.get(`https://query.wikidata.org/sparql?query=SELECT DISTINCT ?item WHERE { ?item (wdt:P31/wdt:P279*) wd:Q515. ?item ?label "${city}"@en.}&format=JSON`)
      });
     // }
    axios.all(queries)
    .then(responses=>{
      let cityIds = responses.map(obj=>{
          if(obj.data.results.bindings[0]){
            return obj.data.results.bindings[0].item.value.slice(31);
          } 
        })
      console.log(cityIds)
      console.log(cityIds.filter(city => city));
      this.getArtistNames(cityIds);
    })
    .catch(err=>{
      console.log(err);
    })
  }

  // accepts array of city ids, makes array of artist name arrays, calls getArtistIds
  getArtistNames(citiesArray) {
    const promises = citiesArray.map((city) => {
      return axios.get(encodeURI(`https://query.wikidata.org/sparql?query=SELECT ?bandLabel WHERE {
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
        ?band (p:P31/ps:P31/wdt:P279*) wd:Q215380.
        ?band wdt:P740 wd:${city}.
        ?band wikibase:statements ?outcoming.
      }
      ORDER BY DESC(?outcoming)
      LIMIT 20&format=json`)) 
    });
    axios.all(promises).then((res) => {
      const artistNames = res.map((bandRes) => {
        console.log(bandRes);
        return bandRes.data.results.bindings.map(band => band.bandLabel.value);
      });
      this.getArtistIds(artistNames);
    })
    .catch(err => console.log(err));
  }
  // accepts array artist name arrays, makes an array of artist ID arrays
  // with each array containing a single string of ids separated by commas
  // calls getPlaylists
  getArtistIds(nameArrays){
    const namesArray = nameArrays.filter((names => names.length));
    const promises = namesArray.map((names) => {
      return axios.all(names.map((name) => axios.get(`/soundtrack/artistId/?name=${name}`)));
    });
    axios.all(promises).then((ids) => this.getPlaylists(ids))
    .catch(err => console.log(err));
  }
  // accepts array of ID arrays, returns array of arrays of playlists
  getPlaylists(idsArray){
    console.log(this.state.distance);
    let idStrings = [];
    idsArray.map((ids, x) => {
      idStrings[x] = '',
      ids.map((id, i) => {
        if (id.data.length && i < ids.length - 1) {
          idStrings[x] += id.data + ','
        } else if (id.data.length) {
          idStrings[x] += id.data;
        }
      });
    });
    const promises = idStrings.map((idString) => {
      return axios.get(`/soundtrack/allTracks?ids=${idString}`)
    })
    axios.all(promises).then((res) => {
      this.createPlaylist(res.map((list) => list.data));
   }).catch(err=>{
     console.log(err);
   })
  }  
  // accepts an array of playlist arrays, creates a playlist
  createPlaylist(playlistArrays){
    console.log(playlistArrays);
    // minutes to miliseconds
    const duration = this.state.distance * 60000; 
    const segment = duration / playlistArrays.length
    const trackMinutes = []
    let finalPlaylist = [];
    playlistArrays.map((list) => {
      let diff = list.duration  - segment;
      trackMinutes.push(diff);
    });
    playlistArrays.map((list) => {
      let tracker = 0;
      list.tracks.map((song) => {
        if (tracker < segment) {
          finalPlaylist.push( song.uri );
          tracker += song.duration;
        }
      }) 
    });
    axios.get('/trip/pl', {
      params: {
        tracks: finalPlaylist,
        name: 'my roadtrip playlist',
      },
    }).then((response) => {
      Router.push('/');
    }).catch((err) => {
      console.log(err);
    });
    console.log(finalPlaylist);
  }


  render(){
    return(
      <div>
      <div><img onClick={this.getQueryPoints} src="/static/spotify.png"></img></div>
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
    originName: state.originName,
    destinationName: state.destinationName,
  })
)(Spotify)
