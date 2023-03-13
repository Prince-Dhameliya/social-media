import React, { useRef, useState } from 'react'
import {VolumeUp, VolumeOff, PlayArrow} from '@mui/icons-material'
import "./Post.css"
import { useDispatch, useSelector } from 'react-redux'
import { likePost } from '../../actions/postAction'
import { Skeleton } from '@mui/material'

const CarouselSlider = ({data,img,setLikes}) => {
  const {user}  = useSelector((state)=>state.authReducer.authData)
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(data?.likes?.includes(user?._id))

  const handleDoubleClickLike = async () => {
    if(!liked){
      setLikes((prev)=>prev+1)
      dispatch(likePost(data._id, user._id))
    }
    setLiked(true);
  }

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
    <div className={`mySlides fade ${data?._id}`}>
        {img ?
            (img?.includes("image") 
            ? <img src={img}  onDoubleClick={handleDoubleClickLike} alt="" />
            : <div className='videoSection'><video ref={videoRef} autoPlay muted loop onClick={videoClick} style={{width: "100%"}}><source src={img} type="video/mp4"/></video>
                {pause ? <PlayArrow className='videoPlay' onClick={videoClick}/> : null}
                {muted ? <VolumeOff className='muted' onClick={videoMuteClick} /> : <VolumeUp className='muted' onClick={videoMuteClick}/>}
                </div>
            ) :  <Skeleton sx={{ height: 400 }} animation="wave" variant="rectangular" />}
    </div>
  )
}

export default CarouselSlider