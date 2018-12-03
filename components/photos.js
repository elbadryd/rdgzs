import axios from 'axios';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import cloudinary from 'cloudinary-core';

class Photos extends React.Component {
  constructor(props){
    super(props)
    this.state={
      geotag: null,
      photoData: []
    }
    this.takePhoto = this.takePhoto.bind(this)
  }

  takePhoto(){
    if (navigator.geolocation) {
      const self = this;
      navigator.geolocation.getCurrentPosition((position) => {
        self.position = position.coords;
        this.setState({
          geotag: {
            lng: self.position.longitude,
            lat: self.position.latitude,
          }
        })
      });
    }
    let myUploadWidget;
    document.getElementById("upload_widget_opener")
      myUploadWidget = window.cloudinary.openUploadWidget({
        cloudName: 'rdgz', uploadPreset: 'rdgzPreset', sources: ['camera']
      }, (error, result) => {
        console.log(result);
        if (result.event === 'success') {
          axios.post('/photo', {
            params: {
              tripId: this.props.tripId,
              geotag: this.state.geotag,
              url: result.info.url,
              publicId: result.info.public_id
            }
          })
            .then(response => {
              console.log(response)
            })
            .catch(err => {
              console.log(err)
            })
        }
      });
  }

  componentDidMount(){
    console.log(this.props.tripId, 'tripId photos')
    axios.get('/photo', {params :{ tripId: this.props.tripId }})
    .then(response=>{
        this.setState({
          photoData: response.data
        }) 
      })
      .catch(err=>{
        console.log(err)
      })
  }
  


  render(){
    let { photoData } = this.state
    return ( 
      <div>
        <div><img id="upload_widget_opener" src="/static/camera.png" onClick={this.takePhoto}></img>add photos</div>
        {photoData.map(photo=>{
          return <a key={photo.id} href={photo.link} target="_blank" rel="noopener noreferrer">
          <Image cloudName="rdgz" publicId={photo.publicId} width="200" crop="scale" radius="10"></Image>
        </a>
        })}
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