import ReactMapboxGl, { Layer, Feature, Marker, Popup } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import Link from 'next/link';
import { connect } from 'react-redux';
import { setWaypointsAction, setLineAction } from '../store/actions/tripactions.js'
import Axios from 'axios';
import Dock from 'react-dock'
import ItineraryView from './itineraryView.js'
import mapHelpers from './mapHelpers.js'
import Start from './start.js'
import PoiView from './pois.js'
import User from './user.js'
import Photos from './photos.js'

import { timingSafeEqual } from 'crypto';
import { runInContext } from 'vm';

const dotenv = require('dotenv').config();
mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

let map;

class DynamicMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionIdx: 0,
      isVisible: false,
      fluid: true,
      customAnimation: false,
      slow: false,
      size: 0.50,
      map: null,
      currentDrawer: null,
      parks: false,
      food: false,
      history: false,
      hotels: false,
      muesums: false,
      markers: null,
    };
    this.addToTrip = this.addToTrip.bind(this);
    this.redrawLine = this.redrawLine.bind(this);
    this.renderDrawer = this.renderDrawer.bind(this);
    this.setPois = this.setPois.bind(this);
    this.getWebsite = this.getWebsite.bind(this);
  }

componentDidMount(){
  const { line, pois } = this.props;
  if (line) {
    console.log(line);
   this.populateMap();
  }
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-98.5795, 39.8283],
    zoom: 3,
  });
}
componentDidUpdate(prevProps){
  if (this.props.pois !== prevProps.pois){
    this.populateMap();
    this.setState({ isVisible: false })
  } 
}

populateMap(){
  const { line, pois } = this.props;
  let coordinates = line;
  let centerLng = coordinates[Math.floor(coordinates.length / 2)][0]
  let centerLat = coordinates[Math.floor(coordinates.length / 2)][1]
  var bounds = coordinates.reduce((bounds, coord)=>{
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
  
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [centerLng, centerLat],
  });

  mapHelpers.drawTheLine(map, line, bounds)

  let markerColors = [
    'rgb(157, 188, 60)',
    'rgb(255, 225, 25)',
    'rgb(57, 92, 112)',
    'rgb(170, 110, 40)',
    'rgb(242, 70, 101)'
  ];
  const markers =  [[],[],[],[],[]]
  window.cainTest = [];
  window.patTest = []
  pois.forEach(({ venueID, lat, lng, name, img, category }, i)=>{ 
    window.patTest.push(() => this.getWebsite(venueID))
    window.cainTest.push(() => this.addToTrip(lng, lat, name, map));
    if (category < 5) {
    markers[category].push(new mapboxgl.Marker({color: markerColors[category]})
    .setLngLat([lng, lat])
    .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<img src=${img} height="150px" width="150px" onClick=window.patTest[${i}]()><br>
    <strong>${name}</strong>
    <br>
    <div key=${i} onClick="window.cainTest[${i}]()">add to trip</div>`)))
  } else {
    console.log(category, name)
  }
  });
  this.setState({ markers })
    
  for (let i = 0; i < 5; i++) {
  markers[i].map((marker) => {
    marker.addTo(map)
  })
  }

    // let poiGeoSon = mapHelpers.poiHandler(poi, i);
    // poiData.push(poiGeoSon)
  // poiData add source and layers
}
getWebsite(venueID) {
  Axios.get(`https://api.foursquare.com/v2/venues/${venueID}`, {
    params: {
      client_id: process.env.FOURSQUARE_ID,
      client_secret: process.env.FOURSQUARE_SECRET,
      v: '20181120',
    }
  })
  .then((response) => {

    if (response.data.response.venue.url) {
      window.open(response.data.response.venue.url)
    }
    else {
      window.open(response.data.response.venue.canonicalUrl)
    }
  });
}

redrawLine(map){
  const { line } = this.props;
  map.getSource('route').setData({
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": line
      }
    })
}

addToTrip(lng, lat, name, map){
  const { tripId, line, waypoints } = this.props;
  let newWaypoint = {lng: parseFloat(lng).toFixed(6), lat: parseFloat(lat).toFixed(6), name}
  let alreadyStopped = () => {
    let filtered = waypoints.filter(point => `${point.lat},${point.lng}`!== `${newWaypoint.lat},${newWaypoint.lng}`)
    return filtered.length < waypoints.length;
  }
  if (alreadyStopped()) {
    console.log('already a stop!')
    return;
  }

  let currentWaypointsString = `${lng},${lat};`
  waypoints.map(waypoint=>{
     currentWaypointsString += `${waypoint.lng},${waypoint.lat};` 
  })
  let queryString = `${line[0][0]},${line[0][1]};${currentWaypointsString}${line[line.length-1][0]},${line[line.length-1][1]}`  
  Axios.get('/redraw', {
     params: queryString
  }).then((response)=>{
    let line = response.data.trips[0].geometry.coordinates
    let count = 0;  

    let wayLng = newWaypoint.lng.toString();
    let wayLat = newWaypoint.lat.toString();
    let checkLng =  wayLng.slice(0, wayLng.length - 4);
    let checkLat =  wayLat.slice(0, wayLat.length - 4);

    line.map(point=>{
      const latFloat = parseFloat(point[1]).toFixed(6).toString();
      const lngFloat =  parseFloat(point[0]).toFixed(6).toString();
      const pLat = latFloat.slice(0, latFloat.length - 4);
      const pLng = lngFloat.slice(0, lngFloat.length - 4);
      
      if (waypoints[count]) {
        let wLa = waypoints[count].lat.toString();  
        const wLn = waypoints[count].lng.toString();
        const wLat = wLa.slice(0, wLa.length - 4);
        const wLng = wLn.slice(0, wLn.length - 4);
        console.log(pLat, wLat, pLng, wLng, 'point and waypoint')

        if (pLat > wLat - .02 && pLat < wLat + .02 && pLng > wLng - .02 && pLng < wLng + .02) {
          console.log('same!')
          count++;
        }
      } if (pLat > checkLat - .02 && pLat < checkLat + .02 && pLng > checkLng - .02 && pLng < checkLng + .02) {
        console.log('here');
        let orderedWaypoints = waypoints.slice(0, count).concat([newWaypoint]).concat(waypoints.slice(count))
        console.log(orderedWaypoints, 'ordered');
        this.props.setWaypoints({ orderedWaypoints })
      }
    })
    this.props.setLine({
       line
     });
    this.redrawLine(map);
  })
  .then(() => {
    if (tripId){
    Axios.post('/stop', {
     stop: ({lng, lat, name, tripId})
    })
  }
  })
  .catch(err=>{
     console.log(err)
  })
} 

renderDrawer(type){
  this.setState({ 
    isVisible: !this.state.isVisible,
    currentDrawer: type
  })
}

setPois(key){
  this.setState({
    //tggle state property of key
    [key]: !this.state[key]
  })
  let markersObj = {
    parks: 0,
    food: 1,
    hotels: 2,
    history: 3,
    museums: 4,
  }
  console.log(this.state[key], 'state')
  console.log(this.state[markersObj[key]])
    if (this.state[key]) {
      this.state.markers[markersObj[key]].map((marker) => {
        marker.addTo(map)
      })
    } else {
      this.state.markers[markersObj[key]].map((marker) => {
        marker.remove();
      });
    }
}

  render() {
    return (
    <div>
        <div id="map" className="absolute top right left bottom" />
          <img id="profile" src="/static/user.png" onClick={this.renderDrawer.bind(this, 'user')}></img><br/>
        <nav id="listing-group" className="listing-group">
          <img src="/static/distance.png" onClick={()=> this.renderDrawer('pois')}></img><br/>
          <img src="/static/sports-car.png" onClick={() => this.renderDrawer('itnierary')} zindex={4}></img><br/>
          <Link href='/trip/music'><img src="/static/spotify.png"></img></Link><br/>
          <img src="/static/camera.png" onClick={this.renderDrawer.bind(this, 'photos')}></img><br/>
          <img src="/static/left-arrow.png" onClick={()=>this.renderDrawer('start')}></img>

          <Dock position="bottom"
            size={this.state.size}
            isVisible={this.state.isVisible}
            onVisibleChange={this.handleVisibleChange}
            onSizeChange={this.handleSizeChange}
            fluid={this.state.fluid}
            dimStyle={{ background: 'rgba(0, 0, 100, 0.2)' }}
            dockStyle={this.state.customAnimation ? { transition: transitions } : null}
            zIndex={3}
            // duration={duration}
            >
            {({ position, isResizing }) =>
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: 'black'
              }}>
                <div onClick={()=>this.renderDrawer(null)}
                  style={{
                  position: 'absolute',
                  zIndex: 1,
                  left: '10px',
                  top: '10px',
                }}><img src="/static/down-arrow.png" size="20px"></img></div>
                {this.state.currentDrawer === 'itnierary' ? <ItineraryView></ItineraryView> : null}
                {this.state.currentDrawer === 'pois' ? <PoiView setPois={this.setPois}></PoiView>: null }
                {this.state.currentDrawer === 'start' ? <Start closeDrawer={this.renderDrawer}/> : null}
                {this.state.currentDrawer === 'user' ? <User/> : null}
                {this.state.currentDrawer === 'photos' ? <Photos/> : null}

              </div>
            }
          </Dock>
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
    #profile{
      position: absolute;
      top: 10px;
      right: 10px;
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
    setWaypoints: setWaypointsAction(dispatch),
    setLine: setLineAction(dispatch)
  })
)(DynamicMap)
