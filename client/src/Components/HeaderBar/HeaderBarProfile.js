import React, { useState } from 'react'
import More from '../../img/More.svg'
import Dot from '../../img/Vertical3Dot.svg'
import Settings from '../../img/Settings.svg'
import Saved from '../../img/UnBookmark.svg'
import Mode from '../../img/Mode.svg'
import Delete from '../../img/Delete.svg'
import { logOut } from '../../actions/AuthAction'
import { useDispatch } from 'react-redux'
import './HeaderBar.css'
import { Link } from 'react-router-dom'
import DeleteModel from '../DeleteModel/DeleteModel'

function togglemenu1(){
  let submenu = document.getElementById("submenu1");
  submenu.classList.toggle("open-menu");
}

const HeaderBarProfile = ({user,currentUser}) => {

  const [open, setOpen] = useState(false);

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
          <img src={More} className='HeaderMoreIcon' onClick={togglemenu1} alt="" />

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

          </>
        )}
        
    </div>
  )
}

export default HeaderBarProfile