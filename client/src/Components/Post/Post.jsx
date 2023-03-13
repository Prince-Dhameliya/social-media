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
import NextButton from '../../img/NextButton.png'

import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { bookmarkPost, commentPost, dislikePost, likePost, unbookmarkPost } from '../../actions/postAction'
import time from 'time-ago';
// import {VolumeUp, VolumeOff, PlayArrow} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Skeleton from '@mui/material/Skeleton';
import CommentModel from '../CommentsModel/CommentModel'
import PostOptionModel from '../DropdownButton/PostOptionModel'
import CarouselSlider from './CarouselSlider'

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

  // const handleDoubleClickLike = async () => {
  //   if(!liked){
  //     setLikes((prev)=>prev+1)
  //     dispatch(likePost(data._id, user._id))
  //   }
  //   setLiked(true);
  // }

  const handleBookmark = async () => {
    setBookmarked((prev)=>!prev)
    bookmarked ? dispatch(unbookmarkPost(data?._id, user?._id)) : dispatch(bookmarkPost(data?._id, user?._id))
  }

  // For Comment
  const loading = useSelector((state)=>state.postReducer.uploading)
  const desc = useRef();

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
  // const videoRef = useRef(null);
  // const [muted, setMuted] = useState(true);
  // const [pause, setPause] = useState(false);
  
  // const videoClick = () => {
  //   if(videoRef.current){
  //     setPause((prev)=>!prev);
  //     videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause()
  //   }
  // }

  // const videoMuteClick = () => {
  //     setMuted((prev)=>!prev);
  //     videoRef.current.muted ? videoRef.current.muted=false :  videoRef.current.muted=true;
  // }

  // const [loaded, setLoaded] = useState(false);

  // let Image = true;
  // let Video = false;

  // if(!data?.image?.includes("image")){
  //   Image = false;
  //   Video = true;
  // }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName(`${data?._id}`);
    let dots;
    if(data?.image?.length > 1){
      dots = document.getElementsByClassName(`${index}`);
    }
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
    }
    if(data?.image?.length > 1){
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i]?.className?.replace(" active", "");
      }
    }
    slides[slideIndex-1].style.display = "block"; 
    if(data?.image?.length > 1){ 
      dots[slideIndex-1].className += " active";
    }
  }

  let [slideIndex, setSlideIndex] = useState(1);
  React.useEffect(()=>{
    if(data?.image?.length!==0){
      showSlides(slideIndex);
    }
  },[data?.image?.length])

  function plusSlides(n) {
    setSlideIndex(prev=>prev+=n);
    showSlides(slideIndex += n);

  }

  function currentSlide(n) {
    setSlideIndex(prev=>prev=n);
    showSlides(slideIndex = n);
  }

  return (
    <div className="Post">
        <div className="PostHeaderSection">
          <div className='PostUserName' onClick={()=>navigate(`/${data.userId}`)}>
            {data?.profilePicture ? 
              <img src={data.profilePicture ? data.profilePicture: "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} alt="" />
              : <Skeleton style={{marginTop: -1}} animation="wave" variant="circular" width={35} height={35} />
            }
            {data?.username ? <span>{data.username}</span>
            : <Skeleton animation="wave" height={20} width={120}/>
            }
          </div>

          {data ? <img src={Horizontal} className="PostHorizontalIcon" alt="" onClick={() => setOpenMore(true)} />
          : <Skeleton animation="wave" height={20} width={30}/>}
          <PostOptionModel open={openMore} setOpen={setOpenMore} data={data} />
        </div>

        {/* <div className="PostContent">
          {loaded ? null : (
            <Skeleton sx={{ height: 400, width: 800 }} animation="wave" variant="rectangular" />
          )}
          <img
            style={loaded && Image ? {} : { display: 'none' }}
            src={data?.image}
            onLoad={() => setLoaded(true)}
            onDoubleClick={handleDoubleClickLike}
            alt=""
          />

          <video style={loaded && Video ? {} : { display: "none" }} onLoad={() => setLoaded(true)} ref={videoRef} autoPlay muted loop onClick={videoClick}><source src={data?.image} type="video/mp4"/></video>
          {Video && (pause ? <PlayArrow className='videoPlay' onClick={videoClick}/> : null)}
          {Video && (muted ? <VolumeOff className='muted' onClick={videoMuteClick} /> : <VolumeUp className='muted' onClick={videoMuteClick}/>)}
        </div> */}

        <div className='PostContent'>
          <div className="slideshow-container">

            {data?.image?.map((img,index)=>{
              return <CarouselSlider data={data} key={index} img={img} setLikes={setLikes} />
            })}

            {slideIndex!==1 && <span className="prev" onClick={()=>plusSlides(-1)}><img src={NextButton} style={{width: "30px",rotate: "180deg"}} alt=""/></span>}
            {slideIndex!==data?.image?.length && <span className="next" onClick={()=>plusSlides(1)}><img src={NextButton} style={{width: "30px"}} alt=""/></span>}

            {data?.image?.length > 1 && <div className='dotNavigation' style={{textAlign: "center"}}>
              {data?.image?.map((img,id)=>{
                return <span key={id} className={`dot ${index}`} onClick={()=>currentSlide(id+1)}></span>
              })}
            </div>}
          </div>
        </div>

        <div className="PostDetailsSection">

          {data ? <div className="PostReact">
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
          : <Skeleton animation="wave" height={30} style={{ marginBottom: 1,borderRadius: 10 }} />}

          {data?.likes ? <span className='LikeDetails'>{likes} likes</span>
          : <Skeleton animation="wave" height={20} width={80}/>}

          {data?.desc?.length > 0 && (data?.username ? <div className="Details">
              <span onClick={()=>navigate(`/${data.userId}`)}>{data.username}</span>
              <span> {data.desc}</span>
          </div> 
          : <Skeleton animation="wave" height={20} width={130}/>)}

          {data?.comments?.length>0 && (data?.comments?.length ? <span className='CommentsDetails' onClick={handleRedirect}><span>{`View all ${data.comments.length} comments`}</span></span> : <Skeleton animation="wave" height={20} width={130}/>)}

          {data?.comments ? (data.comments.map((comment,id)=>{
            if(comment.userId === data.userId && id<2){
              return (
                <div key={id} className="Details">
                    <span onClick={()=>navigate(`/${data.userId}`)}>{comment.username}</span>
                    <span> {comment.comment}</span>
                </div>
              )
            }
            return null;
          })) : null}

          {data?.createdAt ? <span className='PostTimeDetails'>{time.ago(data.createdAt)}</span>
          : <Skeleton animation="wave" height={20} width={100}/>}

        </div>

        <hr />

        <div className="CommentSection">
          <div className="CommentPlusEmoji">
            {data ? <img src={EmojiIcon} className="CommentEmojiIcon" alt="" /> : <Skeleton style={{marginTop: -1, marginLeft: -1}} animation="wave" variant="circular" width={25} height={25} />}
            {data?._id ? <input type="text" id={data?._id} className="CommentInput" ref={desc} placeholder='Add a comment...' onKeyDown={searchKeyPressed} onChange={handleInput} autoComplete="off" />
            : <Skeleton animation="wave" height={23} style={{borderRadius: 8, flexGrow: 1,marginRight: 10}} />}
          </div>
          {index && data ? <span className='CommentSendButton' id={index} onClick={handleSubmit}>{loading ? "Posting" : "Post"}</span>
          : <Skeleton animation="wave" height={20} width={30}/>}
        </div>
    </div>
  )
}

export default Post