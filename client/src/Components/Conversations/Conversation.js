import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/UserRequest';
import ConversationOptionModel from '../DropdownButton/ConversationOptionModel';
import './Conversations.css'

const Conversation = ({conversation,user,onlineFriend}) => {
    const [currentFriend, setCurrentFriend] = useState(null);
    const [openMore, setOpenMore] = useState(false);
    const [online, setOnline] = useState(false);

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

    useEffect(()=>{
        const friendId = conversation?.members.find(member => member !== user._id)
        const getCurrentFriend = async () => {
            const {data} = await getUser(friendId);
            setCurrentFriend(data);
        }
        getCurrentFriend();
        const isOnline = onlineFriend?.filter(online=>online.userId===friendId);
        if(isOnline.length === 1){
            setOnline(true);
        }
    },[user._id,conversation,onlineFriend])
  return (
    <div className="Conversation" onTouchStart={touchstart} onTouchEnd={touchend} onTouchMove={touchmove}>
        <span className="pic-div">
            <img className="pic" src={currentFriend?.profilePicture ? currentFriend?.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} alt=''/>
            {online ? <div className="onlineIcon"></div> : null}
        </span>
        <div className="chat-username">
            <span className="chat-name">{currentFriend?.username}</span>
            <span className="chat-last-msg"></span>
        </div>
        <ConversationOptionModel open={openMore} setOpen={setOpenMore} conversation={conversation} />
    </div>
  )
}

export default Conversation