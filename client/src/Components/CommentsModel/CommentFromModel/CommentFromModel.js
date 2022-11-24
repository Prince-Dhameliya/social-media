import React from 'react'
import Send from '../../../img/send.svg'
import time from 'time-ago';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../../actions/postAction';

const CommentFromModel = ({comment,data}) => {
    const {user}  = useSelector((state)=>state.authReducer.authData)
    const dispatch = useDispatch();

    const handleDeleteComment = async () => {
        dispatch(deleteComment(data._id, comment.commentId));
      }
  return (
        <div className="CommentWindow">
            <div className="CommentLeft">
                <img src={comment.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + comment.profilePicture: ""} style={{cursor: "pointer"}} alt="" />

                <div className="CommentInfo">
                    <div className="CommentUserInfo">
                        <span><b>{comment.username}</b></span>
                        <span> {comment.comment}</span>
                    </div>

                    <div className="CommentAction">
                        <span style={{fontSize: "12px", color: "rgb(147, 147, 147)"}}>{time.ago(comment.createdAt)}</span>
                        <span style={{fontSize: "13px", color: "rgb(158, 158, 158)"}}><b>{comment.likes} likes</b></span>
                        <span style={{fontSize: "13px", color: "rgb(158, 158, 158)"}}><b>Reply</b></span>
                        {(comment.userId) === (user._id) && (<span style={{fontSize: "13px", color: "rgb(158, 158, 158)",cursor: "pointer"}} onClick={handleDeleteComment} ><b>Delete</b></span>)}
                    </div>
                </div>
            </div>

            <div><img src={Send} style={{cursor: "pointer",width: "20px"}} alt="" /></div>
        </div>
  )
}

export default CommentFromModel