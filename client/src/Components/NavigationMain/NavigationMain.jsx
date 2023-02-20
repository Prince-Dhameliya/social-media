import { useDispatch, useSelector } from 'react-redux'
import './NavigationMain.css'
import { Link, useNavigate } from 'react-router-dom'
import { logOut } from '../../actions/AuthAction'

import Home from '../../img/home.svg'
import WHome from '../../img/Whitehome.svg'
import Search from '../../img/Search.svg'
import WSearch from '../../img/WhiteSearch.svg'
import AddObj from '../../img/AddObject.svg'
import WAddObj from '../../img/WhiteAddObject.svg'
import Like from '../../img/likeBlack.svg'
import WLike from '../../img/dislike.svg'
import Explore from '../../img/Explore.svg'
import WExplore from '../../img/WhiteExplore.svg'
import WMessage from '../../img/Message1.svg'
import Message from '../../img/Message.svg'

import More from '../../img/More.svg'
import Settings from '../../img/Settings.svg'
import Saved from '../../img/UnBookmark.svg'
import Delete from '../../img/Delete.svg'
import Mode from '../../img/Mode.svg'
import Logo from '../../img/Logo.svg'
import { useState } from 'react'
import DeleteModel from '../DeleteModel/DeleteModel'
import Notifications from '../Notifications/Notifications'
import HeaderBarSearch from '../HeaderBar/HeaderBarSearch'
import SearchedUser from '../SearchedUser/SearchedUser'
import CreatePost from '../CreatePost/CreatePost'
import ProfileOptionModel from '../DropdownButton/ProfileOptionModel'

const NavigationMain = ({location,currentUser,profileUserId,persons,searchedName,setSearchedName,screenSize}) => {
  const {user} = useSelector((state)=>state.authReducer.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(logOut())
  }

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [active, setActive] = useState(location);
  const [openProfileMore, setOpenProfileMore] = useState(false);

  const handleLoader = () => {
    const Loader = document.querySelector(".headLoader");
    Loader.classList.add("active");
      setInterval(() => {
        Loader.classList.remove("active");
      }, 1000);
  }

  const handleClick = (event) => {
    const MiniNavigation = document.querySelector(".MiniNavigation");
    
    if(event.target.id === "100006"){
      handleLoader();
      navigate("../");
      setActive("home");
      if(MiniNavigation.classList.contains("active")){
        MiniNavigation.classList.remove("active");
      }
    }
    else if(event.target.id === "100007"){
      setSearchedName([])
      setActive("search");
      if(MiniNavigation){
        MiniNavigation.classList.toggle("active");
      }
    }
    else if(event.target.id === "100008"){
      handleLoader();
      navigate("../explore");
      setActive("allposts");
      if(MiniNavigation.classList.contains("active")){
        MiniNavigation.classList.remove("active");
      }
    }
    else if(event.target.id === "100012"){
      handleLoader();
      navigate("../messages");
      setActive("messages");
      if(MiniNavigation.classList.contains("active")){
        MiniNavigation.classList.remove("active");
      }
    }
    else if(event.target.id === "100009"){
      setActive("createpost");
      if(MiniNavigation.classList.contains("active")){
        MiniNavigation.classList.remove("active");
      }
      setOpen(true);
    }
    else if(event.target.id === "100010"){
      setActive("activity");
      if(MiniNavigation){
        MiniNavigation.classList.toggle("active");
      }
    }
    else if(event.target.id === "100011"){
      handleLoader();
      navigate(`../${user._id}`);
      setActive("profile");
      if(MiniNavigation.classList.contains("active")){
        MiniNavigation.classList.remove("active");
      }
    }
  }

  return (
    <>
    <div id="NavigationMain" className="NavigationMain">
      <div className="logoAndStuff">
        <div className="logoTitle">
            <img src={Logo} alt="" className='logo_icon' />
            <span className="logo_Title">Social Point</span>
        </div>
        <div className="navigationItems">
          <div id="100006" className="navigation_row" onClick={handleClick}>
            <img src={active === "home" ? Home : WHome} alt="" className='navigation_icon' />
            <span className="navigation_title">Home</span>
          </div>
          <div id="100007" className="navigation_row" onClick={handleClick}>
            <img src={active === "search" ? Search : WSearch} alt="" className='navigation_icon' />
            <span className="navigation_title">Search</span>
          </div>
          <div id="100008" className="navigation_row" onClick={handleClick}>
            <img src={active === "allposts" ? Explore : WExplore} alt="" className='navigation_icon' />
            <span className="navigation_title">Explore</span>
          </div>
          <div id="100012" className="navigation_row" onClick={handleClick}>
            <img src={active === "messages" ? Message : WMessage} alt="" className='navigation_icon' />
            <span className="navigation_title">Messages</span>
          </div>
          <div id="100009" className="navigation_row" onClick={handleClick}>
            <img src={active === "createpost" ? AddObj : WAddObj} alt="" className='navigation_icon' />
            <span className="navigation_title">Create</span>
          </div>
          <div id="100010" className="navigation_row" onClick={handleClick}>
            <img src={active === "activity" ? Like : WLike} style={{width:"23px",marginLeft:"1px"}} alt="" className='navigation_icon' />
            <span className="navigation_title">Notifications</span>
          </div>
          <div id="100011" className="navigation_row" onClick={handleClick}>
            <img src={user.profilePicture ? user.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} alt="" className={active === "profile" ? "active navigation_icon navigation_profileIcon" : "navigation_icon navigation_profileIcon"} />
            <span className={active === "profile" ? "active navigation_title navigation_profileTitle" : "navigation_title navigation_profileTitle"}>Profile</span>
          </div>
        </div>
      </div>

      <CreatePost open={open} setOpen={setOpen}/>
      <ProfileOptionModel open={openProfileMore} setOpen={setOpenProfileMore} navigate={true} currentUser={currentUser}/>
      <div className="moreItems" id="moreItems" onClick={()=>setOpenProfileMore(true)}>
        <img src={More} alt="" className='navigation_icon' />
        <span className="navigation_title">More</span>
      </div>
    </div>
    

    {screenSize.dynamicWidth > 700 && <div id="MiniNavigation" className="MiniNavigation">
        <div className="MiniNavigationLeft">
            <div className="logoAndStuff">
              <div className="logoTitle">
                  <img src={Logo} alt="" className='logo_icon mini_logo_icon' />
              </div>
              <div className="navigationItems">
                <div id="100006" className="navigation_row" onClick={handleClick}>
                  <img src={active === "home" ? Home : WHome} alt="" className='navigation_icon' />
                </div>
                <div id="100007" className={active === "search" ? "mininavigation_row" : "navigation_row"} onClick={handleClick}>
                  <img src={active === "search" ? Search : WSearch} alt="" className='navigation_icon' />
                </div>
                <div id="100008" className="navigation_row" onClick={handleClick}>
                  <img src={active === "allposts" ? Explore : WExplore} alt="" className='navigation_icon' />
                </div>
                <div id="100012" className="navigation_row" onClick={handleClick}>
                  <img src={active === "messages" ? Message : WMessage} alt="" className='navigation_icon' />
                </div>
                <div id="100009" className="navigation_row" onClick={handleClick}>
                  <img src={active === "createpost" ? AddObj : WAddObj} alt="" className='navigation_icon' />
                </div>
                <div id="100010" className={active === "activity" ? "mininavigation_row" : "navigation_row"} onClick={handleClick}>
                  <img src={active === "activity" ? Like : WLike} style={{width:"23px",marginLeft:"1px"}} alt="" className='navigation_icon' />
                </div>
                <div id="100011" className="navigation_row" onClick={handleClick}>
                  <img src={user.profilePicture ? user.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} alt="" className={active === "profile" ? "active navigation_icon navigation_profileIcon" : "navigation_icon navigation_profileIcon"} />
                </div>
              </div>
            </div>

            <div className="moreItems" id="moreItems" onClick={()=>setOpenProfileMore(true)}>
              <img src={More} alt="" className='navigation_icon' />
            </div>
        </div>

        <div className="MiniNavigationRight">
            {active === "search" && <h2>Search</h2> }
            {active === "activity" && <h2>Notifications</h2> }
            <div className="MiniNavigationRightStuff">
                {active === "activity" && (user?.notifications?.length !== 0) && <Notifications location={location} currentUser={currentUser} profileUserId={profileUserId}/>}
                {active === "search" && <HeaderBarSearch setSearchedName={setSearchedName} screenSize={screenSize} />}
                {active === "search" && <SearchedUser persons={persons} searchedName={searchedName} />}
            </div>
        </div>
    </div>}
    </>
  )
}

export default NavigationMain