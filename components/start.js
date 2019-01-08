import axios from 'axios';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
const dotenv = require('dotenv').config();
import { connect } from 'react-redux';
import '../styles/index.css'
import { setTripAction } from '../store/actions/tripactions.js';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      originCoords: null,
      destinationCoords: null,
      originName: null,
      destinationName: null,
      waypoints: [],
      polyline: null,
      points: null,
      userID: null,
      tripId: null,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._originSelect = this._originSelect.bind(this); 
    this._destinationSelect = this._destinationSelect.bind(this);
    this.updatePoints = this.updatePoints.bind(this); 
  }

  
  componentDidMount() {
    axios.get('/login')
    .then(response => {
      if (response.data.user) {
      this.setState({ userID: response.data.user.id })
     } else {
       this.setState({ userID: null })
     }
    })
  }


  handleChange() {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  _originSelect(result, lat, lng, text) {
    this.setState({originCoords :{lat: lat, lng: lng},
      originName: result,
    })
  }

  _destinationSelect(result, lat, lng, text) {
    this.setState({ destinationCoords: { lat: lat, lng: lng },
      destinationName: result,
     })
  }
  updatePoints(obj){
    this.setState({
      polyline: obj.data.line,
      points: obj.data.pois
    })
  }

  createRoute() {
    const { originCoords, destinationCoords, originName, destinationName, tripId } = this.state;
    axios.get('/createRoute', { 
      params: { 
        qstring: `${originCoords.lng},${originCoords.lat};${destinationCoords.lng},${destinationCoords.lat}`
    } })
      .then(response => {
        this.props.setTrip({
          origin: originCoords,
          destination: destinationCoords,
          pois: response.data.pois,
          line: response.data.line.geometry.coordinates,
          originName,
          destinationName,
          waypoints: [], 
          tripId,
          distance: response.data.distance,
        })
      })
      .catch(err => {
        console.log(err);
        Alert.error('<strong>There was an error creating your routes</strong>', {
          position: 'bottom',
          onShow: function () {
            setTimeout(Alert.closeAll, 2000)
          },
          beep: false,
          html: true,
          timeout: 'none',
          offset: 100
        });
      })
    }
  

  handleSubmit() {
    const { userID, originName, destinationName, originCoords, destinationCoords } = this.state;
    if (originCoords === null || destinationCoords === null) {
      Alert.error('<strong>Please enter an origin and destination</strong>', {
        position: 'bottom',
        onShow: function () {
          setTimeout(Alert.closeAll, 2000)
        },
        beep: false,
        html: true,
        timeout: 'none',
        offset: 100
      });
    } else {
    let splitOrigin = originName.split(',');
    let splitDest = destinationName.split(',');
    let tripName = splitOrigin[0] + ' to ' + splitDest[0];
    if (this.state.userID) {
      axios.post('/trip', { originCoords, destinationCoords, tripName, originName, destinationName })
      .then((dbres) => {
       this.setState({tripId: dbres.data.id}, () => {
         this.createRoute();
       });
      })
    } else {
      this.createRoute();
      
    }
  }
}

  render() {
    return (
      <div>
      <img className="logo" src="/static/croppedDog.png"></img>
      <div className="search jumbotron">
        Origin
        <MapboxAutocomplete
          country='us'
          publicKey={process.env.MAPBOX_API_KEY}
          inputClass='form-control search'
          onSuggestionSelect={this._originSelect}
          country='us'
          resetSearch={false}
        />
        Destination
        <MapboxAutocomplete
          country='us'
          publicKey={process.env.MAPBOX_API_KEY}
          inputClass='form-control search'
          onSuggestionSelect={this._destinationSelect}
          country='us'
          resetSearch={false}
        />
        <button type="button" className="btn btn-success btn-block" onClick={this.handleSubmit} >Let's Go!</button>
        <Alert stack={{ limit: 1 }} html={true} />
      </div>
      </div>
      );
    }  
  }
  
  export default connect(
    null, 
    dispatch => ({
      setTrip: setTripAction(dispatch)
    })
  )(Start)
