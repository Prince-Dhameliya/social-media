import React, { useRef, useState } from 'react'
import {VolumeUp, VolumeOff, PlayArrow} from '@mui/icons-material'
import "./Post.css"
import { Skeleton } from '@mui/material'

const CarouselSlider = ({data,img,handleDoubleClickLike}) => {

  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [pause, setPause] = useState(false);
  
  const videoClick = () => {
    if(videoRef.current){
      setPause((prev)=>!prev);
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
    }
  }

  const videoMuteClick = () => {
      setMuted((prev)=>!prev);
      videoRef.current.muted ? videoRef.current.muted=false :  videoRef.current.muted=true;
  }
  return (
    <>
        {img ?
            (img?.includes("image") 
            ? <img src={img}  onDoubleClick={handleDoubleClickLike} alt="" />
            : <div className='videoSection'><video ref={videoRef} autoPlay muted loop onClick={videoClick} style={{width: "100%"}}><source src={img} type="video/mp4"/></video>
                {pause ? <PlayArrow className='videoPlay' onClick={videoClick}/> : null}
                {muted ? <VolumeOff className='muted' onClick={videoMuteClick} /> : <VolumeUp className='muted' onClick={videoMuteClick}/>}
                </div>
            ) :  <Skeleton sx={{ height: 400 }} animation="wave" variant="rectangular" />}
    </>
  )
}

export default CarouselSlider