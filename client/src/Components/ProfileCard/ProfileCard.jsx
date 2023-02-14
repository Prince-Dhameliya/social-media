import { useDispatch, useSelector } from 'react-redux'
import './ProfileCard.css'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useState } from 'react'

import PostIcon from '../../img/Posts.svg'
import Saved from '../../img/UnBookmark.svg'
import HorizontalIcon from '../../img/Horizontal3Dot.svg'
import ProfileModel from '../ProfileModal/ProfileModel'
import { followUser, unFollowUser } from '../../actions/userAction'
import axios from 'axios'
import ProfileOptionModel from '../DropdownButton/ProfileOptionModel'
import FollowingModel from '../FollowingModel/FollowingModel'
import FollowersModel from '../FollowersModel/FollowersModel'

const ProfileCard = ({location,currentUser,persons}) => {
  let {posts} = useSelector((state)=>state.postReducer);
  const dispatch = useDispatch();
  const param = useParams();
  const currentUserId = param.id;
  const {user} = useSelector((state)=>state.authReducer.authData)
  const [isfollowing, setIsFollowing] = useState(user.following.includes(currentUserId))

  const [openProfileModel, setOpenProfileModel] = useState(false);
  const [openFollowingModel, setOpenFollowingModel] = useState(false);
  const [openFollowersModel, setOpenFollowersModel] = useState(false);
  const [openProfileMore, setOpenProfileMore] = useState(false);
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
                <span>{currentUser.firstname} {currentUser.lastname} <img className="ProfileMoreIcon" src={HorizontalIcon} onClick={()=>setOpenProfileMore(true)} alt=''/><ProfileOptionModel open={openProfileMore} setOpen={setOpenProfileMore} currentUser={currentUser}/> </span>
                <span>{currentUser.bio ? currentUser.bio : null}</span>
            </div>

            {user._id === currentUserId && <div className="tempStuff">
                <div><span onClick={()=>setOpenProfileModel(true)}>Edit Profile</span>
                    <ProfileModel open={openProfileModel} setOpen={setOpenProfileModel} data = {user} />
                </div>
            </div>}

            {user._id !== currentUserId && <div className="tempStuff">
                <button className={isfollowing ? "button nfc-button UnfollowButton" : "button nfc-button"} onClick={handleFollow}>
                    {isfollowing ? "Unfollow" : "Follow"}
                </button>
                <button className={"button nfc-button UnfollowButton"} onClick={handleMessage}>
                    Message
                </button>
            </div>}

            <div className="FollowStatus">
                <hr />
                <div>
                    <div className="Follow" onClick={()=>setOpenFollowingModel(true)}>
                        <span>{currentUser.following.length}</span>
                        <span>Following</span>
                    </div>
                    <div className="vl"></div>
                    <div className="Follow" onClick={()=>setOpenFollowersModel(true)}>
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
                <FollowingModel open={openFollowingModel} setOpen={setOpenFollowingModel} persons={persons} currentUser={currentUser}/>
                <FollowersModel open={openFollowersModel} setOpen={setOpenFollowersModel} persons={persons} currentUser={currentUser}/>
            </div>

            <div className="ProfilePosts">
                <Link style={{textDecoration: "none", color: "inherit"}} to={`../${currentUserId}`}><div id="profile" className={active === "profile" ? "active ProfilePostsButton" : "ProfilePostsButton"} onClick={handleClick}>
                    <img className="ProfilePostsButton_Icon" src={PostIcon} alt="" />
                    <span className="ProfilePostsButton_Title">POSTS</span>
                </div></Link>

                {user._id === currentUserId && <Link style={{textDecoration: "none", color: "inherit"}} to={`../${currentUserId}/saved`}><div id="saved" className={active === "saved" ? "active ProfilePostsButton" : "ProfilePostsButton"} onClick={handleClick}>
                    <img className="ProfilePostsButton_Icon" src={Saved} alt="" />
                    <span className="ProfilePostsButton_Title">SAVED</span>
                </div></Link>
                }
            </div>
            
        </div>
    )
}

export default ProfileCard