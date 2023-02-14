import React, { useRef } from 'react'
import './Post.css'
import Comment from '../../img/comment.svg'
import Send from '../../img/send.svg'
import Like from '../../img/like.svg'
import DisLike from '../../img/dislike.svg'
import Bookmark from '../../img/Bookmark.svg'
import UnBookmark from '../../img/UnBookmark.svg'
import EmojiIcon from '../../img/Emoji.svg'
import Horizontal from '../../img/Horizontal3Dot.svg'

import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { bookmarkPost, commentPost, dislikePost, likePost, unbookmarkPost } from '../../actions/postAction'
import time from 'time-ago';
import {VolumeUp, VolumeOff, PlayArrow} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Skeleton from '@mui/material/Skeleton';
import CommentModel from '../CommentsModel/CommentModel'
import PostOptionModel from '../DropdownButton/PostOptionModel'

const Post = ({data,index}) => {
  const {user}  = useSelector((state)=>state.authReducer.authData)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [liked, setLiked] = useState(data?.likes?.includes(user?._id))
  const [bookmarked, setBookmarked] = useState(data?.saved?.includes(user?._id))
  const [likes, setLikes] = useState(data?.likes?.length)

  const handleLike = async () => {
    liked ? setLikes((prev)=>prev-1) : setLikes((prev)=>prev+1)
    setLiked((prev)=>!prev)
    liked ? dispatch(dislikePost(data?._id, user?._id)) : dispatch(likePost(data?._id, user?._id))
  }

  const handleDoubleClickLike = async () => {
    if(!liked){
      setLikes((prev)=>prev+1)
      dispatch(likePost(data._id, user._id))
    }
    setLiked(true);
  }

  const handleBookmark = async () => {
    setBookmarked((prev)=>!prev)
    bookmarked ? dispatch(unbookmarkPost(data?._id, user?._id)) : dispatch(bookmarkPost(data?._id, user?._id))
  }

  // For Comment
  const loading = useSelector((state)=>state.postReducer.uploading)
  const desc = useRef();
  // let [input,setInput] = useState();

  // const handleChange = (e) => {

  // }

  const resetComment = () => {
    desc.current.value = "";
  }

  const searchKeyPressed = (e) => {
    e = e || window.event;
    if (e.keyCode === 13)
    {
        document.getElementById(index).click();
        return false;
    }
    return true;
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
      dispatch(commentPost(data?._id, newComment))
      const myButton = document.getElementById(index);
      myButton.style.color = "rgb(176, 226, 243)"
      resetComment();
    }
  }

  //redirect focus on inputfield
  function handleInput(){
    const myButton = document.getElementById(index);
      if(desc.current.value){
        myButton.style.color = "rgb(4, 182, 231)"
      }
      else{
        myButton.style.color = "rgb(176, 226, 243)"
      }
  }
  const [open, setOpen] = useState(false);
  const [openMore, setOpenMore] = useState(false);

  function handleRedirect(){
    if(data?.comments?.length){
      setOpen(true);
    }else{
      document.getElementById(data?._id).select();
    }
  }



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
          <div className='PostUserName' onClick={()=>navigate(`/${data.userId}`)}>
            {data?.profilePicture ? 
              <img src={data.profilePicture ? data.profilePicture: "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} alt="" />
              : <Skeleton style={{marginTop: -1}} animation="wave" variant="circular" width={35} height={35} />
            }
            {data?.username ? <span><b>{data.username}</b></span>
            : <Skeleton animation="wave" height={20} width={120}/>
            }
          </div>

          {data ? <img src={Horizontal} className="PostHorizontalIcon" alt="" onClick={() => setOpenMore(true)} />
          : <Skeleton animation="wave" height={20} width={30}/>}
          <PostOptionModel open={openMore} setOpen={setOpenMore} data={data} />
        </div>

        <div className='PostContent'>
          {data?.image ?
            (data?.image?.includes("image") 
              ? <img src={data?.image} onDoubleClick={handleDoubleClickLike} alt="" />
              : <><video ref={videoRef} autoPlay muted loop onClick={videoClick}><source src={data?.image} type="video/mp4"/></video>
                  {pause ? <PlayArrow className='videoPlay' onClick={videoClick}/> : null}
                  {muted ? <VolumeOff className='muted' onClick={videoMuteClick} /> : <VolumeUp className='muted' onClick={videoMuteClick}/>}
                </>
            ) :  <Skeleton sx={{ height: 400 }} animation="wave" variant="rectangular" />}
        </div>

        <div className="PostReact">
            <div>
              <img src={liked ? Like : DisLike} className="ReactLike" alt="" onClick={handleLike} />
              <div>
                <img src={Comment} className="ReactComment" id="RedirectCommentInput" onClick={handleRedirect} alt="" />
                {data ? <CommentModel open={open} setOpen={setOpen} index={index} data = {data} /> : null}
              </div>
              <img src={Send} className="ReactShare" alt="" />
            </div>

            <img src={bookmarked ? Bookmark : UnBookmark} className="ReactBookmark" onClick={handleBookmark} alt="" />
        </div>

        {data?.likes ? <span style={{fontSize: "14px"}}><b>{likes} likes</b></span>
        : <Skeleton animation="wave" height={20} width={80}/>}

        { data?.username ? <div className="Details">
            <span onClick={()=>navigate(`/${data.userId}`)}><b>{data.username}</b></span>
            <span> {data.desc}</span>
        </div> 
        : <Skeleton animation="wave" height={20} width={130}/>}

        {data?.comments?.length>0 && (data?.comments?.length ? <span style={{fontSize: "14px", color: "rgb(147, 147, 147)",cursor: "pointer"}} onClick={handleRedirect}><span>{`View all ${data.comments.length} comments`}</span></span> : <Skeleton animation="wave" height={20} width={130}/>)}

        {data?.comments ? (data.comments.map((comment,id)=>{
          if(comment.userId === data.userId && id<2){
            return (
              <div key={id} className="Details">
                  <span onClick={()=>navigate(`/${data.userId}`)}><b>{comment.username}</b></span>
                  <span> {comment.comment}</span>
              </div>
            )
          }
          return null;
        })) : null}
        {data?.createdAt ? <span style={{fontSize: "13px",color: "rgb(147, 147, 147)"}}><span>{time.ago(data.createdAt)}</span></span>
        : <Skeleton animation="wave" height={20} width={100}/>}

        <hr />

        <div className="CommentSection">
          <div className="CommentPlusEmoji">
            <img src={EmojiIcon} className="CommentEmojiIcon" alt="" />
            {data?._id ? <input type="text" id={data._id} className="CommentInput" ref={desc} placeholder='Add a comment...' onKeyDown={searchKeyPressed} onChange={handleInput} autoComplete="off" />
            : <input type="text" className="CommentInput" ref={desc} placeholder='Add a comment...' onChange={handleInput} autoComplete="off" />}
          </div>
          {index ? <div className='CommentSendButton' id={index} onClick={handleSubmit}><span>{loading ? "Posting" : "Post"}</span></div>
          : <div className='CommentSendButton'><span>Post</span></div>}
        </div>
    </div>
  )
}

export default Post