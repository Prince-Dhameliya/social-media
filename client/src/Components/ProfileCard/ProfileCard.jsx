import { useSelector } from 'react-redux'
import './ProfileCard.css'
import {Link} from 'react-router-dom'

const ProfileCard = ({location}) => {
  const {user} = useSelector((state)=>state.authReducer.authData)
  const posts = useSelector((state)=>state.postReducer.posts)

  return (
    <div className="ProfileCard">
        <div className="ProfileImages">
            <img src={user.coverPicture ? user.coverPicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662226/Default/defaultCover_kadawa.jpg" } alt="" />
            <img src={user.coverPicture ? user.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png" } alt="" />
        </div>

        <div className="ProfileName">
            <span>{user.firstname} {user.lastname}</span>
            <span>{user.workAt ? user.workAt : "Write about yourself"}</span>
        </div>

        <div className="FollowStatus">
            <hr />
            <div>
                <div className="Follow">
                    <span>{user.following.length}</span>
                    <span>Following</span>
                </div>
                <div className="vl"></div>
                <div className="Follow">
                    <span>{user.followers.length}</span>
                    <span>Followers</span>
                </div>

                {location === "profilePage" && (
                    <>
                        <div className="vl">

                        </div>
                        <div className="Follow">
                            <span>{posts.filter((post)=>post.userId === user._id).length}</span>
                            <span>Posts</span>
                        </div>
                    </>
                )}
            </div>
            <hr />
        </div>

        {location !== "profilePage" && (
            <span>
                <Link style={{textDecoration: "none", color: "inherit"}} to={`/profile/${user._id}`}>My Profile</Link>
            </span>
        )}
    </div>
  )
}

export default ProfileCard