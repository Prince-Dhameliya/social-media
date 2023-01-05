import Posts from '../../Components/Posts/Posts'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import NavigationMain from '../../Components/NavigationMain/NavigationMain'
import './Profile.css'

const Profile = ({location}) => {
  return (
    <div className="Profile">
        <NavigationMain />
        <div className="ProfileCenter">
            <ProfileCard/>
            <Posts location={location}/>
        </div>
    </div>
  )
}

export default Profile