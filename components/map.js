import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

const dotenv = require('dotenv').config();
const Map = ReactMapboxGl({ accessToken: process.env.MAPBOX_API_KEY })

class DynamicMap extends React.Component {
  

  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}>
        <Layer
          type="symbol"
          id="marker"
          layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer>
      </Map>
    )
  }
}
export default DynamicMap;
