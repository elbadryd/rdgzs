import ReactMapboxGl, { Layer, Feature, Marker, Popup } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import Head from 'next/head';
import Link from 'next/link';
import { connect } from 'react-redux';
import { setWaypointsAction, setLineAction } from '../store/actions/tripactions.js'
import Axios from 'axios';

import { timingSafeEqual } from 'crypto';

const dotenv = require('dotenv').config();
mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

const Map = ReactMapboxGl({ accessToken: process.env.MAPBOX_API_KEY })

class DynamicMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.addToTrip = this.addToTrip.bind(this);
    this.redrawLine = this.redrawLine.bind(this);
  }

componentDidMount(){
  const { line, pois } = this.props;
  if (line && pois) {
    return this.populateMap();
  }
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-98.5795, 39.8283],
    zoom: 3,
  });
}

populateMap(){
  const { line, pois } = this.props;
  let coordinates = line;
  let centerLng = coordinates[Math.floor(coordinates.length / 2)][0]
  let centerLat = coordinates[Math.floor(coordinates.length / 2)][1]
  var bounds = coordinates.reduce((bounds, coord)=>{
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [centerLng, centerLat],
  });
  // let data = {
  // }
  map.on('load', function () {
  // map.addSource('lineConfig', data);
    map.addLayer({
      "id": "route",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": line
          }
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#E87111",
        "line-width": 6
      }
    })
    .fitBounds(bounds, {
      padding: 20
    });
  });
  window.cainTest = [];
  pois.forEach(({ img, lat, lng, name }, i)=>{
    window.cainTest.push(() => this.addToTrip(lng, lat, name));
    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
      .setHTML(`<img src=${img} height="150px" width="150px"><br>
      <strong>${name}</strong>
      <div onClick="window.cainTest[${i}]()">add to trip</div>`))
      .addTo(map);
  });

}

redrawLine(){
  // const { line } = this.props;
  // let map = document.getElementById('map');
  // map.setData('route', {
  //   type: 'line', "data": {
  //     "type": "Feature",
  //     "properties": {},
  //     "geometry": {
  //       "type": "LineString",
  //       "coordinates": line
  //     }
  //   } })
}

addToTrip(lng, lat, name){
  const { line, waypoints } = this.props;
   this.props.setWaypoint({
       lng,
       lat,
       name,
   })
   let currentWaypointsString = `${lng},${lat};`
   waypoints.map(waypoint=>{
     currentWaypointsString += `${waypoint.lng},${waypoint.lat};` 
   })
   let queryString = `${line[0][0]},${line[0][1]};${currentWaypointsString}${line[line.length-1][0]},${line[line.length-1][1]}`  
   Axios.get('/redraw', {
     params: queryString
   })
   .then((response)=>{
     let line = response.data.trips[0].geometry.coordinates
     this.props.setLine({
       line
     });
    })
    // .then(() => {
    //   this.redrawLine();
    // })
   .catch(err=>{
     console.log(err)
   })
} 

  render() {
    return (
    <div>
      <Head>
        <title> Welcome to your trip</title>
        <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, height=devive-height, initial-scale=1' />
              <script src='https://npmcdn.com/@turf/turf/turf.min.js'></script>
            <link href='https://api.mapbox.com/mapbox-assembly/mbx/v0.18.0/assembly.min.css' rel='stylesheet'/>
              <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.39.1/mapbox-gl.css' rel='stylesheet' />
         </Head>
        <div id="map" className="absolute top right left bottom" />
        <nav id="listing-group" className="listing-group">
          <Link href='/forms/login'><img src="/static/user.png"></img></Link><br/>
          <img src="/static/info.png"></img><br/>
          <Link href='/itinerary/itinerary'><img src="/static/sports-car.png"></img></Link><br/>
          <Link href='/trip/music'><img src="/static/spotify.png"></img></Link><br/>
          <Link href='/trip/photos'><img src="/static/camera.png"></img></Link><br/>
          <Link href='/start'><img src="/static/left-arrow.png"></img></Link>

          

</nav>
      <style jsx>{`
      #map { position:absolute; top:0; bottom:0; width:100%; }
      nav {
        font: 20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;
        border-radius: 3px;
        max-width: 20%;
        color: #fff;

    }

    label {
        border-radius: 0 0 3px 3px;
        padding: 20px;
    }
      `}
      </style>
      </div>
    )
  }
}
export default connect(
  null,
  dispatch => ({
    setWaypoint: setWaypointsAction(dispatch),
    setLine: setLineAction(dispatch)
  })
)(DynamicMap)
