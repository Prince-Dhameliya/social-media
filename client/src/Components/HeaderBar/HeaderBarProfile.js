import React from 'react'
import './HeaderBar.css'
import Back from "../../img/Back.svg"
import { useNavigate } from 'react-router-dom'

const HeaderBarProfile = ({currentUser}) => {
  let navigate = useNavigate();
  return (
    <div className="HeaderBarProfile">
        <img className='BackIcon' src={Back} alt="" onClick={() => navigate(-1)} />
        <span className="HeaderTitle">{currentUser.username}</span>
    </div>
  )
}

export default HeaderBarProfile