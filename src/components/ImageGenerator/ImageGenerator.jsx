import React, { useRef, useState } from 'react'
import './ImageGenerator.css';
import default_image from '../Assets/default_image.svg';

const ImageGenerator = () => {

  const [image_url, setImage_url] = useState('/');
  const [loading, setLoading] = useState(false);
  let inputRef = useRef(null);

  // ✅ REQUIRED: read env variable once
  const UNSPLASH_KEY = process.env.REACT_APP_UNSPLASH_KEY;

  const imageGenerator = async() =>{
    if(inputRef.current.value==="") {
      return 0;
    }
    setLoading(true);
    try {
      // ✅ REQUIRED: encode query
      const query = encodeURIComponent(inputRef.current.value);

      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_KEY}`
      );

      const data = await response.json();
      
      if(data.results && data.results.length > 0) {
        setImage_url(data.results[0].urls.regular);
      } else {
        alert("No images found for this query");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate image. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className='ai-image-generator'>
        <div className='header'>Ai Image <span>Generator</span></div>
        <div className="image">
          <img src={image_url === "/"?default_image:image_url} alt=''/>
        </div>
        <div className='search-box'>
          <input type="text" ref={inputRef} className='search-input' placeholder='Describe What You Want To See' />
          <div className="generate-btn" onClick={()=> {imageGenerator()}}>
            {loading ? "Generating..." : "Generate"}
          </div>
        </div>
    </div>
  )
}

export default ImageGenerator
