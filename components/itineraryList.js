import Router from 'next/router'
import Axios from 'axios'
const dotenv = require('dotenv').config();



class ItineraryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: []
    }
    this.getDirections = this.getDirections.bind(this);
    this.removeStop = this.removeStop.bind(this);
  }


  getDirections(){
    const { origin, dest } = this.props;
    let directionsString = ''
    this.props.waypoints.forEach(point => {
      directionsString += `${point.lat},${point.lng}/`
    })
    Router.push(`https://www.google.com/maps/dir/${origin}/${directionsString}${dest}`);
  };

  removeStop(stop) {
    Axios.post('/stop/itinerary', {
      tripId: this.props.tripId,
      stop,
    })
  }

  render() {
    return (
      <div className="container_fluid">

        <div className="row">
          <div className="col-md">
            {this.props.origin}
          </div>
        </div>

        <div className="row">
           {this.props.waypoints.map((stop, index)=>{
            return <div className="item col-md" key={stop.name}> {index + 1}
               {stop.name}
               <button type="button" className="col-md btn btn-danger btn-sm" onClick={this.removeStop.bind(this, stop)}>x</button>
            </div>
            })}
        </div>

          <div>
            {this.props.dest}
          </div>

          <button type="button" className="btn btn-success btn-block" onClick={this.getDirections} >Get Directions</button>
      </div>
    )
  }
}

export default ItineraryList
