 import mapboxgl from 'mapbox-gl';
import { connect } from 'react-redux';
import { setWaypointsAction, setLineAction, setMinutesAction } from '../store/actions/tripactions.js'
import Axios from 'axios';
import Dock from 'react-dock'
import ItineraryView from './itineraryView.js'
import mapHelpers from './mapHelpers.js'
import Start from './start.js'
import PoiView from './pois.js'
import User from './user.js'
import Photos from './photos.js'
import Spotify from '../pages/spotify.js'
import mapCSS from '../styles/map.css'
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css';

const dotenv = require('dotenv').config();
mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

let map;
let x;
let poiCache = {}

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
      park: false,
      food: false,
      history: false,
      hotel: false,
      muesum: false,
      markers: null,
      currentPhoto: null,
      minutes: null,
    };
    this.addToTrip = this.addToTrip.bind(this);
    this.redrawLine = this.redrawLine.bind(this);
    this.renderDrawer = this.renderDrawer.bind(this);
    this.setPois = this.setPois.bind(this);
    this.getWebsite = this.getWebsite.bind(this);
    this.spotifyLogin = this.spotifyLogin.bind(this);
    this.setPhotoMarker = this.setPhotoMarker.bind(this);
    this.populateMap = this.populateMap.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
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
  this.renderDrawer('start');
}
componentDidUpdate(prevProps){
  console.log(prevProps, this.props.origin)
  if (this.props.origin !== prevProps.origin && this.props.destination !== prevProps.destination){
    poiCache = {};
    this.setState({
      park: false,
      history: false,
      museum: false,
      hotel: false,
      food: false,
    })
    this.populateMap();
    this.setState({ isVisible: false })
  } 
  if (this.props.line !== prevProps.line) {
    if (map.getSource('route')) {
      this.redrawLine(map);
    }
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
}
  createMarkers(key, venues){
   
    console.log(key, venues);
  let markerColors = {
    park: 'rgb(157, 188, 60)',
    food: 'rgb(32, 0, 191)',
    hotel: 'rgb(57, 92, 112)',
    history: 'rgb(170, 110, 40)',
    museum: 'rgb(242, 70, 101)'
  };
  const markers =  [];
  window.cainTest = [];
  window.patTest = []
  console.log(venues.data);
  venues.data.forEach((result, idx)=>{
    result.forEach(({ venueID, lat, lng, name, photo }, i)=>{ 
    console.log(lat, lng);
    if (window.patTest[idx]){
      window.patTest[idx].push(() => this.getWebsite(venueID))
      window.cainTest[idx].push(() => this.addToTrip(lng, lat, name, map));
    } else {
    window.patTest[idx] = [this.getWebsite.bind(this, venueID)]
    window.cainTest[idx] = [this.addToTrip.bind(this, lng, lat, name, map)];
    }
    markers.push(new mapboxgl.Marker({color: markerColors[key]})
    .setLngLat([lng, lat])
    .setPopup(new mapboxgl.Popup({ offset: 25 })
    .setHTML(`<img src=${photo} height="150px" width="150px" onClick=window.patTest[${idx}][${i}]()><br>
    <strong>${name}</strong>
    <br>
    <button type="button" className="btn btn-primary btn-sm" onClick="window.cainTest[${idx}][${i}]()">Add to Trip</button>`)))
    markers.forEach(marker=>{
      marker.addTo(map);
    })
  })
});
poiCache[key] = markers;
    this.setState({
      [key]: !this.state.key
    })
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

setPhotoMarker(lng, lat){
  const { currentPhoto } = this.state
   if (x) {
   x.remove();
}

    x = new mapboxgl.Marker({ color: 'rgb(0, 0, 0)' }).setLngLat([lng, lat]).addTo(map);
  this.setState({
    currentPhoto: {
      lng,
      lat,
    }
  })
}

addToTrip(lng, lat, name, map){
  const { tripId, line, waypoints } = this.props;
  let newWaypoint = {lng, lat, name}
  let alreadyStopped = () => {
    let filtered = waypoints.filter(point => `${point.lat},${point.lng}`!== `${lat},${lng}`)
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
    // console.log(response.data.trips[0].duration, 'minutes');
    this.props.setMinutes({
      minutes: response.data.trips[0].duration
    });
    let line = response.data.trips[0].geometry.coordinates
    let count = 0;  
    line.map(point=>{
      const pLat = point[1]
      const pLng = point[0]
      if (waypoints[count]) {
        const wLat = waypoints[count].lat
        const wLng = waypoints[count].lng
        if (pLat > wLat - .02 && pLat < wLat + .02 && pLng > wLng - .02 && pLng < wLng + .02) {
          count++;
        }
      } if (pLat > lat - .02 && pLat < lat + .02 && pLng > lng - .02 && pLng < lng + .02) {
        let orderedWaypoints = waypoints.slice(0, count).concat([newWaypoint]).concat(waypoints.slice(count))
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

renderDrawer(type, size = 0.50){
  const { origin, destination } = this.props;
    if (type === 'photos' && x){
      x.remove()
    }
    Axios.get('/login')
    .then(response=>{
      if (response.data.user === null && type === 'photos'){
        Alert.error('<strong>Please login or create an account to access photos</strong>', {
          position: 'top-left',
          beep: false,
          html: true,
          onShow: function(){
            setTimeout(Alert.closeAll, 2000)
          },
          timeout: 'none',
          offset: 100
        });
        return;
      }  if (response.data.user !== null && type === 'photos' && this.props.tripId === null){
        Alert.error('<strong>Please select a trip from your profile to add photos</strong>', {
          position: 'top-left',
          beep: false,
          html: true,
          onShow: function () {
            setTimeout(Alert.closeAll, 2000)
          },
          timeout: 'none',
          offset: 100
        });
        return;
      }
       else {
    this.setState({ 
      isVisible: !this.state.isVisible,
      currentDrawer: type,
      size
    })
  }
})
}

setPois(key){
  const { line } = this.props;
  if (this.state[key]){
    poiCache[key].forEach(point => {
        point.remove();
    })
    this.setState({ [key]: !this.state[key] })
    return;
  }
  if (!this.state[key] && poiCache[key]){
    poiCache[key].forEach(point=>{
        point.addTo(map);
    })
    this.setState({ [key]: !this.state[key] })
    return;
  }
  
      Axios.get(`/pois/${key}`, {params : [line] })
      .then(response=>{
        console.log(response);
        this.createMarkers(key, response)
      })
      .catch(err=>{
        console.log(err);
      })
}
toggleVisibility(){
  if (x){
    x.remove();
  }
  this.setState({
    isVisible : !this.state.isVisible
  })
}

spotifyLogin() {
  const { origin, destination, line, originName, destinationName } = this.props;
  Axios.get('/login')
  .then(response=>{
    console.log(response.data);
    if (response.data.user === null){
      return this.renderDrawer('user')
    } if (response.data.user !== null && !line){
      Alert.error('<strong>Create a trip to make a playlist</strong>', {
        position: 'top-left',
        beep: false,
        html: true,
        onShow: function () {
          setTimeout(Alert.closeAll, 2000)
        },
        timeout: 'none',
        offset: 100
      });
    }
    else{
      window.sessionStorage.setItem('origin', JSON.stringify(origin))
      window.sessionStorage.setItem('destination', JSON.stringify(destination))
      window.sessionStorage.setItem('line', JSON.stringify(line))
      window.sessionStorage.setItem('originName', JSON.stringify(originName))
      window.sessionStorage.setItem('destinationName', JSON.stringify(destinationName))
      window.location.pathname = '/login/spotify';
    }
  })
  }
  handleOnClose(){
    Alert.closeAll()
  }


  render() {
    return (
    <div>
        <div id="map" className="absolute top right left bottom" />
        <img id="profile" className="icons" src="/static/user.png" onClick={()=>this.renderDrawer('user')}></img><br/>
          <nav id="listing-group" className="listing-group">
          <img className="icons" src="/static/pointer.png" onClick={()=> this.renderDrawer('pois', 0.20)}></img><br/>
          <img className="icons" src="/static/sports-car.png" onClick={() => this.renderDrawer('itnierary')} zindex={4}></img><br/>
          <img className="icons" src="/static/spotify.png" onClick={this.spotifyLogin}></img><br/>
          <img className="icons" src="/static/camera.png" onClick={()=>this.renderDrawer('photos', 0.30)}></img><br/>
          <img className="icons" src="/static/globe.png" onClick={()=>this.renderDrawer('start')}></img>

          <Dock position="bottom"
            size={this.state.size}
            isVisible={this.state.isVisible}
            fluid={this.state.fluid}
            dimStyle={{ background: 'rgba(0, 0, 100, 0.2)' }}
            dockStyle={this.state.customAnimation ? { transition: transitions } : null}
            zIndex={3}
            onVisibleChange={this.toggleVisibility}
            style={{borderRadius: '20px'}}
            // duration={duration}
            >
            {({ position, isResizing }) =>
              <div 
                style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                color: 'black',
                gridGap: '1rem',
                backgroundColor: '#F1EAF5',
        
            }}>
 
                {this.state.currentDrawer === 'itnierary' ? <ItineraryView redrawLine={this.redrawLine.bind(this, map)}></ItineraryView> : null}
                {this.state.currentDrawer === 'pois' ? <PoiView setPois={this.setPois}></PoiView>: null }
                {this.state.currentDrawer === 'start' ? <Start closeDrawer={this.renderDrawer}/> : null}
                {this.state.currentDrawer === 'user' ? <User renderDrawer={this.renderDrawer}/> : null}
                {this.state.currentDrawer === 'photos' ? <Photos setPhotoMarker={this.setPhotoMarker} /> : null}
                {this.state.currentDrawer === 'spotify' ? <Spotify /> : null}


              </div>
            }
          </Dock>
        </nav>
        <Alert stack={{ limit: 1 }} html={true} />
      <style jsx>{mapCSS}
      </style>
      </div>
    )
  }
}
export default connect(
  null,
  dispatch => ({
    setWaypoints: setWaypointsAction(dispatch),
    setLine: setLineAction(dispatch),
    setMinutes: setMinutesAction(dispatch),
  })
)(DynamicMap)


