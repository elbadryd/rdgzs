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

        {/* <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script> */}
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossOrigin="anonymous"></script> */}
        {/* <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossOrigin="anonymous"></script> */}
        <script src="https://widget.cloudinary.com/v2.0/global/all.js" type="text/javascript"></script>
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        </Head>
      <DynamicMap origin={origin} destination={destination} pois={pois} line={line} tripId={tripId} waypoints={waypoints} />


    </div>
  )
});
