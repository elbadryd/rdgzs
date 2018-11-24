import ItineraryList  from '../../components/itineraryList.js';
import { connect } from 'react-redux';

export default connect(
    state => ({
        dest: state.destinationName,
        origin: state.originName,
    }),
    null
)(({ dest, origin }) => {
    return (
        <div>
            <div>Your Upcoming Trip</div>
            <ItineraryList dest={dest} origin={origin} />

        </div>
    )
})