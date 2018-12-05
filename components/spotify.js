import { connect } from "react-redux";
const turf = require('@turf/helpers');
const along = require('@turf/along');

class Spotify extends React.Component {
  constructor(props){
    super(props);
      this.state={
      }
  
  getCities(){
  }
  getQueryPoints(){
  }
  
  }
  render(){
    return(

    )
  }
}
export default connect(
  state=>({
    origin: state.origin,
    destination: state.destination,
    waypoints: state.waypoints,
  })
)(Spotify)
