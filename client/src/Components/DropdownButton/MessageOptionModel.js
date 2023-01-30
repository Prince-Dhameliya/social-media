import * as React from 'react';
import { useSelector } from 'react-redux';
import { Dialog } from '@mui/material';
import axios from 'axios';

export default function MessageOptionModel({open,setOpen,message}) {
  const {user}  = useSelector((state)=>state.authReducer.authData)
//   const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
        await axios.delete(`/messages/${message?._id}/delete`)
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