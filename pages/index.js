import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import Head from 'next/head'


const DynamicMap = dynamic(() => import('./../components/map.js'), {
  ssr: false,
  loading: () => <p><img src="/static/globe.gif"></img></p>,
});

export default connect(
  state => ({
    line: state.line,
    pois: state.pois,
    waypoints: state.waypoints,
    tripId: state.tripId,
    origin: state.origin,
    destination: state.destination
  }),
  null
)(({ line, pois, waypoints, tripId, origin, destination }) => {
  return (
    <div>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, height=devive-height, initial-scale=1' />
        <script src='https://npmcdn.com/@turf/turf/turf.min.js'></script>
        <link href='https://api.mapbox.com/mapbox-assembly/mbx/v0.18.0/assembly.min.css' rel='stylesheet' />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.39.1/mapbox-gl.css' rel='stylesheet' />
        <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </Head>
      <DynamicMap origin={origin} destination={destination} pois={pois} line={line} tripId={tripId} waypoints={waypoints} />


    </div>
  )
});
