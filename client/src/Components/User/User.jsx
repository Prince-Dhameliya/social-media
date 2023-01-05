import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { followUser, unFollowUser } from '../../actions/userAction';

const User = ({person}) => {
    const dispatch = useDispatch();
    const {user} = useSelector((state)=>state.authReducer.authData)
    const [isfollowing, setIsFollowing] = useState(person.followers.includes(user._id))

    const handleFollow = () => {
        isfollowing ? dispatch(unFollowUser(person._id, user)) : dispatch(followUser(person._id, user));
        setIsFollowing((prev)=>!prev)
    }
  return (
    <div className="Follower">
        <div>
            <img src={person.coverPicture ? person.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} alt="" className="FollowerImage" />
            <div className="FollowerName">
                <span><Link style={{textDecoration: "none", color: "inherit"}} to={`/${person._id}`}>{person.username}</Link></span>
                <span>{person.firstname} {person.lastname}</span>
            </div>
        </div>

        <button className={isfollowing ? "button fc-button UnfollowButton" : "button fc-button"} onClick={handleFollow}>
            {isfollowing ? "Unfollow" : "Follow"}
        </button>
    </div>
  )
}

export default User