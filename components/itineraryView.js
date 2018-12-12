import ItineraryList from './itineraryList.js';
import { connect } from 'react-redux';

export default connect(
  state => ({
    dest: state.destinationName,
    origin: state.originName,
    waypoints: state.waypoints,
    tripId: state.tripId,
    originCoords: state.origin,
    destinationCoords: state.destination,
  }),
  null
)(({ dest, origin, waypoints, tripId, originCoords, destinationCoords }) => {
  return (
    <div>
      <div className="mx-auto">Your Upcoming Trip</div>
      <ItineraryList tripId={tripId} dest={dest} origin={origin}
      waypoints={waypoints} originCoords={originCoords} destinationCoords={destinationCoords}/>

    </div>
  )
})