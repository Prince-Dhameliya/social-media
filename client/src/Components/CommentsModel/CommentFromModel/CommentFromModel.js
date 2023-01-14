import React from 'react'
import Send from '../../../img/send.svg'
import time from 'time-ago';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../actions/postAction';
import { Link } from 'react-router-dom';

const CommentFromModel = ({comment,data}) => {
    const {user}  = useSelector((state)=>state.authReducer.authData)
    const dispatch = useDispatch();

    const handleDeleteComment = async () => {
        dispatch(deleteComment(user._id, data._id, comment.commentId));
    }
  return (
        <div className="CommentWindow">
            <div className="CommentLeft">
                <img src={comment.profilePicture ? comment.profilePicture: "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png" } style={{cursor: "pointer"}} alt="" />

                <div className="CommentInfo">
                    <div className="CommentUserInfo">
                        <span><Link style={{textDecoration: "none", color: "inherit"}} to={`/${comment.userId}`}><b>{comment.username}</b></Link></span>
                        <span> {comment.comment}</span>
                    </div>

                    <div className="CommentAction">
                        <span>{time.ago(comment.createdAt,true)}</span>
                        <span><b>{comment.likes} likes</b></span>
                        <span><b>Reply</b></span>
                        {(comment.userId) === (user._id) && (<span style={{cursor: "pointer"}} onClick={handleDeleteComment} ><b>Delete</b></span>)}
                    </div>
                </div>
            </div>

            <div className='CommentRight'><img src={Send} style={{cursor: "pointer"}} alt="" /></div>
        </div>
  )
}

export default CommentFromModel