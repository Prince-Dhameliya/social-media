import React from 'react'
import { Link } from 'react-router-dom'
import Message from '../../img/Message1.svg'
import './HeaderBar.css'

const HeaderBar = () => {
  return (
    <div className="HeaderBar">
        <span className="HeaderTitle">Social Point</span>
        <Link style={{textDecoration: "none", color: "inherit"}} to="../messages"><img src={Message} className='HeaderChatIcon' alt="" /></Link>
    </div>
  )
}

export default HeaderBar