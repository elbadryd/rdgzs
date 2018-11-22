
export default class Trip extends React.Component {
  getInitialProps({ start, query }) {
    return { details: details }; // pass some custom props to component
  }
  render() {
    return (
      <div>
        <div>Prop from getInitialProps {this.props.details}</div>
      </div>
    )
  }
}
// OR in functional style
// const Trip = ({ details }) => (
//   <div>
//     <div>Prop from getInitialProps {this.props.details}</div>
//   </div>
// );
// getInitialProps = ({ start , query }) => ({
//   custom: 'custom' // pass some custom props to component
// });
