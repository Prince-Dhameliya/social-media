import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import './CreatePost.css'
import { useDispatch, useSelector } from 'react-redux'
import { uploadPost } from '../../actions/uploadAction';
import { getTimelinePosts } from '../../actions/postAction';
import { useState } from "react";
import Close from '../../img/Close.svg'
import axios from 'axios';
// import { useRef } from 'react';
// import { VolumeOff, VolumeUp } from '@mui/icons-material';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarouselSliderPreview from './CarouselSliderPreview';

export default function CreatePost({open, setOpen}) {
//   const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    setOpen(false);
  };

  const imageRef = React.useRef();
  const dispatch = useDispatch();
  const {user} = useSelector((state)=>state.authReducer.authData);
  let [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createPostDesc, setCreatePostDesc] = useState("");
  // const loading = useSelector((state)=>state.postReducer.uploading)

  const onImageChange = (event) => {
    if(event.target.files && event.target.files[0]){
        // let img = event.target.files[0];
        let img = Object.values(event.target.files);
        setImage(img);
    }
  }

  const resetPost = () => {
    setImage([]);
    setCreatePostDesc("");
  }

  const handleChange = (e) => {
    setCreatePostDesc(e.target.value);
  }

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    const newPost = {
        userId: user._id,
        username: user.username,
        profilePicture: user.profilePicture,
        desc: createPostDesc
    }

    let AllImage = [];
    for (let index = 0; index < image.length; index++) {
      
      let res;
      if(image[index]){
        const formData = new FormData();
        formData.append("file", image[index]);
        formData.append('upload_preset', 'socialmedia');
        formData.append('cloud_name', "princedhameliya");

        if(image[index].type==="video/mp4"){
          await axios.post('https://api.cloudinary.com/v1_1/princedhameliya/video/upload', formData)
          .then(async response => {
              res = await response.data;
          })
          AllImage.push(res?.url);
        }
        else if(image[index].type==="image/png" || image[index].type==="image/jpg" || image[index].type==="image/jpeg" || image[index].type==="image/webp"){
          await axios.post('https://api.cloudinary.com/v1_1/princedhameliya/image/upload', formData)
          .then(async response => {
            res = await response.data;
          })
          AllImage.push(res?.url);
        }
        else{
            return;
        }

        // try {
        //     dispatch(uploadImage(data))
        // } catch (error) {
        //     console.log(error);
        // }
      }
      else{
          return;
      }
        
    }

    if(AllImage.length > 0){
        newPost.image = AllImage;
        console.log(newPost);
        dispatch(uploadPost(newPost))
        dispatch(getTimelinePosts(user._id))
    }
    // dispatch(uploadPost(newPost))
    // dispatch(getTimelinePosts(user._id))
    setLoading(false);
    resetPost();
  }


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="CreatePost">
          <div className="CreatePostTitleSection">
            <span className='CreatePostTitle'>Create new post</span>
            <div className="CreatePostClose">
              {image.length===0 && <img src={Close} className='ReactLike' alt="" style={{cursor: "pointer",width: "26px"}} onClick={handleClose} />}
              {image.length!==0 && <button className="CreatePostButton" onClick={handleSubmit} disabled={loading} >{loading ? "Uploading..." : "Share"}</button>}
            </div>
          </div> 
          <hr />

          {image.length===0 && <div className="CreatePostFileUploadSection">
              <div style={{fontSize: "18px", color: "black"}}>Drag photos and videos here</div>
              <div style={{background: "#0095f6", color: "white", padding: "5px 10px", borderRadius: "5px", cursor: "pointer", zIndex:"1"}} onClick={()=>imageRef.current.click()}>Select from computer</div>
              <input className="CreatePostFileUpload" type="file" name="myImage" accept='video/' ref={imageRef} onChange={onImageChange} multiple />
          </div>}

          {image.length!==0 && (
            <div className="PreviewImageAndTitle">
              <div className="PreviewTitleSection">
                <div className="CreatePostUserTitleIcon">
                  <img className="CreatePostUserIcon" src={user?.profilePicture ? user?.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} alt="" />
                  <div className="CreatePostUserTitle">{user?.username}</div>
                </div>
                <div className="PreviewTitle">
                  <textarea className="PreviewTextArea" placeholder="Write a caption" autoComplete='off' autoCorrect='off' onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="PreviewImage">
                  {<div className="slideshow-container">
                    <Slider dots={true}>
                      {image?.map((img,index)=>{
                        return <CarouselSliderPreview key={index} img={img} />
                      })}
                    </Slider>
                  </div>}
                  <img src={Close} className='ReactLike PreviewClose' alt="" style={{cursor: "pointer",width: "26px"}} onClick={()=>setImage([])} />
              </div>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}