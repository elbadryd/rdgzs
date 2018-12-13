import axios from 'axios';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import cloudinary from 'cloudinary-core';
import Slider from 'react-slick'


class Photos extends React.Component {
  constructor(props){
    super(props)
    this.state={
      geotag: null,
      photoData: [],
      activeSlide: 0,
    }
    this.takePhoto = this.takePhoto.bind(this);
  }

  takePhoto(){
    let myUploadWidget;
    document.getElementById("upload_widget_opener")
      myUploadWidget = window.cloudinary.openUploadWidget({
        cloudName: 'rdgz', uploadPreset: 'rdgzPreset',
        sources: ['camera'],
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
      let { photoData, activeSlide } = this.state
      let photos = photoData.map(photo=>{
        return <div><a key={photo.id} href={photo.link} target="_blank" rel="noopener noreferrer">
          <Image cloudName="rdgz" publicId={photo.publicId} width="200" crop="scale" radius="10"></Image>
     </a></div>

      })
      var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        // beforeChange: (current) => this.setState({ activeSlide: photoData[current] || 0 },
        //   () => photoData[current] ? this.props.setPhotoMarker(photoData[current].geotag.lng, photoData[current].geotag.lat): null ),
        beforeChange: (next) =>{
          if(photoData[next] && photoData[next].geotag){
            this.props.setPhotoMarker(photoData[next].geotag.lng, photoData[next].geotag.lat)
            this.setState({ activeSlide: photoData[next] || 0});
          }
        }
      }
      return  (
          <div className="container-fluid">
            <Slider {...settings}>
              <div><img id="upload_widget_opener" src="/static/camera.png" onClick={this.takePhoto}></img><br/>add photos</div>
               {photos || null}
            </Slider>
          <style jsx>{`.container-fluid {
  margin: 0 auto;
  padding: 40px;
  width: 80%;
  color: #333;

}

h3 {
  background: blue;
  color: #fff;
  font-size: 36px;
  line-height: 100px;
  margin: 10px;
  padding: 2%;
  position: relative;
  text-align: center;
}
.variable-width .slick-slide p {
  background: blue;
  height: 100px;
  color: #fff;
  margin: 5px;
  line-height: 100px;
  text-align: center;
}
.center .slick-center h3 {
  color: #e67e22;
  opacity: 1;
  transform: scale(1.08);
}
.center h3 {
  opacity: 0.8;
  transition: all 300ms ease;
}
.content {
  padding: 20px;
  margin: auto;
  width: 95%;
}
.slick-slide .image {
  padding: 10px;
}
.slick-slide img {
  border: 5px solid #fff;
  display: block;
  margin: auto;
}
.slick-slide img.slick-loading {
  border: 0;
}
.slick-slider {
  margin: 30px auto 50px;
}
.slick-dots {
  margin-left: 0;
}
.slick-thumb {
  bottom: -45px;
}
.slick-thumb li {
  width: 60px;
  height: 45px;
}
.slick-thumb li img {
  filter: grayscale(100%);
}
.slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
@media (max-width: 768px) {
  h3 {
    font-size: 24px;
  }
  .center {
    margin-left: -40px;
    margin-right: -40px;
  }
  .center .slick-center h3 {
    color: #e67e22;
    opacity: 1;
    transform: scale(1);
  }
  .center h3 {
    opacity: 0.8;
    transform: scale(0.95);
    transition: all 300ms ease;
  }
}
.slick-vertical .slick-slide {
  height: 180px;
}
.slick-arrow {
  background-color: grey;
  /* color: black; */
}
.slick-arrow:hover {
  background-color: grey;
}`}
          </style>
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