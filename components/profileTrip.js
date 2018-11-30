class ProfileTrip extends React.component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    const { originName, destinationName, seeTrip, removeTrip } = this.props
    return (
      <div className="card" style={{ width: '18rem' }}>
        <img className="card-img-top" src="/static/mountain.png" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{originName} to {destinationName}</h5>
          <p className="card-text"></p>
          <a onClick={seeTrip} className="btn btn-primary">See Trip</a>
          <a onClick={removeTrip} className="btn btn-primary">Remove Trip</a>
        </div>
      </div>
    )
  }
}
export default ProfileTrip
