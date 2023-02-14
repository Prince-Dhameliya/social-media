import './Messages.css'
import Horizontal from '../../img/Horizontal3Dot.svg'
import MessageOptionModel from '../DropdownButton/MessageOptionModel'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Message = ({currentFriendData,message,own,messages,setMessages,socket}) => {
  const [openMore, setOpenMore] = useState(false);

  const navigate = useNavigate();

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
        {!own ? <img src={currentFriendData?.profilePicture ? currentFriendData?.profilePicture : ""} className="MessageProfile" alt='' onClick={()=>navigate(`/${currentFriendData._id}`)} /> : null}
        <span  onTouchStart={touchstart}>{message?.text}</span>
        {!own ? <img src={Horizontal} className="MessageMoreIcon" onClick={() => setOpenMore(true)} alt=''/> : null}
        <MessageOptionModel currentFriendData={currentFriendData} open={openMore} setOpen={setOpenMore} message={message} messages={messages} setMessages={setMessages} socket={socket} />
    </div>
  )
}

export default Message