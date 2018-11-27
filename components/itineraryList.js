import ItineraryItem from './itineraryItem';
import Axios from 'axios';
import Router from 'next/router'
const dotenv = require('dotenv').config();


class ItineraryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: []
    }
    this.getDirections = this.getDirections.bind(this);
  }

  getDirections(){
    const { origin, dest } = this.props;
    let directionsString = ''
    this.props.waypoints.forEach(point => {
      directionsString += `${point.lat},${point.lng}/`
    })
    Router.push(`https://www.google.com/maps/dir/${origin}/${directionsString}/${dest}`);
  };

  render() {
    return (
      <div>
      <div>{this.props.origin}</div>
   <div> {this.props.waypoints.map((stop, index)=>{
      return <div className="item" key={stop.name}>{index}<ItineraryItem name={stop.name}/></div>
    })}
      </div>
        <div>{this.props.dest}</div>
        <button onClick={this.getDirections}>Get Directions</button>
      </div>
    )
  }
}

export default ItineraryList
