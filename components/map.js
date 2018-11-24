import ReactMapboxGl, { Layer, Feature, Marker, Popup } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import Head from 'next/head';
import Link from 'next/link';
// import start from '../pages/start.js'

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
    this.handleClick = this.handleClick.bind(this);
  }

componentDidMount(){
  const { line, pois } = this.props;

  let coordinates = line;
  let centerLng = coordinates[coordinates.length / 2][0]
  let centerLat = coordinates[coordinates.length / 2][1]
  var bounds = coordinates.reduce((bounds, coord)=>{
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [centerLng, centerLat],
  });
  map.on('load', function () {
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
            "coordinates": coordinates
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
  // var popup = new mapboxgl.Popup({ offset: 25 }).setText(result.name);
  window.cainTest = [];
  pois.forEach(({ img, lat, lng, name }, i)=>{
    window.cainTest.push(() => this.handleClick(lng, lat));
    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
      // .setText(`Name: ${name} "add to trip"`))
      .setHTML(`<img src=${img} height="150px" width="150px"><br>
      <strong>${name}</strong>
      <div onClick="window.cainTest[${i}]()">add to trip</div>`))
      .addTo(map);
      // <div onClick="${()=>window.cainTest(result.lng, result.lat)}">add to trip</div>`))
  });

} 
handleClick(lng, lat){
  console.log(lng, lat)
  this.addToTrip(lng, lat);
}

addToTrip(lng, lat){
    window.localStorage.setItem('lat', lat)
    window.localStorage.setItem('lng', lng)  
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
          <Link href='/start'><img src="/static/left-arrow.png"></img></Link><br/>

          

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
export default DynamicMap;
