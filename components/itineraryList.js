import Axios from 'axios';
import Router from 'next/router'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';
import { setLineAction, removeWaypointAction } from '../store/actions/tripactions.js'
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
    const { originCoords, destinationCoords, redrawLine } = this.props;
    let waypoints = this.props.waypoints.filter(point => point.name !== stop.name );
    let queryString = [`${originCoords.lng},${originCoords.lat};`];
    Axios.post('/stop/itinerary', {
      tripId: this.props.tripId,
      stop,
    })
    waypoints.forEach(point => {
      queryString[0] += `${point.lng},${point.lat};`
    });
    queryString[0] += `${destinationCoords.lng},${destinationCoords.lat}`;
    Axios.get('/redraw', {
      params: queryString[0]
    }).then((resp) => {
      let line = resp.data.trips[0].geometry.coordinates;
      this.props.setLine({
        line
      })
      this.props.removeWaypoint({
      waypoint: stop.name
    })
    }).catch(err => console.log(err));   
  }

  render() {
    return (
      // <table className="table table-dark">
            
      //   <thead>
      //     <tr>
      //       <th scope="col">{this.props.origin}</th>
      //     </tr>
      //   </thead>
      //   <tbody>
      //     <tr>
      //      {this.props.waypoints.map((stop, index)=>{
      //         return <div><th scope="row">{index + 1}</th>
      //           <td>{stop.name}</td>
      //          <td><Button type="button" className="col-md btn btn-danger btn-sm" onClick={this.removeStop.bind(this, stop)}>x</Button>
      //       </td></div>
      //       })}
      //     </tr><div>
      //       {this.props.dest}
      //     </div>
      //     <div style={{padding: '10px'}}>
      //     <Button type="button" className="btn btn-success btn-block" onClick={this.getDirections} >Get Directions</utton>
      //     </div>
      //     </tbody>
      // </table>
      <div>
      <div className="jumbotron-fluid">
        <div className="list-group">
          <li className="list-group-item m-1 ml-3 mr-3">{this.props.origin}</li>
          {this.props.waypoints.map((stop, index) => {
              return <li className="list-group-item m-1 ml-3 mr-3 shadow bg-white" >{stop.name}<button className="btn btn-sm btn-danger ml-1" onClick={this.removeStop.bind(this, stop)}><i className="fa fa-trash">x</i></button></li>
            // <button className="btn btn-danger"><i className="fa fa-trash"></i></button>
          })}
            <li className="list-group-item m-1 ml-3 mr-3">{this.props.dest}</li>
          <button className="btn btn-success btn-block m-2 mx-auto"  onClick={this.getDirections}>Get Directions</button>
        </div>
      </div>
    </div>
    )
  }
}

export default connect(
  null,
  dispatch => ({
    removeWaypoint: removeWaypointAction(dispatch),
    setLine: setLineAction(dispatch)
  })
)(ItineraryList)