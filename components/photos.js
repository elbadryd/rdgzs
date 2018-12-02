import axios from 'axios'
import { connect } from 'react-redux'
class Photos extends React.Component {
  constructor(props){
    super(props)
    this.state={
      lng: null,
      lat: null,
    }
  }

  componentDidMount() {
    let geotag = null;
    if (navigator.geolocation) {
      const self = this;
      navigator.geolocation.getCurrentPosition((position) => {
        self.position = position.coords;
        geotag = {
          lat: self.position.latitude,
          lng: self.position.longitude
        }
      });
    }
    let myUploadWidget;
    document.getElementById("upload_widget_opener").addEventListener("click", function () {
      myUploadWidget = window.cloudinary.openUploadWidget({
        cloudName: 'rdgz', uploadPreset: 'rdgzPreset', sources: ['camera']
      }, (error, result) => {
        if (result.event === 'success'){
          axios.post('/photo', {
            params: {
              tripId : 135,
              geotag,
              url: result.info.url
            }
          })
          .then(response=>{
            console.log(response)
          })
          .catch(err=>{
            console.log(err)
          })
        }
      });
    }, false);
  }

  sendPhoto(url){
    
  }

  render(){
    return ( 
      <div>
        <div><img id="upload_widget_opener" src="/static/camera.png"></img>add photos</div>
      </div>
  )

}
}
//connect to store to access tripID
export default connect(
  state =>({
    tripId: state.tripId
  })
)
(Photos)