import React from 'react'
import "./HeaderBar.css"
import Back from "../../img/Back.svg"
import { useNavigate } from 'react-router-dom'

const HeaderBarMessages = ({user}) => {
    let navigate = useNavigate();
  return (
    <div className="HeaderBarMessages">
        <img className='BackIcon' src={Back} alt="" onClick={() => navigate(-1)} />
        <span className="HeaderTitle">{user.username}</span>
    </div>
  )
}

export default HeaderBarMessages