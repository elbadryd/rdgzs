import ItineraryList from './itineraryList.js';
import { connect } from 'react-redux';

export default connect(
  state => ({
    dest: state.destinationName,
    origin: state.originName,
    waypoints: state.waypoints
  }),
  null
)(({ dest, origin, waypoints }) => {
  return (
    <div>
      <div>Your Upcoming Trip</div>
      <ItineraryList dest={dest} origin={origin} waypoints={waypoints} />

    </div>
  )
})