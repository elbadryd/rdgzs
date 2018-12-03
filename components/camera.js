class Camera extends React.Component {
  constructor(props) {
    super(props)
    this.state -= {
      videoSrc: []
    }
    this.handleVideo = this.handleVideo.bind(this);
    this.videoError = this.videoError.bind(this);
  }

  componentDidMount() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
    if (navigator.getUserMedia) {
      navigator.getUserMedia({ video: true }, this.handleVideo, this.videoError);
    }
  }

  handleVideo(stream) {
    // Update the state, triggering the component to re-render with the correct stream
    this.setState({ videoSrc: window.URL.createObjectURL(stream) });
    this.videoElement.play();
  }
  videoError() {
  }

  render() {
    const video = (<video id="video" width="640" height="480" className="cameraFrame" src={this.state.videoSrc} autoPlay="true"
      ref={(input) => { this.videoElement = input; }}></video>);
    return (
      <div>
        {video}
      </div>

    )
  }

}
//connect to store to access tripID
export default Camera