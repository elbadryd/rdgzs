import ReactMapboxGl, { Layer, Feature, Marker, Popup } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import Head from 'next/head';
import Link from 'next/link';
// import start from '../pages/start.js'

import { timingSafeEqual } from 'crypto';

const dotenv = require('dotenv').config();
mapboxgl.accessToken = process.env.MAPBOX_API_KEY;

const Map = ReactMapboxGl({ accessToken: process.env.MAPBOX_API_KEY })

let results = {
  "line": {
    "type": "Feature",
      "properties": { },
    "geometry": {
      "type": "LineString",
        "coordinates": [
          [
            -90.070199,
            29.949584
          ],
          [
            -90.043375,
            29.998332
          ],
          [
            -89.935079,
            30.062604
          ],
          [
            -89.771034,
            30.233472
          ],
          [
            -89.739073,
            30.303942
          ],
          [
            -89.666266,
            30.297677
          ],
          [
            -89.302089,
            30.400059
          ],
          [
            -88.975732,
            30.460358
          ],
          [
            -88.921345,
            30.446997
          ],
          [
            -88.783478,
            30.458865
          ],
          [
            -88.687026,
            30.431585
          ],
          [
            -88.43321,
            30.46113
          ],
          [
            -88.21976,
            30.547086
          ],
          [
            -88.028348,
            30.691913
          ],
          [
            -87.926561,
            30.655594
          ],
          [
            -87.845306,
            30.662857
          ],
          [
            -87.607748,
            30.627676
          ],
          [
            -87.517392,
            30.58112
          ],
          [
            -87.376191,
            30.56229
          ],
          [
            -87.279363,
            30.504317
          ],
          [
            -87.171003,
            30.502097
          ],
          [
            -87.124587,
            30.533309
          ],
          [
            -87.087304,
            30.532986
          ],
          [
            -87.079326,
            30.477701
          ],
          [
            -87.100415,
            30.440674
          ],
          [
            -87.066783,
            30.389751
          ],
          [
            -86.732578,
            30.41199
          ],
          [
            -86.495618,
            30.393462
          ]
        ]
    }
  },
  "pois": [
    {
      "category": 0,
      "name": "The Garden District",
      "lat": 29.927196707111715,
      "lng": -90.0942098979419,
      "img": "https://fastly.4sqi.net/img/general/250x250/5439240_RxDtj9MxB8sr5oIA63_G4sAGAqO4q0KACv9Nb3bIYXw.jpg"
    },
    {
      "category": 0,
      "name": "Louis Armstrong Park",
      "lat": 29.96279836785037,
      "lng": -90.06795644760132,
      "img": "https://fastly.4sqi.net/img/general/250x250/34199198_jJ6Pm8SDr2T7Qrh9_E6Iisc3Ud6zT7ulGRvxbGASDNw.jpg"
    },
    {
      "category": 0,
      "name": "Fort Pickens",
      "lat": 30.3281979571988,
      "lng": -87.29009578683849,
      "img": "https://fastly.4sqi.net/img/general/250x250/13653025_3b-fMff_1lQfV209EXiKMJXIp80YJf3IhEUH8H3Qa5A.jpg"
    },
    {
      "category": 0,
      "name": "De Soto National Forest",
      "lat": 30.531761,
      "lng": -89.109474,
      "img": "https://fastly.4sqi.net/img/general/250x250/53036756_lGhoKjznCt7XEySiKwOdnBDwqrZFgi-7lL1QfhKCTqU.jpg"
    },
    {
      "category": 1,
      "name": "Cochon Butcher",
      "lat": 29.942191705823742,
      "lng": -90.06711959838867,
      "img": "https://fastly.4sqi.net/img/general/250x250/17903021_Xzu9lWhpjKbUvMXBAkUwGxyV7x0Dbjdx9V9dmbRL3nQ.jpg"
    },
    {
      "category": 1,
      "name": "Brennan's",
      "lat": 29.95599,
      "lng": -90.06662,
      "img": "https://fastly.4sqi.net/img/general/250x250/14155512_8re92L_jLiJU9DVnZM65jlOGmgepZRzuY5Zq_NPcESI.jpg"
    },
    {
      "category": 1,
      "name": "Chicken Salad Chick",
      "lat": 30.6415925,
      "lng": -88.1916667,
      "img": "https://fastly.4sqi.net/img/general/250x250/3118562_7fGf__HuyeaHKQluoRANm2XihTH7HmRojftXZ1yj9PU.jpg"
    },
    {
      "category": 1,
      "name": "La Cocina",
      "lat": 30.675577114098385,
      "lng": -88.17262353300663,
      "img": "https://fastly.4sqi.net/img/general/250x250/LR25EI5N0ICZJHHFRFSXZUJWFMEFGVZH440VRTFURDR1GL5R.jpg"
    },
    {
      "category": 2,
      "name": "The Roosevelt New Orleans",
      "lat": 29.954323358064215,
      "lng": -90.07219433784485,
      "img": "https://fastly.4sqi.net/img/general/250x250/70105151_6kenRlvVMThEIAK5gYPzPWCjASLN3JrK8cTVeG5ZBp8.jpg"
    },
    {
      "category": 2,
      "name": "Catahoula Hotel & Bar",
      "lat": 29.95187972248811,
      "lng": -90.07326137213107,
      "img": "https://fastly.4sqi.net/img/general/250x250/1511_v64pfPzWf6IBeB_a041N_L6Rqz6JADKHeu2ldEAYjgA.jpg"
    },
    {
      "category": 2,
      "name": "Hampton Inn & Suites Mobile Downtown",
      "lat": 30.691049673608763,
      "lng": -88.04075139830982,
      "img": "https://fastly.4sqi.net/img/general/250x250/87388367_R_4C8abKOElSyj5faKF8TUlILQIUDDWOiQ2UnQ4A4Bo.jpg"
    },
    {
      "category": 2,
      "name": "The Fairhope Inn and Restaurant",
      "lat": 30.521186553611518,
      "lng": -87.9046322932483,
      "img": "https://fastly.4sqi.net/img/general/250x250/1K1NMu9I_Xs-K-loxMFWKuKu6j01Cx1slsB3grIMOMg.jpg"
    },
    {
      "category": 3,
      "name": "Jackson Square",
      "lat": 29.957451318025385,
      "lng": -90.06293803453445,
      "img": "https://fastly.4sqi.net/img/general/250x250/26168041_sPwOvDDH-zJEf8hWx3HRDTQ46UpETrL30iCeAENd1_E.jpg"
    },
    {
      "category": 3,
      "name": "The French Quarter",
      "lat": 29.958479018651374,
      "lng": -90.06518590632706,
      "img": "https://fastly.4sqi.net/img/general/250x250/7269994_msGbOMHN2pGoXby3srR8mdZTzUQNVDOO2HORM1IF6qo.jpg"
    },
    {
      "category": 3,
      "name": "Fort Morgan State Historic Site",
      "lat": 30.229552685387752,
      "lng": -88.02233338621082,
      "img": "https://fastly.4sqi.net/img/general/250x250/ia7MiFOVElEeD4wNQJRAyNcaS8A6wVI7VipP9CophQA.jpg"
    },
    {
      "category": 3,
      "name": "Fort Gaines",
      "lat": 30.24839093066276,
      "lng": -88.0755043029785,
      "img": "https://fastly.4sqi.net/img/general/250x250/10977693_HXREFGA9Yf-fsfznxY66wtCff45SjQ4nRuoCi0-Cjqw.jpg"
    },
    {
      "category": 4,
      "name": "The National WWII Museum",
      "lat": 29.942937,
      "lng": -90.070118,
      "img": "https://fastly.4sqi.net/img/general/250x250/44716180_-KV3ClbSSPXfJgUISrK1512mcmjwTeEvxJHpponTepY.jpg"
    },
    {
      "category": 4,
      "name": "Historic New Orleans Collection",
      "lat": 29.95702963309191,
      "lng": -90.06572039533516,
      "img": "https://fastly.4sqi.net/img/general/250x250/19357134_Et1_eckc-li7A6qH4kXZtRHoMp80cX2ab7dJiQU1tsQ.jpg"
    },
    {
      "category": 4,
      "name": "GulfQuest National Maritime Museum of the Gulf of Mexico",
      "lat": 30.688485468077182,
      "lng": -88.03754534572363,
      "img": "https://fastly.4sqi.net/img/general/250x250/354125_IKh7_T8fxpc2n3xMfSURCRWnyR3osr67CvmQmdijM_c.jpg"
    },
    {
      "category": 4,
      "name": "USS Alabama Battleship Memorial Park",
      "lat": 30.68180538516989,
      "lng": -88.01443576812744,
      "img": "https://fastly.4sqi.net/img/general/250x250/BNULMSFQZNDTKNNSTELPDB5X0FTAO2MDFMRV5NQ0F34REC2V.jpg"
    }
  ]
}

class DynamicMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.addToTrip = this.addToTrip.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

componentDidMount(){
  let coordinates = results.line.geometry.coordinates
  let centerLng = coordinates[coordinates.length / 2][0]
  let centerLat = coordinates[coordinates.length / 2][1]
  var bounds = coordinates.reduce((bounds, coord)=>{
    return bounds.extend(coord);
  }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [centerLng, centerLat],
  });
  map.on('load', function () {
    map.addLayer({
      "id": "route",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": results.line.geometry.coordinates
          }
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#E87111",
        "line-width": 6
      }
    })
    .fitBounds(bounds, {
      padding: 20
    });
  });
  // var popup = new mapboxgl.Popup({ offset: 25 }).setText(result.name);
  results.pois.forEach((result)=>{
    new mapboxgl.Marker()
      .setLngLat([result.lng, result.lat])
      .setPopup(new mapboxgl.Popup({ offset: 25 })
      // .setText(`Name: ${result.name} "add to trip"`))
      .setHTML(`<img src=${result.img} height="150px" width="150px"><br>
      <strong>${result.name}</strong>
      <div onClick=${()=>this.handleClick(result.lng, result.lat)}>add to trip</div>`))
      .addTo(map);
  });

} 
handleClick(lng, lat){
  console.log('clicked')
  this.addToTrip(lng, lat);
}

addToTrip(lng, lat){
  if(window.localStorage.waypoints) {
    window.localStorage('waypoint', [[lng, lat]])
  } else {
    window.localStorage.waypoints.push([lat, lng])
  }
  console.log(window.localStorage.waypoints)
} 

  render() {
    return (
    <div>
      <Head>
        <title> Welcome to your trip</title>
        <meta charset='utf-8' />
          <meta name='viewport' content='width=device-width, height=devive-height, initial-scale=1' />
              <script src='https://npmcdn.com/@turf/turf/turf.min.js'></script>
            <link href='https://api.mapbox.com/mapbox-assembly/mbx/v0.18.0/assembly.min.css' rel='stylesheet'/>
              <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.39.1/mapbox-gl.css' rel='stylesheet' />
         </Head>
        <div id="map" className="absolute top right left bottom" />
        <nav id="listing-group" className="listing-group">
          <Link href='/profile/profile'><img src="/static/user.png"></img></Link><br/>
          <img src="/static/info.png"></img><br/>
          <Link href='/itinerary/itinerary'><img src="/static/sports-car.png"></img></Link><br/>
          <Link href='/trip/music'><img src="/static/spotify.png"></img></Link><br/>
          <Link href='/trip/photos'><img src="/static/camera.png"></img></Link><br/>
          <Link href='/start'><img src="/static/left-arrow.png"></img></Link><br/>

          

</nav>
      <style jsx>{`
      #map { position:absolute; top:0; bottom:0; width:100%; }
      nav {
        font: 20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;
        border-radius: 3px;
        max-width: 20%;
        color: #fff;

    }

    label {
        border-radius: 0 0 3px 3px;
        padding: 20px;
    }
      `}
      </style>
      </div>
    )
  }
}
export default DynamicMap;
