import axios from 'axios';
import Router from 'next/router'
import MapboxAutocomplete from 'react-mapbox-autocomplete';
const dotenv = require('dotenv').config();
import { connect } from 'react-redux';
import store from '../store'
// import 'react-mapbox-autocomplete/index.css';
import '../styles/index.css'
import { callbackify } from 'util';
import { setTripAction } from '../store/actions/tripactions.js';
import { createReadStream } from 'fs';
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
    console.log(tripId);
    axios.get('/createRoute', { params: { 
      originCoords: originCoords,
      destCoords: destinationCoords,
    } })
      .then(response => {
        this.props.setTrip({
          originCoords,
          destinationCoords,
          pois: response.data.pois,
          line: response.data.line.geometry.coordinates,
          originName,
          destinationName,
          waypoints: [], 
          tripId,
        })
      })
      .catch(err => {
        console.log(err);
        alert('there was an error processing your request')
      })
    }
  

  handleSubmit() {
    const { userID, originName, destinationName, originCoords, destinationCoords } = this.state;
    if (this.state.origin === null || this.state.destination === null) {
      alert('please enter an origin and destination')
    } else {
    let splitOrigin = originName.split(',');
    let splitDest = destinationName.split(',');
    let tripName = splitOrigin[0] + ' to ' + splitDest[0];
    if (this.state.userID) {
      axios.post('/trip', { userID, originCoords, destinationCoords, tripName, originName, destinationName })
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
      <div className="search">
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
        <input id="button" type="submit" value="Submit" onClick={this.handleSubmit} />
        {/* <style jsx>{`
        .react-mapbox-ac-menu {
  width: auto;
  position: absolute;
  z-index: 9999;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-top: -1.3rem;
}

.react-mapbox-ac-input {
  margin-bottom: 1.5rem;
}

.react-mapbox-ac-suggestion {
  font-size: 14px;
  cursor: pointer;
  padding: .5rem 1.5rem;
}

.react-mapbox-ac-suggestion:hover {
  background-color: #58a;
}
        `}
        </style> */}
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
