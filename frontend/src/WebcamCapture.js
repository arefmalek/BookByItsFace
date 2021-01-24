import React from "react"
import {useState} from "react"
import Webcam from "react-webcam"
import "./Camera.css"
import axios from 'axios'


const Camera = () => {
    var webcamRef = React.useRef(null);
    const [imgSrc, setImgSrc] = React.useState(null);
    const [display, setDisplay] = useState(true);
    const capture = React.useCallback(() => {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc)
      setImgSrc(imageSrc);
      setDisplay(false)
      
    }, [webcamRef, setImgSrc]);


    const imgObject = {
      img: imgSrc
    }

    axios.post('http://127.0.0.1:5000/predict', imgObject)

    const retake = () => {
      setDisplay(true)
    }

    if (display) {
      return (
        <div className="body">
            <div className="cam">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                forceScreenshotSourceSize="true"
              />
            </div>
        
          <button onClick={capture}>Capture photo</button>

        </div>
      );
    }
    else {
      return (
        <div className="body">
          {imgSrc && (
            <img className="displayImage"
              src={imgSrc}
            />
          )}
          <div className="buttonBlock">
          <button onClick={retake}>Retake</button>
          <button onClick={retake}>Proceed</button>
          </div>

        </div>
      )
    }
  };

export default Camera