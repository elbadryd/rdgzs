import axios from 'axios';
import { connect } from 'react-redux';
import { setTripAction } from '../store/actions/tripactions.js';
import { endianness } from 'os';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      tripData: [],

    };
    this.seeTrip = this.seeTrip.bind(this);
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
      console.log('pois?', route.data)
      console.log('tripData', this.state.tripData[index])
      const line = route.data.line.geometry.coordinates
      console.log(line, waypoints, "matchy")
      let orderedWaypoints = [];
      line.map((point) => {
        let pLng = point[0];
        let pLat = point[1];
        waypoints.map((w) => {
          let coords = w.long_lat.split(',')
          let wLng = Number(coords[0]);
          let wLat = Number(coords[1]);
          if (pLat < wLat + .02 && pLat > wLat - .02 && pLng < wLng +.02 && pLng > wLng - .02) {
            orderedWaypoints.push({ name: w.name, lat: wLat, lng: wLng })
          }
        });
      });
      console.log('oways', orderedWaypoints);
      // this.props.setTrip({
      //   origin: originCoords,
      //   destination: destinationCoords,
      //   pois: response.data.pois,
      //   line, 
      //   originName,
      //   destinationName,
      //   waypoints: orderedWaypoints, 
      //   tripId,
      // })
    })
  })
    .catch(err => {
      console.log(err)
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
    return (
      <div>
        {this.state.tripData.map((trip, i) =>{

          return <div key={i} className="card" style={{width: '18rem'}}>
            <img className="card-img-top" src="/static/mountain.png" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{trip.trip_name}</h5>
                <p className="card-text"></p>
                <a onClick={this.seeTrip.bind(this, i)} className="btn btn-primary">See Trip</a>
              <a onClick={this.removeTrip.bind(this, i)} className="btn btn-primary">Remove Trip</a>
              </div>
</div>
        })}

        <a href="" className="btn btn-danger" onClick={this.submitLogout}>Logout</a>

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
