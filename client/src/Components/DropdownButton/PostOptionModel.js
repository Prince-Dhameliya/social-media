import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost } from '../../actions/postAction';
import { Dialog } from '@mui/material';

export default function PostOptionModel({open,setOpen,data}) {
  const {user}  = useSelector((state)=>state.authReducer.authData)
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    dispatch(deletePost(data._id,user._id));
    handleClose();
  }

  return (
      <Dialog open={open} onClose={handleClose}>

        <div style={{width: "20rem"}} className="sub-menu">
            {data.userId === user._id &&
            <div className="sub-menu-link" onClick={handleClose && handleDelete}>
                <p style={{color: "red",fontWeight: "600",alignItems: 'center'}}>Delete</p>
            </div>}
            <hr/>
            {data.userId === user._id &&
            <div className="sub-menu-link" onClick={handleClose}>
                <p>Edit</p>
            </div>}
            <hr/>
            <div className="sub-menu-link" onClick={handleClose}>
                <p>Share to...</p>
            </div>
            <hr/>
            <div className="sub-menu-link" onClick={handleClose}>
                <p>Copy Link</p>
            </div>
        </div>
      </Dialog>
  );
}