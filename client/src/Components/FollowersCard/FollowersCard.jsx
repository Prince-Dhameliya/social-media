import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './FollowersCard.css'
import { followUser, unFollowUser } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';

const Follower = ({person,user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isfollowing, setIsFollowing] = useState(person.followers.includes(user._id))

    const handleFollow = (event) => {
        event.stopPropagation();
        isfollowing ? dispatch(unFollowUser(person._id, user)) : dispatch(followUser(person._id, user));
        setIsFollowing((prev)=>!prev)
    }

  return (
    <div className="Follower">
        <div onClick={()=>navigate(`/${person._id}`)}>
            <img src={person.profilePicture ? person.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} alt="" className="FollowerImage" />
            <div className="FollowerName">
                <span>{person.username}</span>
                <span>{person.firstname} {person.lastname}</span>
            </div>
        </div>

        <button className={isfollowing ? "button fc-button UnfollowButton" : "button fc-button"} onClick={handleFollow}>
            {isfollowing ? "Unfollow" : "Follow"}
        </button>
    </div>
  )
}

const FollowersCard = ({persons}) => {
    const {user} = useSelector((state)=>state.authReducer.authData)

  return (
    <div className="FollowersCard">
        <h3>People you may know</h3>

        <div className="FollowerList">
            {persons.map((person, id)=>{
                if(person?._id !== user?._id && !(person?.followers?.includes(user?._id))){
                    return <Follower person={person} user={user} key={id} />
                }
                return null;
            })}
        </div>
    </div>
  )
}

export default FollowersCard