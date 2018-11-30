import axios from 'axios';
import { connect } from 'react-redux';
import { setTripAction } from '../store/actions/tripactions.js';



const trips = [{
  dest: "San Francisco, California, United States",
  origin: "Los Angeles, California, United States",
waypoints: [
{ lng: -118.88610363006592, lat: 35.432001625506366, name: "California Living Museum (CALM)" },
{ lng: -120.29498392493531, lat: 35.72639233024035, name: "James Dean Memorial Site" },
{ lng: -121.63295580786168, lat: 37.067567414421674, name: "CordeValle" },
{ lng: -120.57794451713562, lat: 37.36472558325653, name: "Castle Air Museum" },
]
},{
  dest: "Cincinnati, Ohio, United States",
origin: "New York, New York, United States",
waypoints: [
 { lng: -75.73760611585303, lat: 40.86324488683987, name: "Lehigh Gorge Scenic Railway" },
{ lng: -77.74483647659362, lat: 39.47396905935212, name: "Antietam National Battlefield" },
 { lng: -80.01221664761947, lat: 40.45703001820447, name: "Mattress Factory Museum" },
{ lng: -83.00652412043002, lat: 39.37572385209102, name: "Hopewell Culture National Historical Park" }
]
}
];
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null
    };
    this.seeTrip = this.seeTrip.bind(this);
  }

componentDidMount() {
  axios.get('/login')
  .then(res=>{
    console.log(res)
  })
  .catch(err=>{
    console.log
  })
  // const { userId } = this.props;
  //   axios.get('/trip', { userId })
  //   .then(response=>{
  //     console.log(response)
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //   })
}

seeTrip(){
  axios.get('/stop', { tripId })
    .then(response=>{
      console.log(response)
    })
    .catch(err => {
      console.log(err)
    })
    // const { originName, destinationName, originCoords, destinationCoords, waypoints } = this.state;
  
    //   let points = {
    //     originCoords: originCoords,
    //     destCoords: destinationCoords
    //   }
    //   axios.get('/createRoute', { params: points })
    //     .then(response => {
    //       console.log(response)
    //       this.props.setTrip({
    //         originCoords,
    //         destinationCoords,
    //         pois: response.data.pois,
    //         line: response.data.line.geometry.coordinates,
    //         originName,
    //         destinationName,
    //         waypoints,
    //         //waypoints should show up on map
    //       })
    //       // set trip ID 
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       alert('there was an error processing your request')
    //     })
  }

removeTrip() {
    axios.delete('/trip', { tripId })
      .then(response=>{
        console.log(response)
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
        {trips.map((trip, i) =>{
          let splitOrigin = trip.origin.split(',');
          let splitDest = trip.dest.split(',');
          return <div key={i} className="card" style={{width: '18rem'}}>
            <img className="card-img-top" src="/static/mountain.png" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">{splitOrigin[0]} to {splitDest[0]}</h5>
                <p className="card-text"></p>
                <a onClick={this.seeTrip} className="btn btn-primary">See Trip</a>
              <a href={this.removeTrip} className="btn btn-primary">Remove Trip</a>
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
