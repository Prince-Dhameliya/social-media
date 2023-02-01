import { useDispatch, useSelector } from 'react-redux'
import './ProfileCard.css'
import {Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'

import PostIcon from '../../img/Posts.svg'
import Saved from '../../img/UnBookmark.svg'
import ProfileModel from '../ProfileModal/ProfileModel'
import { followUser, unFollowUser } from '../../actions/userAction'
import axios from 'axios'

const ProfileCard = ({location,posts,currentUser,profileUserId}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.authReducer.authData)
  const [isfollowing, setIsFollowing] = useState(user.following.includes(profileUserId))

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(location);
  const navigate = useNavigate();

  const handleFollow = () => {
    setIsFollowing((prev)=>!prev)
    isfollowing ? dispatch(unFollowUser(currentUser._id, user)) : dispatch(followUser(currentUser._id, user));
  }

  const handleMessage = async () => {
    const {data} = await axios.post(`/api/conversations/`,{
        senderId: user._id,
        receiverId: currentUser?._id,
    })
    navigate(`/messages/${data?._id}`);
  }


  const handleClick = (event) => {
    setActive(event.target.id);
  }

  return (
        <div className="ProfileCard">
            <div className="ProfileImages">
                <img src={currentUser.coverPicture ? currentUser.coverPicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662226/Default/defaultCover_kadawa.jpg" } alt="" />
                <img src={currentUser.profilePicture ? currentUser.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png" } alt="" />
            </div>

            <div className="ProfileName">
                <span>{currentUser.firstname} {currentUser.lastname}</span>
                <span>{currentUser.bio ? currentUser.bio : null}</span>
            </div>

            {user._id === profileUserId && <div className="tempStuff">
                <div><span onClick={()=>setOpen(true)}>Edit Profile</span>
                    <ProfileModel open={open} setOpen={setOpen} data = {user} />
                </div>
            </div>}

            {user._id !== profileUserId && <div className="tempStuff">
                <button className={isfollowing ? "button fc-buttonVertical UnfollowButton" : "button fc-buttonVertical"} onClick={handleFollow}>
                    {isfollowing ? "Unfollow" : "Follow"}
                </button>
                <button className={"button fc-buttonVertical UnfollowButton"} onClick={handleMessage}>
                    Message
                </button>
            </div>}

            <div className="FollowStatus">
                <hr />
                <div>
                    <div className="Follow">
                        <span>{currentUser.following.length}</span>
                        <span>Following</span>
                    </div>
                    <div className="vl"></div>
                    <div className="Follow">
                        <span>{currentUser.followers.length}</span>
                        <span>Followers</span>
                    </div>

                    
                    <div className="vl">

                    </div>
                    <div className="Follow">
                        <span>{posts.filter((post)=>post.userId === currentUser._id).length}</span>
                        <span>Posts</span>
                    </div>
                </div>
            </div>

            <div className="ProfilePosts">
                <Link style={{textDecoration: "none", color: "inherit"}} to={`../${profileUserId}`}><div id="profile" className={active === "profile" ? "active ProfilePostsButton" : "ProfilePostsButton"} onClick={handleClick}>
                    <img className="ProfilePostsButton_Icon" src={PostIcon} alt="" />
                    <span className="ProfilePostsButton_Title">POSTS</span>
                </div></Link>

                {user._id === profileUserId && <Link style={{textDecoration: "none", color: "inherit"}} to={`../${profileUserId}/saved`}><div id="saved" className={active === "saved" ? "active ProfilePostsButton" : "ProfilePostsButton"} onClick={handleClick}>
                    <img className="ProfilePostsButton_Icon" src={Saved} alt="" />
                    <span className="ProfilePostsButton_Title">SAVED</span>
                </div></Link>
                }
            </div>
        </div>
    )
}

export default ProfileCard