import React, { useEffect } from 'react'
import { UilPen } from "@iconscout/react-unicons"
import './InfoCard.css'
import { useState } from 'react'
import ProfileModal from '../ProfileModal/ProfileModal'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from '../../api/UserRequest.js'
import { logOut } from '../../actions/AuthAction'

const InfoCard = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const dispatch = useDispatch();
    const params = useParams();
    const profileUserId = params.id;
    const [profileUser, setProfileUser] = useState({});
    const {user} = useSelector((state)=>state.authReducer.authData);

    useEffect(()=>{
        const fetchProfileUser = async ()=> {
            if(profileUserId === user._id){
                setProfileUser(user);
            }else{
                const profileUsers = await UserApi.getUser(profileUserId)
                setProfileUser(profileUsers);
            }
        }
        fetchProfileUser();
    },[]);

    const handleLogOut = () => {
        dispatch(logOut())
    }


  return (
    <div className="InfoCard">
        <div className="InfoHead">
            <h4>Profile Info</h4>
            {user._id === profileUserId && 
                <div><UilPen width="2rem" height="1.2rem" onClick={()=>setModalOpened(true)} />
                <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data = {user} /></div>
            }
        </div>

        <div className="Info">
            <span><b>Status </b></span>
            <span>{profileUser.relationship}</span>
        </div>

        <div className="Info">
            <span><b>Live In </b></span>
            <span>{profileUser.livesin}</span>
        </div>

        <div className="Info">
            <span><b>Work at </b></span>
            <span>{profileUser.worksAt}</span>
        </div>

        <button className="button logout-button" onClick={handleLogOut}>Logout</button>
    </div>
  )
}

export default InfoCard