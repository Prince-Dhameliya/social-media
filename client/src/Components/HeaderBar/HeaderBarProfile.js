import React, { useState } from 'react'
import './HeaderBar.css'
import Back from "../../img/Back.svg"
import Vertical from "../../img/Vertical3Dot.svg"
import More from '../../img/More.svg'

import { useNavigate } from 'react-router-dom'
import ProfileOptionModel from '../DropdownButton/ProfileOptionModel'
import { useSelector } from 'react-redux'

const HeaderBarProfile = ({currentUser}) => {
  const {user} = useSelector((state)=>state.authReducer.authData)
  let navigate = useNavigate();
  const [openProfileMore, setOpenProfileMore] = useState(false);
  return (
    <div className="HeaderBarProfile">
        <div className="HeaderProfileTitle">
          <img className='BackIcon' src={Back} alt="" onClick={() => navigate(-1)} />
          <span className="HeaderTitle">{currentUser.username}</span>
        </div>
        {currentUser._id !== user._id && <img className='HeaderProfileVerticalIcon' src={Vertical} alt="" onClick={()=>setOpenProfileMore(true)} />}
        {currentUser._id === user._id && <img className='HeaderProfileMoreIcon' src={More} alt="" onClick={()=>setOpenProfileMore(true)} />}
        <ProfileOptionModel open={openProfileMore} setOpen={setOpenProfileMore} currentUser={currentUser}/>
    </div>
  )
}

export default HeaderBarProfile