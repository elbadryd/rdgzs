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
  }),
  null
)(({line, pois}) => {
  return (
  <div>
    <DynamicMap pois={pois} line={line}/>
  </div>
  )
})