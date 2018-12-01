import { Image, CloudinaryContext } from 'cloudinary-react';
// import cloudinary from 'cloudinary-core';

class Photos extends React.Component {
  constructor(props){
    super(props)
    this.state-={

    }
  }

  componentDidMount(){
    let myUploadWidget;
    document.getElementById("upload_widget_opener").addEventListener("click", function () {
      myUploadWidget = window.cloudinary.openUploadWidget({
        cloudName: 'rdgz', uploadPreset: 'preset1'
      }, (error, result) => { });
    }, false);
  }

  render(){
    return(
      <div>
      <div><img src="/static/camera.png"></img>add photos</div>
      <a href="#" id="upload_widget_opener">Upload multiple images</a>
      </div>
    )
  }

}
//connect to store to access tripID
export default Photos