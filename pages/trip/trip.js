import dynamic from 'next/dynamic'
import { connect } from 'react-redux'

 const DynamicMap = dynamic(() => import('../../components/map.js'), {
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
)(({line, pois, waypoints}) => {
  return (
  <div>
    <DynamicMap pois={pois} line={line} waypoints={waypoints}/>
  </div>
  )
})