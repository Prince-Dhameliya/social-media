import * as React from 'react';
import { Dialog } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ConversationOptionModel({open,setOpen,conversation}) {
    const navigate = useNavigate();
//   const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
        await axios.delete(`/api/conversations/${conversation?._id}/delete`)
        navigate(-1);
    } catch (error) {
        console.log(error);
    }
    // dispatch(deletePost(data._id,user._id));
    handleClose();
  }

  return (
      <Dialog open={open} onClose={handleClose}>
        <div style={{width: "20rem"}} className="sub-menu">
            <div className="sub-menu-link" onClick={handleClose && handleDelete}>
                <p style={{color: "red",fontWeight: "600",alignItems: 'center'}}>Delete</p>
            </div>
        </div>
      </Dialog>
  );
}