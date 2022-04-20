import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import {Icon} from "web3uikit";

const Player = () => {
  const {state:currentlyPlaying}=useLocation();
  
  return (
  <>
  <div className="playerpage">
    <video autoplay controls className="videoplayer">
      <source
      src={currentlyPlaying }
      type="video/mp4">
      </source>
    
      </video> 
   <div classname="backHome">
     <Link to="/">
       <Icon
       className="backButton"
       fill="rgba(255,255,255,0.25)" 
       size={60}
       svg="arrowCircleLeft "
       />
        
     </Link>

   </div>
  </div>
  </>
)
}

export default Player;
