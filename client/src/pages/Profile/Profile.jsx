import Posts from '../../Components/Posts/Posts'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import NavigationMain from '../../Components/NavigationMain/NavigationMain'
import './Profile.css'
import FollowersCard from '../../Components/FollowersCard/FollowersCard'
import NavigationBar from '../../Components/NavigationBar/NavigationBar'
import { useEffect, useState } from 'react'
import { getAllPosts } from '../../api/PostRequest'
import { getUser } from '../../api/UserRequest'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HeaderBarNotificitions from '../../Components/HeaderBar/HeaderBarNotificitions'
import HeaderBarProfile from '../../Components/HeaderBar/HeaderBarProfile'
import HeaderBarSearch from '../../Components/HeaderBar/HeaderBarSearch'
import HomeSide from '../../Components/HomeSide/HomeSide'
import HeaderBar from '../../Components/HeaderBar/HeaderBar'

const Profile = ({location}) => {
  const {user} = useSelector((state)=>state.authReducer.authData);
  const [allPosts, setAllPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(user);
  const params = useParams();
  const profileUserId = params.id;

  useEffect(()=>{
    const fetchAllPosts = async () => {
      const {data} = await getAllPosts();
      setAllPosts(data)
    }

    const fetchProfileUserData = async () => {
        const {data} = await getUser(params.id);
        setCurrentUser(data);
    }
    if(location !== undefined && location !== "activity" && location !== "home"){
      fetchAllPosts()
    }
    if(location !== "allposts" && location !== "activity" && location !== "home"){
      fetchProfileUserData()
    }
  },[location,params.id])

  return (
    <div className="Profile">
        <NavigationMain />

        {location === "home" && <HeaderBar/>}
        {location === "activity" && <HeaderBarNotificitions/>}
        {location === "allposts" && <HeaderBarSearch/>}
        {(location === "saved" || location === "profile") && <HeaderBarProfile user={user} currentUser={currentUser}/>}


        {location === "home" && 
        <HomeSide/>}

        {location !== "home" && 
        <div className="ProfileCenter">

            {location !== "allposts" && location !== "activity" && <ProfileCard allPosts={allPosts} currentUser={currentUser} profileUserId={profileUserId} />}
            {location !== "activity" && <Posts location={location} allPosts={allPosts}/>}
            {location === "activity" && <FollowersCard/>}

        </div>}
        
        <NavigationBar/>
    </div>
  )
}

export default Profile