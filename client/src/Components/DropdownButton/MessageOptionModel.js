import * as React from 'react';
import { useSelector } from 'react-redux';
import { Dialog } from '@mui/material';
import axios from 'axios';

export default function MessageOptionModel({currentFriendData,open,setOpen,message,messages,setMessages,socket}) {
  const {user}  = useSelector((state)=>state.authReducer.authData)
//   const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    let newMessages = messages.filter(m=>m._id !== message._id);
    try {
        await axios.delete(`/api/messages/${message?._id}/delete`)
        socket.emit("deleteMessage",{
          senderId: user._id,
          receiverId: currentFriendData._id,
          messageId: message._id,
        })
        setMessages(newMessages);
    } catch (error) {
        console.log(error);
    }
    // dispatch(deletePost(data._id,user._id));
    handleClose();
  }

  return (
      <Dialog open={open} onClose={handleClose}>

        <div style={{width: "20rem"}} className="sub-menu">
            {message?.senderId === user._id &&
            <><div className="sub-menu-link" onClick={handleClose && handleDelete}>
                <p style={{color: "red",fontWeight: "600",alignItems: 'center'}}>Delete</p>
            </div>
            <hr/></>}
            <div className="sub-menu-link" onClick={handleClose}>
                <p>Copy</p>
            </div>
        </div>
      </Dialog>
  );
}