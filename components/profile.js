import axios from 'axios';
import { connect } from 'react-redux';
import { setTripAction } from '../store/actions/tripactions.js';
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

removeTrip(index) {
  const id = this.state.tripData[index].id
  console.log(id, this.state.tripData, 'tripData')
    axios.delete('/trip', { params: id })
      .then(response=>{
        if (response.data === "Accepted") {
          this.setState({
            tripData: this.state.tripData.filter(trip=> trip.id !== id)
          })
        } else {
          console.log(response);
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
                <a onClick={this.seeTrip} className="btn btn-primary">See Trip</a>
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
