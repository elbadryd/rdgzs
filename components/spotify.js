import { connect } from "react-redux";
import axios from 'axios';
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
        let highest = result.data.records.slice(2);
        highest.forEach(record=>{
          if (top[i]){
            top[i].push(`${record.fields.city}, ${record.fields.state}`);
          } else {
            top[i] = [`${record.fields.city}, ${record.fields.state}`];
          }
        })
      })
      console.log(top);
      let filtered = top.forEach((query)=>{
        query.forEach((city, i)=>{
          if (query.indexOf(city) !== -1){
            query.splice(i, 1);
          }
        })
      })
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
      if (dist > (i * 200) + 1){
        return along.default(polyline, i * 200)
      }
    })
    let coords = points.filter(coord =>{
      return coord !== undefined;
    })
    this.getCities(coords);
  }
  render(){
    return(
      <div><img onClick={this.getQueryPoints} src="/static/spotify.png"></img></div>
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
