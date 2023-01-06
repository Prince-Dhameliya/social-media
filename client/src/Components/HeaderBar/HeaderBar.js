import React from 'react'
import Message from '../../img/Message1.svg'
import './HeaderBar.css'

const HeaderBar = () => {
  return (
    <div className="HeaderBar">
        <span className="HeaderTitle">Social Point</span>
        <img src={Message} className='HeaderChatIcon' alt="" />
    </div>
  )
}

export default HeaderBar