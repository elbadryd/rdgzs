import ReactMapboxGl, { Layer, Feature, Marker, Popup } from 'react-mapbox-gl';

const dotenv = require('dotenv').config();
const Map = ReactMapboxGl({ accessToken: process.env.MAPBOX_API_KEY })
let geo = [{ lat: 29.9565436, lng: -90.1044093 },
{ lat: 29.9527463, lng: -90.07071909999999 },
{ lat: 29.8944563, lng: -90.01822729999999 },
{ lat: 29.93785, lng: -90.07592299999999 },
{ lat: 29.95149, lng: -90.07025999999999 },
{ lat: 29.8775019, lng: -90.04843249999999 },
{ lat: 30.0063073, lng: -90.2519013 },
{ lat: 29.9970293, lng: -90.161163 },
{ lat: 29.990542, lng: -90.05786959999999 },
{ lat: 29.8532921, lng: -90.10894599999999 },
{ lat: 29.9488105, lng: -90.2324234 },
{ lat: 29.9201635, lng: -90.03392319999999 },
{ lat: 29.9076809, lng: -90.1600689 },
{ lat: 29.945432, lng: -90.03711960000001 },
{ lat: 29.9344245, lng: -90.0806708 },
{ lat: 29.9979549, lng: -90.1800343 },
{ lat: 29.9242826, lng: -90.01818469999999 },
{ lat: 29.962082, lng: -90.02080590000001 },
{ lat: 29.8910133, lng: -90.05855489999999 },
{ lat: 30.0099729, lng: -90.26704439999999 }];
class DynamicMap extends React.Component {
  constructor() {
    super();
    this.state = {}
  }


  togglePopUp(){

  }
  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        center={[-90.1044093, 29.9565436]}
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        >
        <Layer
          type="symbol"
          layout={{ "icon-image": "harbor-15" }}
          >
          {geo.map(coord=>{
            return  <Feature coordinates={[coord.lng, coord.lat]}
                              onClick={()=>{
                                console.log('clicked')
                              }}
            />
          })}
        </Layer>
        
      </Map>
    )
  }
}
export default DynamicMap;
