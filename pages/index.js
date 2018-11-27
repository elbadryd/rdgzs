import dynamic from 'next/dynamic'
import { connect } from 'react-redux'
import Head from 'next/head'

const DynamicMap = dynamic(() => import('./../components/map.js'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default connect(
  state => ({
    line: state.line,
    pois: state.pois,
    waypoints: state.waypoints
  }),
  null
)(({ line, pois, waypoints }) => {
  return (
    <div>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, height=devive-height, initial-scale=1' />
        <script src='https://npmcdn.com/@turf/turf/turf.min.js'></script>
        <link href='https://api.mapbox.com/mapbox-assembly/mbx/v0.18.0/assembly.min.css' rel='stylesheet' />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.39.1/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <DynamicMap pois={pois} line={line} waypoints={waypoints} />
    </div>
  )
})