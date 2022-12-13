import React, { useRef } from 'react'
import './Post.css'
import Comment from '../../img/comment.svg'
import Send from '../../img/send.svg'
import Like from '../../img/like.svg'
import DisLike from '../../img/dislike.svg'
import Bookmark from '../../img/bookmark.svg'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { commentPost, dislikePost, likePost } from '../../actions/postAction'
import PostCustomizedMenus from '../DropdownButton/PostDropDownButton'
import time from 'time-ago';
import CommentsModel from '../CommentsModel/CommentsModel'
import {VolumeUp, VolumeOff, PlayArrow} from '@mui/icons-material'

const Post = ({data}) => {
  
  const dispatch = useDispatch();
  const {user}  = useSelector((state)=>state.authReducer.authData)

  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)

  const handleLike = async () => {
    setLiked((prev)=>!prev)
    liked ? setLikes((prev)=>prev-1) : setLikes((prev)=>prev+1)
    liked ? dispatch(dislikePost(data._id, user._id)) : dispatch(likePost(data._id, user._id))
  }

  // For Comment
  const loading = useSelector((state)=>state.postReducer.uploading)
  const desc = useRef();

  const resetComment = () => {
    desc.current.value = "";
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(desc.current.value){
      const newComment = {
          userId: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
          comment: desc.current.value,
          likes:[]
      }
      dispatch(commentPost(data._id, newComment))
      const myButton = document.getElementById(data.createdAt);
      myButton.style.color = "rgb(176, 226, 243)"
      resetComment();
    }
  }

  //redirect focus on inputfield
  function handleInput(){
    const myButton = document.getElementById(data.createdAt);
      if(desc.current.value){
        myButton.style.color = "rgb(4, 182, 231)"
      }
      else{
        myButton.style.color = "rgb(176, 226, 243)"
      }
  }

  function handleRedirect(){
    if(data.comments.length){
      setModalOpened(true);
    }else{
      document.getElementById(data._id).select();
    }
  }

  const [modalOpened, setModalOpened] = useState(false);


  //Show Video
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
    <div className="Post">
        <div className="PostDetails">
          <div className='PostUserName'>
            <img src={data.profilePicture ? data.profilePicture: "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} style={{cursor: "pointer"}} alt="" />
            <span style={{cursor: "pointer"}}> <b>{data.username}</b></span>
          </div>
          <PostCustomizedMenus data={data} />
          
        </div>

        <div className='PostContent'>
            {data.image.includes("image") 
              ? <img src={data.image ? data.image: ""} alt="" />
              : <><video ref={videoRef} autoPlay muted loop onClick={videoClick}><source src={data.image ? data.image : ""} type="video/mp4"/></video>
                  {pause ? <PlayArrow className='videoPlay' onClick={videoClick}/> : null}
                  {muted ? <VolumeOff className='muted' onClick={videoMuteClick} /> : <VolumeUp className='muted' onClick={videoMuteClick}/>}
                </>
            }
        </div>

      

        <div className="PostReact">
            <div>
              <img src={liked ? Like : DisLike} className="ReactLike" alt="" style={{cursor: "pointer",width: "26px"}} onClick={handleLike} />
              {<div>
                <img src={Comment} className="ReactComment" id="RedirectCommentInput" onClick={handleRedirect} style={{cursor: "pointer",width: "33px",marginTop:"-4px"}} alt="" />
                <CommentsModel modalOpened={modalOpened} setModalOpened={setModalOpened} data = {data} />
              </div>}
              <img src={Send} className="ReactShare" style={{cursor: "pointer",width: "29px"}} alt="" />
            </div>

            <img src={Bookmark} className="ReactBookmark" style={{cursor: "pointer",width: "26px"}} alt="" />
        </div>

        <span style={{fontSize: "14px"}}><b>{likes} likes</b></span>

        <div className="Details">
            <span><b>{data.username}</b></span>
            <span> {data.desc}</span>
        </div>

        {data.comments.length>0 && (<span style={{fontSize: "14px", color: "rgb(147, 147, 147)",cursor: "pointer"}} onClick={handleRedirect}><span>{`View all ${data.comments.length} comments`}</span></span>)}

        {data.comments.map((comment,id)=>{
          if(comment.userId === data.userId && id<2){
            return (
              <div key={id} className="Details">
                  <span><b>{comment.username}</b></span>
                  <span> {comment.comment}</span>
              </div>
            )
          }
        })}

        <span style={{fontSize: "13px",color: "rgb(147, 147, 147)"}}><span>{time.ago(data.createdAt)}</span></span>

        <hr />

        <div className="CommentSection">
          <div className="CommentPlusEmoji">
            <img src={Send} className="CommentEmojiIcon" style={{cursor: "pointer",width: "20px"}} alt="" />
            <input type="text" id={data._id} className="CommentInput" ref={desc} placeholder='Add a comment...' onChange={handleInput} />
          </div>
          <div className='CommentSendButton' id={data.createdAt} onClick={handleSubmit} style={{fontSize: "13px", color: "rgb(176, 226, 243)",fontWeight:"600", cursor: "pointer"}}><span>{loading ? "Posting" : "Post"}</span></div>
        </div>
    </div>
  )
}

export default Post