// import React, { useEffect, useState } from 'react'
// import { getUser } from '../../api/UserRequest';
import './Messages.css'
import Horizontal from '../../img/Horizontal3Dot.svg'
import MessageOptionModel from '../DropdownButton/MessageOptionModel'
import { useState } from 'react';

const Message = ({currentFriendData,message,own}) => {
  const [openMore, setOpenMore] = useState(false);

//for hold touch action
var longtouch;
var timer;
//length of time we want the user to touch before we do something
var touchduration = 500;

function touchstart() {
    longtouch = false;

    timer = setTimeout(function() {
        longtouch = true;
        setOpenMore(true);
        timer = null
    }, touchduration);
}

function touchend() {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    if (longtouch) {
        longtouch = false;
    }
}

function touchmove() {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    if (longtouch) {
        longtouch = false;
    }
}


  return (
    <div className={own ? "Message Own" : "Message"} onTouchEnd={touchend} onTouchMove={touchmove}>
        {own ? <img src={Horizontal} className="MessageMoreIcon" onClick={() => setOpenMore(true)} alt=''/> : null}
        {!own ? <img src={currentFriendData?.profilePicture ? currentFriendData?.profilePicture : ""} className="MessageProfile" alt=''/> : null}
        <span  onTouchStart={touchstart}>{message?.text}</span>
        {!own ? <img src={Horizontal} className="MessageMoreIcon" onClick={() => setOpenMore(true)} alt=''/> : null}
        <MessageOptionModel open={openMore} setOpen={setOpenMore} message={message} />
    </div>
  )
}

export default Message