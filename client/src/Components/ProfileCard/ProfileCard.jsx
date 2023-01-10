import { useSelector } from 'react-redux'
import './ProfileCard.css'
import {Link} from 'react-router-dom'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useState } from 'react'

import PostIcon from '../../img/Posts.svg'
import Saved from '../../img/UnBookmark.svg'

const ProfileCard = ({allPosts,currentUser,profileUserId}) => {
  const {user} = useSelector((state)=>state.authReducer.authData)

  const [modalOpened, setModalOpened] = useState(false);

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

            <div className="tempStuff">
                {user._id === profileUserId && 
                    <div><span onClick={()=>setModalOpened(true)}>Edit Profile</span>
                    <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data = {user} /></div>
                }
            </div>

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
                        <span>{allPosts.filter((post)=>post.userId === profileUserId).length}</span>
                        <span>Posts</span>
                    </div>
                </div>
            </div>

            <div className="ProfilePosts">
                <Link style={{textDecoration: "none", color: "inherit"}} to={`/${profileUserId}`}><div className="ProfilePostsButton active">
                    <img className="ProfilePostsButton_Icon" src={PostIcon} alt="" />
                    <span className="ProfilePostsButton_Title">POSTS</span>
                </div></Link>

                {user._id === profileUserId && <Link style={{textDecoration: "none", color: "inherit"}} to={`/${user._id}/saved`}><div className="ProfilePostsButton">
                    <img className="ProfilePostsButton_Icon" src={Saved} alt="" />
                    <span className="ProfilePostsButton_Title">SAVED</span>
                </div></Link>
                }
            </div>
        </div>
    )
}

export default ProfileCard