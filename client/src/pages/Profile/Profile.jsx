import Posts from '../../Components/Posts/Posts'
import ProfileCard from '../../Components/ProfileCard/ProfileCard'
import NavigationMain from '../../Components/NavigationMain/NavigationMain'
import './Profile.css'
import NavigationBar from '../../Components/NavigationBar/NavigationBar'
import { useEffect, useState } from 'react'
import { getAllPosts } from '../../api/PostRequest'
import { getAllUser, getUser } from '../../api/UserRequest'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HeaderBarNotificitions from '../../Components/HeaderBar/HeaderBarNotificitions'
import HeaderBarProfile from '../../Components/HeaderBar/HeaderBarProfile'
import HeaderBarSearch from '../../Components/HeaderBar/HeaderBarSearch'
import HomeSide from '../../Components/HomeSide/HomeSide'
import HeaderBar from '../../Components/HeaderBar/HeaderBar'
import FollowersCardVertical from '../../Components/FollowerCardVertical/FollowerCardVertical'
import Notifications from '../../Components/Notifications/Notifications'
import { getTimelineNotifications } from '../../actions/userAction'
import SearchedUser from '../../Components/SearchedUser/SearchedUser'
import Conversations from '../../Components/Conversations/Conversations'

function togglemenu(){
  let submenu = document.getElementById("submenu");
  if(submenu?.classList?.contains("open-menu")){
    submenu?.classList?.remove("open-menu");
  }

  let submenu1 = document.getElementById("submenu1");
  if(submenu1?.classList?.contains("open-menu")){
    submenu1?.classList?.remove("open-menu");
  }
  const MiniNavigation = document.querySelector(".MiniNavigation");
  if(MiniNavigation?.classList?.contains("active")){
    MiniNavigation?.classList?.remove("active");
  }
}

const Profile = ({location}) => {
  const {user} = useSelector((state)=>state.authReducer.authData);
  let {posts} = useSelector((state)=>state.postReducer);
  const [allPosts, setAllPosts] = useState([]);
  const [persons, setPersons] = useState([]);
  const [currentUser, setCurrentUser] = useState(user);
  const [searchedName, setSearchedName] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const profileUserId = params.id;

  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight
  });
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight
    })
  }
  window.addEventListener("scroll", (event) => {
    let scroll = this.scrollY;
    console.log(scroll)
});
  
  useEffect(() => {
    window.addEventListener('resize', setDimension);
    return(() => {
        window.removeEventListener('resize', setDimension);
    })
  }, [screenSize])
  // console.log(screenSize.dynamicWidth);

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

    const fetchNotifications = async () => {
      dispatch(getTimelineNotifications(user._id))
    }

    if(location === "activity" || location === "search" || location === "home"){
      fetchPersons()
    }

    if(location !== "search" && location !== "activity" && location !== "home"){
      // fetchAllPosts()
    }
    if(location === "saved" || location === "profile"){
      fetchProfileUserData()
    }
    fetchNotifications()
  },[location,params.id,dispatch,user._id])

  return (
    <div className="Profile">
        <NavigationMain location={location} user={user} profileUserId={profileUserId} currentUser={currentUser} persons={persons} searchedName={searchedName} setSearchedName={setSearchedName} screenSize={screenSize}  />

        {location === "home" && <HeaderBar/>}
        {location === "activity" && <HeaderBarNotificitions/>}
        {(location === "search" || location === "allposts") && screenSize.dynamicWidth <= 700 && <HeaderBarSearch setSearchedName={setSearchedName} screenSize={screenSize} />}
        {(location === "saved" || location === "profile") && <HeaderBarProfile user={user} currentUser={currentUser}/>}


        {location === "home" && 
        <HomeSide posts={posts} location={location} persons={persons} screenSize={screenSize}/>}
        {location === "messages" && <Conversations screenSize={screenSize}/>}

        {location !== "home" && location !== "messages" &&
        <div className="ProfileCenter" onClick={togglemenu}>
            {(location === "saved" || location === "profile") && <ProfileCard location={location} posts={posts} currentUser={currentUser} profileUserId={profileUserId} />}
            {(location === "saved" || location === "profile" || location === "allposts" || location === "home") && <Posts location={location} posts={posts} persons={persons}/>}
            {location === "search" && <SearchedUser persons={persons} searchedName={searchedName} />}
            {location === "activity" && (user?.notifications?.length !== 0) && <Notifications location={location} currentUser={currentUser} profileUserId={profileUserId} user={user}/>}
            {location === "activity" && <FollowersCardVertical persons={persons}/>}

        </div>}
        
        {location !== "chatbox" && location !== "messages" && <NavigationBar location={location}/>}
    </div>
  )
}

export default Profile