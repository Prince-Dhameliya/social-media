import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useState } from "react";
import { useDispatch } from "react-redux";
import Close from '../../img/Close.svg'
import { useParams } from 'react-router-dom';
import { updateUser } from '../../actions/userAction';
import './ProfileModel.css'

export default function ProfileModel({open, setOpen, data}) {
//   const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };


  const [loading, setLoading] = useState(false);
  const {password, ...other} = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage]= useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const onImageChange = (event) => {
    if(event.target.files && event.target.files[0]){
      let img = event.target.files[0];
      event.target.name === "profileImage" ? setProfileImage(img) : setCoverImage(img);
    }
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      let UserData = formData;

      let res1;
      if(profileImage!==null){
        const ProfileData = new FormData();
        ProfileData.append("file", profileImage);
        ProfileData.append('upload_preset', 'socialmedia');
        ProfileData.append('cloud_name', "princedhameliya")

        await fetch('https://api.cloudinary.com/v1_1/princedhameliya/image/upload',{
            method: "POST",
            body: ProfileData,
        })
        .then(res => res.json())
        .then(async res => {
            res1 = await res;
        })
        .catch(err => console.log(err))
        // try {
        //   dispatch(uploadImage(data));
        // } catch (error) {
        //   console.log(error);
        // }
      }
      if(res1 && (profileImage!==null)) UserData.profilePicture = res1.url;

      let res2;
      if(coverImage!==null){
        const ProfileData = new FormData();
        ProfileData.append("file", coverImage);
        ProfileData.append('upload_preset', 'socialmedia');
        ProfileData.append('cloud_name', "princedhameliya")

        await fetch('https://api.cloudinary.com/v1_1/princedhameliya/image/upload',{
            method: "POST",
            body: ProfileData,
        })
        .then(res => res.json())
        .then(async res => {
          res2 = await res;
        })
        .catch(err => console.log(err))
        // try {
          //   dispatch(uploadImage(data));
          // } catch (error) {
            //   console.log(error);
            // }
      }
      if(res2 && (coverImage!==null)) UserData.coverPicture = res2.url;
      const newData = {
        UserData: UserData,
        profilePicture: data.profilePicture,
      }
      dispatch(updateUser(param.id, newData));
      setProfileImage(null);
      setCoverImage(null);
      setLoading(false);
      setOpen(false);
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >

        <form className="InfoForm ProfileModel">
          <div className='ProfileModel_Header'>
            <h3>Your Info</h3>
            <img src={Close} className='ReactLike' alt="" style={{cursor: "pointer",width: "26px"}} onClick={handleClose} />
          </div>
          <div>
            <input type="text" className="InfoInput" name="firstname" placeholder="First Name" onChange={handleChange} value={formData.firstname} />
            <input type="text" className="InfoInput" name="lastname" placeholder="Last Name" onChange={handleChange} value={formData.lastname} />
          </div>

          <div>
            <input type="text" className="InfoInput" name="bio" placeholder="Bio" onChange={handleChange} value={formData.bio} />
          </div>

          <div>
            Profile Image
            <input type="file" name="profileImage" onChange={onImageChange} />
          </div>

          <div>
            Cover Image
            <input type="file" name="coverImage" onChange={onImageChange} />
          </div>

          <button className="button InfoButton" onClick={handleSubmit} disabled={loading}>{loading ? "Updating" : "Update"}</button>
        </form>
      </Dialog>
    </div>
  );
}