import { useSelector } from 'react-redux'
import './ProfileCard.css'
import {Link, useParams} from 'react-router-dom'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest'

import PostIcon from '../../img/Posts.svg'
import Saved from '../../img/UnBookmark.svg'

const ProfileCard = () => {
  const {user} = useSelector((state)=>state.authReducer.authData)
  const [currentProfileUser, setCurrentProfileUser] = useState(user);
  const posts = useSelector((state)=>state.postReducer.posts)
  const params = useParams();
  const profileUserId = params.id;

  useEffect(()=>{
    const fetchProfileUserData = async () => {
        const {data} = await getUser(params.id);
        setCurrentProfileUser(data);
    }
    fetchProfileUserData();
  },[params.id])

  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="ProfileCard">
        <div className="ProfileImages">
            <img src={currentProfileUser.coverPicture ? currentProfileUser.coverPicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662226/Default/defaultCover_kadawa.jpg" } alt="" />
            <img src={currentProfileUser.coverPicture ? currentProfileUser.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png" } alt="" />
        </div>

        <div className="ProfileName">
            <span>{currentProfileUser.firstname} {currentProfileUser.lastname}</span>
            <span>{currentProfileUser.bio ? currentProfileUser.bio : null}</span>
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
                    <span>{currentProfileUser.following.length}</span>
                    <span>Following</span>
                </div>
                <div className="vl"></div>
                <div className="Follow">
                    <span>{currentProfileUser.followers.length}</span>
                    <span>Followers</span>
                </div>

                
                <div className="vl">

                </div>
                <div className="Follow">
                    <span>{posts.filter((post)=>post.userId === currentProfileUser._id).length}</span>
                    <span>Posts</span>
                </div>
            </div>
        </div>

        <div className="ProfilePosts">
            <Link style={{textDecoration: "none", color: "inherit"}} to={`/${user._id}`}><div className="ProfilePostsButton active">
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