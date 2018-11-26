import { TRIP_TYPES } from './types';

export const setOriginAction = dispatch => origin => dispatch({
  type: TRIP_TYPES.SET_ORIGIN,
  origin,
});

export const setDestinationAction = dispatch => destination => dispatch({
  type: TRIP_TYPES.SET_DESTINATION,
  destination,
});

export const setWaypointsAction = dispatch => waypoint => dispatch({
  type: TRIP_TYPES.SET_WAYPOINTS,
  waypoint,
});

export const setLineAction = dispatch => line => dispatch({
  type: TRIP_TYPES.SET_LINE,
  line,
});

export const setPoisAction = dispatch => pois => dispatch({
  type: TRIP_TYPES.SET_POIS,
  pois,
});

export const setTripAction = dispatch => trip => dispatch({
  type: TRIP_TYPES.SET_TRIP,
  trip,
});
