import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const tripState = {
  origin: null,
  destination: null,
  waypoints: [],
  line: null,
  pois: [],
  originName: null,
  destinationName: null,
};
// const store = createStore(
//   reducers,
//   {
//     origin: null,
//     destination: null,
//     waypoints: [],
//     line: null,
//     pois: [],
//   },
//   /* eslint-disable no-underscore-dangle */
//   typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );

// export default store;
export function initializeStore(initialState = tripState) {
  return createStore(
    reducers,
    // initialState,
    // typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}
