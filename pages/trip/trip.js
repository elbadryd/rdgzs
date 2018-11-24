import dynamic from 'next/dynamic'

 const DynamicMap = dynamic(() => import('../../components/map.js'), {
   ssr: false,
  loading: () => <p>Loading...</p>,
});
export default () => (
  <div>
    <DynamicMap/>
  </div>
)