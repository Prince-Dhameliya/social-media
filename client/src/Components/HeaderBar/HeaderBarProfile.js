import React from 'react'
import More from '../../img/More.svg'
import Dot from '../../img/Vertical3Dot.svg'
import Settings from '../../img/Settings.svg'
import Saved from '../../img/UnBookmark.svg'
import Mode from '../../img/Mode.svg'
import { logOut } from '../../actions/AuthAction'
import { useDispatch } from 'react-redux'
import './HeaderBar.css'
import { Link } from 'react-router-dom'

function togglemenu(){
  let submenu = document.getElementById("submenu1");
  submenu.classList.toggle("open-menu");
}


const HeaderBarProfile = ({user,currentUser}) => {

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className="HeaderBar">
        <span className="HeaderTitle">{currentUser.username}</span>
        {user._id !== currentUser._id && (<img src={Dot} className='HeaderDotIcon' alt="" />)}

        {user._id === currentUser._id && (
          <>
          <img src={More} className='HeaderMoreIcon' onClick={togglemenu} alt="" />

          <div className="sub-menu-wrap sub-menu-mobile" id="submenu1">
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
                  <div className="sub-menu-link" onClick={handleLogOut}>
                      <p>Log out</p>
                  </div>
              </div>
          </div>

          </>
        )}
        
    </div>
  )
}

export default HeaderBarProfile