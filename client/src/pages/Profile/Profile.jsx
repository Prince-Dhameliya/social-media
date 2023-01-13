import Posts from '../../Components/Posts/Posts'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import NavigationMain from '../../Components/NavigationMain/NavigationMain'
import './Profile.css'
import NavigationBar from '../../Components/NavigationBar/NavigationBar'
import { useEffect, useState } from 'react'
import { getAllPosts } from '../../api/PostRequest'
import { getAllUser, getUser } from '../../api/UserRequest'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HeaderBarNotificitions from '../../Components/HeaderBar/HeaderBarNotificitions'
import HeaderBarProfile from '../../Components/HeaderBar/HeaderBarProfile'
import HeaderBarSearch from '../../Components/HeaderBar/HeaderBarSearch'
import HomeSide from '../../Components/HomeSide/HomeSide'
import HeaderBar from '../../Components/HeaderBar/HeaderBar'
import FollowersCardVertical from '../../Components/FollowerCardVertical/FollowerCardVertical'
import Notifications from '../../Components/Notifications/Notifications'

function togglemenu(){
  let submenu = document.getElementById("submenu");
  if(submenu?.classList?.contains("open-menu")){
    submenu?.classList?.remove("open-menu");
  }

  let submenu1 = document.getElementById("submenu1");
  if(submenu1?.classList?.contains("open-menu")){
    submenu1?.classList?.remove("open-menu");
  }
}

const Profile = ({location}) => {
  const {user} = useSelector((state)=>state.authReducer.authData);
  const [allPosts, setAllPosts] = useState([]);
  const [persons, setPersons] = useState([]);
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

    const fetchPersons = async () => {
        const {data} = await getAllUser();
        setPersons(data)
    }

    if(location !== "saved" && location !== "allposts" && location !== "profile"){
      fetchPersons()
    }

    if(location !== "activity" && location !== "home"){
      fetchAllPosts()
    }
    if(location !== "allposts" && location !== "activity" && location !== "home"){
      fetchProfileUserData()
    }
  },[location,params.id])

  return (
    <div className="Profile">
        <NavigationMain location={location} user={user} currentUser={currentUser} />

        {location === "home" && <HeaderBar/>}
        {location === "activity" && <HeaderBarNotificitions/>}
        {location === "allposts" && <HeaderBarSearch/>}
        {(location === "saved" || location === "profile") && <HeaderBarProfile user={user} currentUser={currentUser}/>}


        {location === "home" && 
        <HomeSide persons={persons}/>}

        {location !== "home" && 
        <div className="ProfileCenter" onClick={togglemenu}>

            {location !== "home" && location !== "allposts" && location !== "activity" && <ProfileCard location={location} allPosts={allPosts} currentUser={currentUser} profileUserId={profileUserId} />}
            {location !== "activity" && <Posts location={location} allPosts={allPosts} persons={persons}/>}
            {location === "activity" && (user?.notifications?.length !== 0) && <Notifications location={location} user={user}/>}
            {location === "activity" && <FollowersCardVertical persons={persons}/>}

        </div>}
        
        <NavigationBar location={location}/>
    </div>
  )
}

export default Profile