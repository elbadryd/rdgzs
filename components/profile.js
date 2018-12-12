import axios from 'axios';
import { connect } from 'react-redux';
import { setTripAction } from '../store/actions/tripactions.js';
const dotenv = require('dotenv').config()
let photoData
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      tripData: [],
      photoData: [],
      images: [],
    };
    this.seeTrip = this.seeTrip.bind(this);
    this.openPhotos = this.openPhotos.bind(this);
  }

componentDidMount() {
    axios.get('/trip')
    .then(response=>{
      this.setState({ tripData: response.data })
    })
    .catch(err=>{
      console.log(err);
    })  
}

seeTrip(index){
  const tripId = this.state.tripData[index].id
  axios.get(`/stop/?tripid=${tripId}`, { 
    params: tripId 
  }).then((response) => {
    const waypoints = response.data
    let start = this.state.tripData[index].origin + ';'
    let stop =  this.state.tripData[index].destination;
    let queryString = [start];
    waypoints.map((point) => {
    queryString[0] += point.long_lat + ';'; 
    })
    queryString[0] += stop;
    axios.get('/createRoute', { 
      params: { 
        qstring: queryString[0]
    } }).then((route) => {
      const pois = route.data.pois;
      const line = route.data.line.geometry.coordinates
      let orderedWaypoints = [];
      line.map((point) => {
        let pLng = point[0];
        let pLat = point[1];
        waypoints.map((w) => {
          let coords = w.long_lat.split(',')
          let wLng = Number(coords[0]);
          let wLat = Number(coords[1]);
          if (pLat < wLat + .02 && pLat > wLat - .02 && pLng < wLng +.02 && pLng > wLng - .02) {
            if (orderedWaypoints.filter(obj => (obj.name === w.name)).length === 0)
            orderedWaypoints.push({ name: w.name, lat: wLat, lng: wLng })
          }
        });
      });
      let originCoords = this.state.tripData[index].origin.split(',')
      let destCoords = this.state.tripData[index].destination.split(',')
      let origin = {lat: Number(originCoords[1]), lng: Number(originCoords[0]) }
      let destination = {lat: Number(destCoords[1]), lng: Number(destCoords[0]) }
      let originName = this.state.tripData[index].origin_name
      let destinationName = this.state.tripData[index].destination_name
      let tripName = this.state.tripData[index].trip_name
      this.props.setTrip({
        origin,
        destination,
        pois,
        line, 
        originName,
        destinationName,
        waypoints: orderedWaypoints,
        tripId,
      })
    })
  })
    .catch(err => {
      console.log(err)
    })
  }
openPhotos(id){
  console.log(this.props, this.state);
  this.props.renderDrawer();
  this.props.renderDrawer('photos', 0.40);
  this.props.setTrip({
    tripId: id,
  })
}
removeTrip(index) {
  const id = this.state.tripData[index].id
  console.log(id, this.state.tripData, 'tripData')
    axios.delete('/trip', { params: id })
      .then(response=>{
        if (response.data === "Accepted") {
          this.setState({
            tripData: this.state.tripData.filter(trip=> trip.id !== id)
          })
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }
  
  submitLogout() {
    axios.get('/logout', (req, res) => {
      console.log(res);
    })
      .then(() => {
        console.log('logged out');
      })
  }


  render() {
    const { photoData } = this.state
    return (
    <div>
        <div id="trips" className="jumbotron-fluid">
        {this.state.tripData.map((trip, i) =>{
          
            return <div key={i} className="card rounded m-2">
              <div className="card-body rounded m-2">
                <h5 className="card-title">{trip.trip_name}</h5>
                <p className="card-text"></p>
                <div className="row mx-auto">
                  <div className="col-xs-4">
                    <a onClick={this.seeTrip.bind(this, i)} className="btn btn-primary m-1 btn-sm p">See Trip</a>
                  </div>
                  <div className="col-xs-4">
                    <a onClick={()=>this.openPhotos(trip.id)} className="btn btn-primary m-1 btn-sm">See Photos</a>
                  </div>
                  <div className="col-xs-4">
                    <a onClick={this.removeTrip.bind(this, i)} className="btn btn-danger m-1 btn-sm"><i className="fa fa-trash"></i>Delete</a>
                  </div>
               </div>
            </div>
            </div>
          
        })}
        </div>  
        <button href="" className="btn btn-danger btn-block" onClick={this.submitLogout}>Logout</button>
    </div>
      
    ) 
  }
}


export default connect(
  null,
  dispatch => ({
    setTrip: setTripAction(dispatch)
  })
)(Profile)
