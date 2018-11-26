import ItineraryItem from './itineraryItem';
import Axios from 'axios';
const dotenv = require('dotenv').config();

let fakeItinerary = {
  origin: 'new orleans',
  destination: 'kentucky',
  waypoints: [ {
    name: 'name',
    coords: 2342,
  }
  ]
  }
class ItineraryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: []
    }
  }

  render() {
    return (
      <div>
      <div>{this.props.origin}</div>
   <div> {this.props.waypoints.map(stop=>{
      return <div className="item" key={stop.name}>1<ItineraryItem name={stop.name}/></div>
    })}
      </div>
        <div>{this.props.dest}</div>
      </div>
    )
  }
}

export default ItineraryList
