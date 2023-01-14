import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import './CommentModel.css'
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPost, dislikePost, likePost } from "../../actions/postAction";
import Horizontal from '../../img/Horizontal3Dot.svg'
import Comment from '../../img/comment.svg'
import Send from '../../img/send.svg'
import Like from '../../img/like.svg'
import DisLike from '../../img/dislike.svg'
import Bookmark from '../../img/UnBookmark.svg'
import Close from '../../img/Close.svg'
import time from 'time-ago';
import CommentFromModel from "./CommentFromModel/CommentFromModel";
import PostOptionModel from '../DropdownButton/PostOptionModel';
import { Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function CommentModel2({open, setOpen, data}) {
//   const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };


  const dispatch = useDispatch();
  const {user}  = useSelector((state)=>state.authReducer.authData)
  const loading = useSelector((state)=>state.postReducer.uploading)
  const desc = useRef();

  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)
  const [openMore, setOpenMore] = useState(false);

  const handleLike = async () => {
    setLiked((prev)=>!prev)
    liked ? setLikes((prev)=>prev-1) : setLikes((prev)=>prev+1)
    liked ? dispatch(dislikePost(data._id, user._id)) : dispatch(likePost(data._id, user._id))
  }

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
        resetComment();
    }
  }

    function handleRedirect(){
        document.getElementById(data._id).select();
    }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="CommentBox">
            <div className="PostDetails">
                <div className='PostUserName commentUsername'>
                    <img src={data.profilePicture ? data.profilePicture: "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png" } style={{cursor: "pointer"}} alt="" />
                    <span style={{cursor: "pointer"}}><Link style={{textDecoration: "none", color: "inherit"}} to={`/${data.userId}`}><b>{data.username}</b></Link></span>
                </div>
                <div className='PostMoreIcon'>
                    {data ? <img src={Horizontal} className="ReactLike" alt="" style={{cursor: "pointer",width: "24px"}} onClick={() => setOpenMore(true)} />
                    : <Skeleton animation="wave" height={20} width={30}/>}
                    <PostOptionModel open={openMore} setOpen={setOpenMore} data={data} />
                    <img src={Close} className='ReactLike' alt="" style={{cursor: "pointer",width: "26px"}} onClick={handleClose} />
                </div>
            </div>

            <hr />

            <div className="MainComment">
                {data.desc ? (<div className="CommentWindow">
                    <div className="CommentLeft">
                        <img src={data.profilePicture ? data.profilePicture: "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png" } style={{cursor: "pointer"}} alt="" />

                        <div className="CommentInfo">
                            <div className="CommentUserInfo">
                                <span><Link style={{textDecoration: "none", color: "inherit"}} to={`/${data.userId}`}><b>{data.username}</b></Link></span>
                                <span> {data.desc}</span>
                            </div>

                            <div className="CommentUserInfo">
                                <span style={{color: "rgb(147, 147, 147)"}}>{time.ago(data.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>) 
                : null}   

                {data.comments.map((comment,id)=>{
                    return <CommentFromModel key={id} comment={comment} data={data} />
                })}
            </div>

            
            

            <div className="bottomcomment">
                <hr />

                <div className="PostReact">
                    <div>
                        <img src={liked ? Like : DisLike} className="ReactLike" alt="" style={{cursor: "pointer",width: "26px"}} onClick={handleLike} />
                        <img src={Comment} className="ReactComment" id="RedirectCommentInput" onClick={handleRedirect} style={{cursor: "pointer",width: "33px",marginTop:"-4px"}} alt="" />
                        <img src={Send} className="ReactShare" style={{cursor: "pointer",width: "29px"}} alt="" />
                    </div>

                    <img src={Bookmark} className="ReactBookmark" style={{cursor: "pointer",width: "26px"}} alt="" />
                </div>

                <span><b>{likes} likes</b></span>

                <span style={{color: "rgb(147, 147, 147)"}}>{time.ago(data.createdAt)}</span>

                <hr />

                <div className="CommentSection">
                    <div className="CommentPlusEmoji">
                        <img src={Send} className="CommentEmojiIcon" style={{cursor: "pointer",width: "20px"}} alt="" />
                        <input type="text" id={data._id} className="CommentInput" ref={desc} placeholder='Add a comment...' />
                    </div>
                    <div className='CommentSendButton' id={data.createdAt} onClick={handleSubmit} style={{fontSize: "13px", color: "rgb(176, 226, 243)",fontWeight:"600", cursor: "pointer"}}><span>{loading ? "Posting" : "Post"}</span></div>
                </div>
            </div>
        </div>
      </Dialog>
    </div>
  );
}