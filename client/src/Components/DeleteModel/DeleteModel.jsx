import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deleteUser } from '../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut } from '../../actions/AuthAction';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DeleteModel({open,setOpen,currentUser}) {
  const {user} = useSelector((state)=>state.authReducer.authData);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setPassword(e.target.value)
  }

  const dispatch = useDispatch();

  const handleDeleteAccount = async () => {
    const tempData = {
      currentUserId : currentUser?._id,
      currentUserAdminStatus: user?.isAdmin,
    }

    const data = {
        username: currentUser?.username,
        password: password,
    }
    
    if(user?.isAdmin !== true || currentUser?._id === user?._id){
      const res = await dispatch(logIn(data))
      if(res?.response?.data?.message){
          setError(res?.response?.data?.message);
      }
      else{
        await dispatch(deleteUser(user?._id, tempData))
        dispatch(logOut())
      }
    }
    else{
      await dispatch(deleteUser(user?._id, tempData))
      navigate(`/`);
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete your account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete your account?
          </DialogContentText>
          {(user?.isAdmin !== true || currentUser?._id === user?._id) && <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />}
          <DialogContentText style={{display: (error==="") ? "none" : "block", color: "red"}}>
            * {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button style={{color: "red",fontWeight:"600"}} onClick={handleDeleteAccount}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}