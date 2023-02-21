import React, { useState } from 'react'
import Like from '../../../img/like.svg'
import DisLike from '../../../img/dislike.svg'
import time from 'time-ago';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../actions/postAction';
import { useNavigate } from 'react-router-dom';

const CommentFromModel = ({comment,data}) => {
    const {user}  = useSelector((state)=>state.authReducer.authData)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [liked, setLiked] = useState(false);

    const handleLike = async () => {
        setLiked((prev)=>!prev)
    }

    const handleDeleteComment = async () => {
        dispatch(deleteComment(comment.commentId,{commentUserId: comment.userId, postId: data._id, currentUserId: user._id, currentUserAdminStatus: user?.isAdmin}));
    }
  return (
        <div className="CommentWindow">
            <div className="CommentLeft">
                <img src={comment.profilePicture ? comment.profilePicture: "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png" } alt="" />

                <div className="CommentInfo">
                    <div className="CommentUserInfo">
                        <span onClick={()=>navigate(`/${data.userId}`)}>{comment.username}</span>
                        <span> {comment.comment}</span>
                    </div>

                    <div className="CommentAction">
                        <span>{time.ago(comment.createdAt,true)}</span>
                        <span>{comment.likes} likes</span>
                        <span>Reply</span>
                        {(comment.userId === user._id || user?.isAdmin) && <span style={{cursor: "pointer"}} onClick={handleDeleteComment} >Delete</span>}
                    </div>
                </div>
            </div>

            <div className='CommentRight'><img src={liked ? Like : DisLike} alt="" onClick={handleLike} /></div>
        </div>
  )
}

export default CommentFromModel