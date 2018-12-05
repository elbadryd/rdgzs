import { connect } from "react-redux";
import axios from 'axios';
import wdk from 'wikidata-sdk';
const turf = require('@turf/helpers');
const along = require('@turf/along');
const distance = require('@turf/distance');

class Spotify extends React.Component {
  constructor(props){
    super(props);
      this.state={
      }
      this.getCities = this.getCities.bind(this);
      this.getQueryPoints = this.getQueryPoints.bind(this);
      this.getEntities = this.getEntities.bind(this);
    }   
  
  
  getCities(coords){
    console.log(coords);
    let citySearch = coords.map(coord=>{
      return axios.get(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=1000-largest-us-cities-by-population-with-geographic-coordinates%40public&sort=-rank&facet=city&facet=state&geofilter.distance=${coord.geometry.coordinates[1]}%2C${coord.geometry.coordinates[0]}%2C200000`)
    })
    console.log(citySearch)
    axios.all(citySearch)
    .then(response=>{
      console.log(response);
      let top = [];
      response.forEach((result, i)=>{
        let highest = result.data.records.slice(0, 3);
        console.log(highest);
        highest.forEach(record=>{
          if (!top[i]){
            top[i] = [`${record.fields.city}, ${record.fields.state}`];
          } else {
            top[i].push(`${record.fields.city}, ${record.fields.state}`);
          }
        })
      })
      console.log(top);
      let known = {}
      let filtered = top.map(subarray =>
        subarray.filter(item => !known.hasOwnProperty(item) && (known[item] = true))
      )
      console.log(filtered);
    })
    .catch(err=>{
      console.log(err)
    })
  }
  getQueryPoints(){
    const { line, origin, destination } = this.props
    var polyline = turf.lineString(line);
    let dist = distance.default([origin.lng, origin.lat], [destination.lng, destination.lat]);
    console.log(dist);
    console.log(polyline);
    let points = line.map((coords, i) => {
      if (dist > (i * 150) + 1){
        return along.default(polyline, i * 150)
      }
    })
    let coords = points.filter(coord =>{
      return coord !== undefined;
    })
    console.log(coords);
    this.getCities(coords);
  }
  getEntities(){
    let city = "Monroe, Louisiana"
    let sparql = `SELECT DISTINCT ?item WHERE { ?item (wdt: P31/wdt:P279*) wd:Q515. ?item ?label "Lafayette, Louisiana"@en.}`
    axios.get(`https://query.wikidata.org/sparql?query=${sparql}&format=JSON`)
    .then(response=>{
      console.log(response);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  render(){
    return(
      <div>
      <div><img onClick={this.getQueryPoints} src="/static/spotify.png"></img></div>
      <div onClick={this.getEntities}>getentities</div>
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
