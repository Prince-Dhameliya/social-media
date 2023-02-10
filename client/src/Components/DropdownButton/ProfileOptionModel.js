import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog } from '@mui/material';
import { logOut } from '../../actions/AuthAction';
import DeleteModel from '../DeleteModel/DeleteModel';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProfileOptionModel({open,setOpen,currentUser}) {
  const {user}  = useSelector((state)=>state.authReducer.authData)
  const [openDeleteModel, setOpenDeleteModel] = useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
      <Dialog open={open} onClose={handleClose}>

        <div style={{width: "20rem"}} className="sub-menu">
            {user._id !== currentUser._id && <><div className="sub-menu-link" onClick={handleClose}>
                <p>Block</p>
            </div>
            <hr/></>}
            {user._id !== currentUser._id && <><div className="sub-menu-link" onClick={handleClose}>
                <p>Restrict</p>
            </div>
            <hr/></>}
            {user._id !== currentUser._id && <><div className="sub-menu-link" onClick={handleClose}>
                <p>Report</p>
            </div>
            <hr/></>}
            {user._id === currentUser._id && <><div className="sub-menu-link" onClick={handleClose}>
                <p>Settings</p>
            </div>
            <hr/></>}
            {user._id === currentUser._id && <Link style={{textDecoration: "none", color: "inherit"}} to={`/${user._id}/saved`}><div className="sub-menu-link" onClick={handleClose}>
                <p>Saved</p>
            </div>
            <hr/></Link>}
            {user._id === currentUser._id && <><div className="sub-menu-link" onClick={handleClose}>
                <p>Switch appearance</p>
            </div>
            <hr/></>}
            {(user._id === currentUser._id || user?.isAdmin === true) && <><div className="sub-menu-link" onClick={()=>setOpenDeleteModel(true)}>
                <p style={{color: "red",fontWeight: "600",alignItems: 'center'}}>Delete Account</p>
            </div>
            <DeleteModel open={openDeleteModel} setOpen={setOpenDeleteModel} currentUser={currentUser} />
            <hr/></>}
            {user._id === currentUser._id && <><div className="sub-menu-link" onClick={handleLogOut}>
                <p>Log out</p>
            </div>
            <hr/></>}
            <div className="sub-menu-link" onClick={handleClose}>
                <p>Cancel</p>
            </div>
        </div>
      </Dialog>
  );
}