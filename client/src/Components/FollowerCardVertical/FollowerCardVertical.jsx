import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import './FollowerCardVertical.css'
import { useNavigate } from 'react-router-dom';
import { followUser, unFollowUser } from '../../actions/userAction';

export const FollowerVertical = ({person}) => {
    const {user} = useSelector((state)=>state.authReducer.authData)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isfollowing, setIsFollowing] = useState(person.followers.includes(user._id))

    const handleFollow = (event) => {
        event.stopPropagation();
        isfollowing ? dispatch(unFollowUser(person._id, user)) : dispatch(followUser(person._id, user));
        setIsFollowing((prev)=>!prev)
    }

  return (
    <div className="FollowerVertical">
        <div>
            <img src={person.profilePicture ? person.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} alt="" className="FollowerImageVertical" onClick={()=>navigate(`/${person._id}`)} />
            <div className="FollowerNameVertical">
                <span onClick={()=>navigate(`/${person._id}`)}>{person.username}</span>
                <span>{person.firstname} {person.lastname}</span>
            </div>
        </div>

        <button className={isfollowing ? "button fc-buttonVertical UnfollowButton" : "button fc-buttonVertical"} onClick={handleFollow}>
            {isfollowing ? "Unfollow" : "Follow"}
        </button>
    </div>
  )
}

const FollowersCardVertical = ({persons}) => {
    const {user} = useSelector((state)=>state.authReducer.authData)

  return (
    <div className="FollowersCardVertical">
        <h3>People you may know</h3>

        <div className="FollowerListVertical">
            {persons.map((person, id)=>{
                if(person._id !== user._id){
                    return <FollowerVertical person={person} key={id} />
                }
                return null;
            })}
        </div>
    </div>
  )
}

export default FollowersCardVertical