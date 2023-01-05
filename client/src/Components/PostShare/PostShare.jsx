import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import './PostShare.css'
import { uploadPost } from '../../actions/uploadAction';
import { getTimelinePosts } from '../../actions/postAction';
import axios from 'axios';

const PostShare = () => {
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");
    const imageRef = useRef();
    const dispatch = useDispatch();
    const desc = useRef();
    const {user} = useSelector((state)=>state.authReducer.authData);

    const onImageChange = (event) => {
        if(event.target.files && event.target.files[0]){
            let img = event.target.files[0];
            setImage(img);
        }
    }

    const resetPost = () => {
        setImage(null);
        desc.current.value = "";
    }

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        const newPost = {
            userId: user._id,
            username: user.username,
            profilePicture: user.profilePicture,
            desc: desc.current.value
        }
        let res;
        if(image){
            const formData = new FormData();
            formData.append("file", image);
            formData.append('upload_preset', 'socialmedia');
            formData.append('cloud_name', "princedhameliya");

            if(image.type==="video/mp4"){
                await axios.post('https://api.cloudinary.com/v1_1/princedhameliya/video/upload', formData)
                .then(async response => {
                    res = await response.data;
                })
            }
            else if(image.type==="image/png" || image.type==="image/jpg" || image.type==="image/jpeg" || image.type==="image/webp"){
                await axios.post('https://api.cloudinary.com/v1_1/princedhameliya/image/upload', formData)
                .then(async response => {
                    res = await response.data;
                })
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

        if(res){
            newPost.image = res.url;
            dispatch(uploadPost(newPost))
            dispatch(getTimelinePosts(user._id))
        }
        // dispatch(uploadPost(newPost))
        // dispatch(getTimelinePosts(user._id))
        setLoading(false);
        resetPost();
    }

  return (
    <div className="PostShare">
        <img src={user.coverPicture ? user.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png" } alt="" />
        <div>
            <input ref={desc} required type="text" placeholder="What's Happening" />
            <div className="PostOptions">
                <div className="Option" style={{color: "var(--photo)"}} onClick={()=>imageRef.current.click()}> <UilScenery className="optionsIcon" /> Photo </div>
                <div className="Option VideoButton" style={{color: "var(--video)"}} onClick={()=>imageRef.current.click()}> <UilPlayCircle className="optionsIcon"/> Video </div>
                {/* <div className="Option" style={{color: "var(--location)"}}> <UilLocationPoint className="optionsIcon" /> Location </div> */}
                <div className="Option ScheduleButton" style={{color: "var(--schedule)"}}> <UilSchedule className="optionsIcon" /> Schedule </div>
                <button className="button ps-button" onClick={handleSubmit} disabled={loading} >{loading ? "Uploading..." : "Share"}</button>
                <div style={{display: "none"}}>
                    <input type="file" name="myImage" accept='video/' ref={imageRef} 
                    onChange={onImageChange} />
                </div>
            </div>
            {image && (
                <div className="PreviewImage">
                    <UilTimes onClick={()=>setImage(null)} />
                    <img src={URL.createObjectURL(image)} alt="" />
                </div>
            )}
        </div>
    </div>
  )
}

export default PostShare