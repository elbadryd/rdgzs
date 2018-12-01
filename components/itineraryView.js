import ItineraryList from './itineraryList.js';
import { connect } from 'react-redux';

export default connect(
  state => ({
    dest: state.destinationName,
    origin: state.originName,
    waypoints: state.waypoints,
    tripId: state.tripId,
  }),
  null
)(({ dest, origin, waypoints, tripId }) => {
  return (
    <div>
      <div>Your Upcoming Trip</div>
      <ItineraryList tripId={tripId} dest={dest} origin={origin} waypoints={waypoints} />

    </div>
  )
})