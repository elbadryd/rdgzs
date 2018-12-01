import { Image, CloudinaryContext } from 'cloudinary-react';
// import cloudinary from 'cloudinary-core';

class Photos extends React.Component {
  constructor(props){
    super(props)
    this.state-={
      photos: []
    }
  }

  componentDidMount(){
    //query db for user's photos to display, add to state
    let myUploadWidget;
    document.getElementById("upload_widget_opener").addEventListener("click", function () {
      myUploadWidget = window.cloudinary.openUploadWidget({
        cloudName: 'rdgz', uploadPreset: 'rdgzPreset', 
      }, (error, result) => { 
        console.log(result);
        //url comes back on result.success obj
        //take url from success obj, store in db with tripId
        //need to figure out how to capture geotag info
      });
    }, false);
  }

  render(){
    return(
      <div>
        <div><img id="upload_widget_opener" src="/static/camera.png"></img>add photos</div>
      {/* <a href="#" id="upload_widget_opener">Upload multiple images</a> */}
      </div>
    )
  }

}
//connect to store to access tripID
export default Photos