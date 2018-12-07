import axios from 'axios';
import { connect } from 'react-redux';
import { setTripAction } from '../store/actions/tripactions.js'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        email: null,
        password: null,
        loggedIn: false,
    };
    this.signUp = this.signUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.saveTrip = this.saveTrip.bind(this);
  }



  handleChange() {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  signUp() {
    axios.post('/signup', {
      email: this.state.email,
      password: this.state.password,
    }).then((response) => {
      if (response.data === 'hi') {
        this.submitLogin();
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  submitLogin() {
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password,
    }).then((res) => {
      this.props.setLogin()
      })
      .catch((err) => {
        //add some not logged in action
        alert('nope');
    }).then(()=>{
      if (this.props.originName) {
        this.saveTrip();
      }
    })
  }

  saveTrip(){
    const { originCoords, destinationCoords, originName, destinationName, setTrip, waypoints } = this.props;
    const tripName = `${originName.split(',')[0]} to ${destinationName.split(',')[0]}`
    axios.post('/trip', { originCoords, destinationCoords, tripName, originName, destinationName })
    .then(response=>{
      setTrip({
        tripId: response.data.id
      })
      let funcs = waypoints.map(waypoint=>{
        return axios.post('/stop', {
          stop: { lng: waypoint.lng,
                  lat: waypoint.lat,
                  name: waypoint.name,
                  tripId: response.data.id
                 }
        })
      })
      axios.all(funcs)
      .then(response=>{
        // console.log(response)
      })
      .catch(err=>{
        console.log(err)
      })
    })
    .catch(err=>{
      console.log(err)
    })
  }

  render() {
    return (
      <div className="jumbotron">
      <div className="container" >
        <div className="input-group mb-3">
          <input name="email" className="form-control" onChange={this.handleChange} aria-label="Username" aria-describedby="basic-addon2" />
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Email</span>
          </div>
      </div>

          <div className="input-group mb-3">
          <input name="password" type="password" className="form-control" onChange={this.handleChange} aria-label="Recipient's username" aria-describedby="basic-addon2" />
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Password</span>
              </div>
          </div>
          <button type="button" className="btn btn-primary btn-block" onClick={this.submitLogin}>Login</button>
          <button type="button" className="btn btn-info btn-block" onClick={this.signUp}>SignUp</button>
      </div>
      </div>

      // <div className="container_fluid">
      //   <div className="row">
      //     <div className="col-md">
      //       <span>Email:</span>
      //       <input name="email" onChange={this.handleChange}></input>
      //     </div>
      //   </div>
      //   <div className="row">
      //     <div className="item col-md" >
      //       <span>Password:</span>
      //       <input name="password" type="password" onChange={this.handleChange}></input>
      //     </div>
      //   </div>
      //   <button type="button" className="btn btn-success btn-block" onClick={this.submitLogin}>Login</button>
      //   <button type="button" className="btn btn-success btn-block" onClick={this.signUp}>SignUp</button>
      // </div>
    )
  }
}


export default connect(
  state => ({
    originName: state.originName,
    destinationName: state.destinationName,
    originCoords: state.origin,
    destinationCoords: state.destination,
    waypoints: state.waypoints,
  })
  , dispatch => ({
    setTrip: setTripAction(dispatch)
  })
)(Login);
