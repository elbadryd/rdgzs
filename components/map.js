import ReactMapboxGl, { Layer, Feature, Marker, Popup } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl'
import Head from 'next/head'

const dotenv = require('dotenv').config();
mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

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
  constructor(props) {
    super(props);
    this.state = {
      active: true
    }
  }

componentDidMount(){
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-90.1044093, 29.9565436],
    zoom: 12.5
  });
  var popup = new mapboxgl.Popup({ offset: 25 }).setText('I am a popup');
  geo.forEach((marker)=>{
    new mapboxgl.Marker()
      .setLngLat([marker.lng, marker.lat])
      .setPopup(popup) // sets a popup on this marker
      .addTo(map);
  });
}  

  render() {
    return (
    <div>
      <Head>
        <title> Welcome to your trip</title>
        <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link href='https://api.mapbox.com/mapbox-assembly/mbx/v0.18.0/assembly.min.css' rel='stylesheet'/>
              <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.39.1/mapbox-gl.css' rel='stylesheet' />
         </Head>
        <div id="map" className="absolute top right left bottom" />
      </div>
    )
  }
}
export default DynamicMap;
