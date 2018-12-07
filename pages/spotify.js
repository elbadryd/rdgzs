import { connect } from "react-redux";
import axios from 'axios';
const turf = require('@turf/helpers');
const along = require('@turf/along');
const distance = require('@turf/distance');

class Spotify extends React.Component {
  constructor(props){
    super(props);
      this.state={
        access: null,
        refresh: null,
      }
      this.getCities = this.getCities.bind(this);
      this.getQueryPoints = this.getQueryPoints.bind(this);
      this.getEntities = this.getEntities.bind(this);
      this.createPlaylist = this.createPlaylist.bind(this);
    }   
  createPlaylist(){
    axios.get('/login')
    .then(response=>{
      this.setState({
        access: response.data.user.accessToken,
        refresh: response.data.user.refreshToken,
      })
    })
    this.getQueryPoints();
    //when functions are finised, open spotify, redirect to '/'
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
  render(){
    return(
      <div>
        <div class="h-100 row align-items-center">
          <div class="col">
            <img onClick={this.createPlaylist} src="/static/spotify.png"></img>
          </div>
        </div>
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
