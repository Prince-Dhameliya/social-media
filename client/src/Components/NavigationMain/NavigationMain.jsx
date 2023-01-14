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

import More from '../../img/More.svg'
import Settings from '../../img/Settings.svg'
import Saved from '../../img/UnBookmark.svg'
import Delete from '../../img/Delete.svg'
import Mode from '../../img/Mode.svg'
import Logo from '../../img/logo.png'
import { useState } from 'react'
import DeleteModel from '../DeleteModel/DeleteModel'

function togglemenu(){
  let submenu = document.getElementById("submenu");
  submenu.classList.toggle("open-menu");
}

const NavigationMain = ({location,user,currentUser}) => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut())
  }

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(location);

  const handleClick = (event) => {
    if(event.target.id === "100006"){
      setActive("home");
    }
    else if(event.target.id === "100007"){
      setActive("allposts");
    }
    else if(event.target.id === "100008"){
      setActive("createpost");
    }
    else if(event.target.id === "100009"){
      setActive("activity");
    }
    else if(event.target.id === "100010"){
      setActive("profile");
    }
  }

  return (
    <div className="NavigationMain">
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
          <Link style={{textDecoration: "none", color: "inherit"}} to="../explore"><div id="100007" className="navigation_row" onClick={handleClick}>
            <img src={active === "allposts" ? Search : WSearch} alt="" className='navigation_icon' />
            <span className="navigation_title">Search</span>
          </div>
          </Link>
          <Link style={{textDecoration: "none", color: "inherit"}} to=""><div id="100008" className="navigation_row" onClick={handleClick}>
            <img src={active === "createpost" ? AddObj : WAddObj} alt="" className='navigation_icon' />
            <span className="navigation_title">Create</span>
          </div>
          </Link>
          <Link style={{textDecoration: "none", color: "inherit"}} to=""><div id="100009" className="navigation_row" onClick={handleClick}>
            <img src={active === "activity" ? Like : WLike} style={{width:"23px",margin:"0px 15px 0px 26px"}} alt="" className='navigation_icon' />
            <span className="navigation_title">Notifications</span>
          </div>
          </Link>
          <Link style={{textDecoration: "none", color: "inherit"}} to={`../${user._id}`}><div id="100010" className="navigation_row" onClick={handleClick}>
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
    </div>
  )
}

export default NavigationMain