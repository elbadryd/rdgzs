import axios from 'axios';
import Router from 'next/router'
import MapboxAutocomplete from 'react-mapbox-autocomplete';
const dotenv = require('dotenv').config();
 // import { connect } from "react-redux";

// import 'react-mapbox-autocomplete/index.css';
import '../styles/index.css'
class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: null,
      destination: null,
      waypoints: [],
      details: null,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this._originSelect = this._originSelect.bind(this); 
    this._destinationSelect = this._destinationSelect.bind(this); 

  }

  handleChange() {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  _originSelect(result, lat, lng, text) {
    this.setState({origin :{lat: lat, lng: lng}})
  }

  _destinationSelect(result, lat, lng, text) {
    this.setState({ destinatioon: { lat: lat, lng: lng } })
  }

  // mapStateToProps(state){
  //   return {
  //     details: this.state.details
  //   }
  // }

  handleSubmit(){
  //   if (this.state.origin === null || this.state.destination === null) {
  //     alert('please enter an origin and destination')
  //   } else {
  //   let points = {
  //     originCoords: this.state.origin,
  //     destCoords: this.state.destination
  //   }
  //   axios.get('/createRoute', {params: points})
  //   .then(response=>{
  //     this.setState({ details: response.body })
  //     Router.push('/trip/trip');
  //   })
  //   .catch(err=>{
  //     console.log(err);
  //     alert('there was an error processing your request')
  //   })
  // }
  Router.push('/')
}


  render() {
    return (
      <div className="search">
        {/* <input type="text" name="origin" onChange={this.handleChange} placeholder="Origin"/>
        <input type="text" name="destination" onChange={this.handleChange} placeholder="Destination" /> */}
        Origin
        <MapboxAutocomplete
          publicKey={process.env.MAPBOX_API_KEY}
          inputClass='form-control search'
          onSuggestionSelect={this._originSelect}
          country='us'
          resetSearch={false}
        />
        Destination
        <MapboxAutocomplete
          publicKey={process.env.MAPBOX_API_KEY}
          inputClass='form-control search'
          onSuggestionSelect={this._destinationSelect}
          country='us'
          resetSearch={false}
        />
        <style jsx>{`
        body {
          color: yellow
        }
        `}
        
        </style>
        <input id="button" type="submit" value="Submit" onClick={this.handleSubmit} />

      </div>
    );
  }
}


export default Start

