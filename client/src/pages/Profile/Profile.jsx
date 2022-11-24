import PostSide from '../../Components/PostSide/PostSide'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import ProfileLeft from '../../Components/ProfileLeft/ProfileLeft'
import RightSide from '../../Components/RightSide/RightSide'
import './Profile.css'

const Profile = () => {
  
  return (
    <div className="Profile">
        <ProfileLeft />
        <div className="ProfileCenter">
            <ProfileCard location ="profilePage" />
            <PostSide />
        </div>
        <RightSide />
    </div>
  )
}

export default Profile