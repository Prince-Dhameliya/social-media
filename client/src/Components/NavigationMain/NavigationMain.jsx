import { useDispatch } from 'react-redux'
import './NavigationMain.css'
import { Link } from 'react-router-dom'
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
import Logo from '../../img/logo.png'
import { useState } from 'react'
import DeleteModel from '../DeleteModel/DeleteModel'
import Notifications from '../Notifications/Notifications'
import HeaderBarSearch from '../HeaderBar/HeaderBarSearch'
import SearchedUser from '../SearchedUser/SearchedUser'

function togglemenu(){
  let submenu = document.getElementById("submenu");
  submenu.classList.toggle("open-menu");
}

const NavigationMain = ({location,user,currentUser,profileUserId,persons,searchedName,setSearchedName,screenSize}) => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut())
  }

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(location);

  const handleClick = (event) => {
    const MiniNavigation = document.querySelector(".MiniNavigation");
    if(event.target.id === "100006"){
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
      setActive("allposts");
      if(MiniNavigation.classList.contains("active")){
        MiniNavigation.classList.remove("active");
      }
    }
    else if(event.target.id === "100012"){
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
    }
    else if(event.target.id === "100010"){
      setActive("activity");
      if(MiniNavigation){
        MiniNavigation.classList.toggle("active");
      }
    }
    else if(event.target.id === "100011"){
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
          <Link style={{textDecoration: "none", color: "inherit"}} to="../"><div id="100006" className="navigation_row" onClick={handleClick}>
            <img src={active === "home" ? Home : WHome} alt="" className='navigation_icon' />
            <span className="navigation_title">Home</span>
          </div>
          </Link>
          <Link style={{textDecoration: "none", color: "inherit"}} to=""><div id="100007" className="navigation_row" onClick={handleClick}>
            <img src={active === "search" ? Search : WSearch} alt="" className='navigation_icon' />
            <span className="navigation_title">Search</span>
          </div>
          </Link>
          <Link style={{textDecoration: "none", color: "inherit"}} to="../explore"><div id="100008" className="navigation_row" onClick={handleClick}>
            <img src={active === "allposts" ? Explore : WExplore} alt="" className='navigation_icon' />
            <span className="navigation_title">Explore</span>
          </div>
          </Link>
          <Link style={{textDecoration: "none", color: "inherit"}} to="../messages"><div id="100012" className="navigation_row" onClick={handleClick}>
            <img src={active === "messages" ? Message : WMessage} alt="" className='navigation_icon' />
            <span className="navigation_title">Messages</span>
          </div>
          </Link>
          <Link style={{textDecoration: "none", color: "inherit"}} to=""><div id="100009" className="navigation_row" onClick={handleClick}>
            <img src={active === "createpost" ? AddObj : WAddObj} alt="" className='navigation_icon' />
            <span className="navigation_title">Create</span>
          </div>
          </Link>
          <Link style={{textDecoration: "none", color: "inherit"}} to=""><div id="100010" className="navigation_row" onClick={handleClick}>
            <img src={active === "activity" ? Like : WLike} style={{width:"23px",marginLeft:"1px"}} alt="" className='navigation_icon' />
            <span className="navigation_title">Notifications</span>
          </div>
          </Link>
          <Link style={{textDecoration: "none", color: "inherit"}} to={`../${user._id}`}><div id="100011" className="navigation_row" onClick={handleClick}>
            <img src={user.profilePicture ? user.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} alt="" className={active === "profile" ? "active navigation_icon navigation_profileIcon" : "navigation_icon navigation_profileIcon"} />
            <span className={active === "profile" ? "active navigation_title navigation_profileTitle" : "navigation_title navigation_profileTitle"}>Profile</span>
          </div>
          </Link>
        </div>
      </div>

      <div className="moreItems" id="moreItems" onClick={togglemenu}>
        <img src={More} alt="" className='navigation_icon' />
        <span className="navigation_title">More</span>
      </div>
    </div>

    <div className="sub-menu-wrap sub-menu-pc" id="submenu">
        <div className="sub-menu">
            <div className="sub-menu-link">
                <p>Settings</p>
                <span><img alt="" src={Settings}/></span>
            </div>
            <hr/>
            <Link style={{textDecoration: "none", color: "inherit"}} to={`/${user._id}/saved`}><div className="sub-menu-link">
                <p>Saved</p>
                <span><img alt="" src={Saved}/></span>
            </div></Link>
            <hr/>
            <div className="sub-menu-link">
                <p>Switch appearance</p>
                <span><img alt="" src={Mode}/></span>
            </div>
            <hr/>
            <div className="sub-menu-link" onClick={()=>setOpen(true)}>
                <p style={{color: "red"}}>Delete Account</p>
                <span><img alt="" src={Delete}/></span>
            </div>
            <DeleteModel open={open} setOpen={setOpen} user={user} currentUser={currentUser} />
            <hr/>
            <div className="sub-menu-link" onClick={handleLogOut}>
                <p style={{color: "red"}}>Log out</p>
            </div>
        </div>
    </div>

    {screenSize.dynamicWidth > 700 && <div id="MiniNavigation" className="MiniNavigation">
        <div className="MiniNavigationLeft">
            <div className="logoAndStuff">
              <div className="logoTitle">
                  <img src={Logo} alt="" className='logo_icon mini_logo_icon' />
              </div>
              <div className="navigationItems">
                <Link style={{textDecoration: "none", color: "inherit"}} to="../"><div id="100006" className="navigation_row" onClick={handleClick}>
                  <img src={active === "home" ? Home : WHome} alt="" className='navigation_icon' />
                </div>
                </Link>
                <Link style={{textDecoration: "none", color: "inherit"}} to=""><div id="100007" className={active === "search" ? "mininavigation_row" : "navigation_row"} onClick={handleClick}>
                  <img src={active === "search" ? Search : WSearch} alt="" className='navigation_icon' />
                </div>
                </Link>
                <Link style={{textDecoration: "none", color: "inherit"}} to="../explore"><div id="100008" className="navigation_row" onClick={handleClick}>
                  <img src={active === "allposts" ? Explore : WExplore} alt="" className='navigation_icon' />
                </div>
                </Link>
                <Link style={{textDecoration: "none", color: "inherit"}} to="../messages"><div id="100012" className="navigation_row" onClick={handleClick}>
                  <img src={active === "messages" ? Message : WMessage} alt="" className='navigation_icon' />
                </div>
                </Link>
                <Link style={{textDecoration: "none", color: "inherit"}} to=""><div id="100009" className="navigation_row" onClick={handleClick}>
                  <img src={active === "createpost" ? AddObj : WAddObj} alt="" className='navigation_icon' />
                </div>
                </Link>
                <Link style={{textDecoration: "none", color: "inherit"}} to=""><div id="100010" className={active === "activity" ? "mininavigation_row" : "navigation_row"} onClick={handleClick}>
                  <img src={active === "activity" ? Like : WLike} style={{width:"23px",marginLeft:"1px"}} alt="" className='navigation_icon' />
                </div>
                </Link>
                <Link style={{textDecoration: "none", color: "inherit"}} to={`../${user._id}`}><div id="100011" className="navigation_row" onClick={handleClick}>
                  <img src={user.profilePicture ? user.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} alt="" className={active === "profile" ? "active navigation_icon navigation_profileIcon" : "navigation_icon navigation_profileIcon"} />
                </div>
                </Link>
              </div>
            </div>

            <div className="moreItems" id="moreItems" onClick={togglemenu}>
              <img src={More} alt="" className='navigation_icon' />
            </div>
        </div>

        <div className="MiniNavigationRight">
            {active === "search" && <h2>Search</h2> }
            {active === "activity" && <h2>Notifications</h2> }
            <div className="MiniNavigationRightStuff">
                {active === "activity" && (user?.notifications?.length !== 0) && <Notifications location={location} currentUser={currentUser} profileUserId={profileUserId} user={user}/>}
                {active === "search" && <HeaderBarSearch setSearchedName={setSearchedName} screenSize={screenSize} />}
                {active === "search" && <SearchedUser persons={persons} searchedName={searchedName} />}
            </div>
        </div>
    </div>}
    </>
  )
}

export default NavigationMain