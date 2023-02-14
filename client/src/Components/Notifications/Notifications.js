import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, getNotifications, unFollowUser } from '../../actions/userAction';
import './Notifications.css'
import time from 'time-ago';
import { useNavigate } from 'react-router-dom';


const Notification = ({notification}) => {
    const {user} = useSelector((state)=>state.authReducer.authData);
    const dispatch = useDispatch();
    const [isfollowing, setIsFollowing] = useState(user.following.includes(notification.userId))

    const handleFollow = (event) => {
      event.stopPropagation();
      setIsFollowing((prev)=>!prev)
      isfollowing ? dispatch(unFollowUser(notification.userId, user)) : dispatch(followUser(notification.userId, user));
    }

    const navigate = useNavigate();
  return (
    <div className="Notification">
        <div className="NotificationLeft">
            <img src={notification.userImage} alt="" onClick={()=>navigate(`/${notification.userId}`)} />

            {(notification?.type === "comment") && <div className="NotificationInfo">
                <span><span onClick={()=>navigate(`/${notification.userId}`)}>{notification.username}</span> commented: {notification.comment} <span style={{color: "rgb(147, 147, 147)"}}>{time.ago(notification.createdAt,true)}</span></span>
            </div>}
            
            {(notification?.type === "liked") && <div className="NotificationInfo">
                <span><span onClick={()=>navigate(`/${notification.userId}`)}>{notification.username}</span> liked your post. <span style={{color: "rgb(147, 147, 147)"}}>{time.ago(notification.createdAt,true)}</span></span>
            </div>}

            {(notification?.type === "follow") && <div className="NotificationInfo">
                <span><span onClick={()=>navigate(`/${notification.userId}`)}>{notification.username}</span> started following you. <span style={{color: "rgb(147, 147, 147)"}}>{time.ago(notification.createdAt,true)}</span></span>
            </div>}
        </div>

        <div className="NotificationRight">
            {(notification?.type === "follow") 
            ? <button className={isfollowing ? "button nfc-button UnfollowButton" : "button nfc-button"} onClick={handleFollow}>
                  {isfollowing ? "Unfollow" : "Follow"}
              </button>
            : <img src={notification.postImage} alt="" />}
        </div>
    </div>
  )
}

const Notifications = ({location}) => {
  const {user} = useSelector((state)=>state.authReducer.authData);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNotifications = async () => {
      dispatch(getNotifications(user._id));
    }
    if(location === "activity"){
      fetchNotifications()
    }
  },[location,dispatch,user._id])
  return (
    <div className='Notifications'>
        <h3>New</h3>
        <div className="NotificationList">
          {user.notifications.map((notification,id)=>{
            return <Notification key={id} notification={notification} />
          })}
        </div>
    </div>
  )
}

export default Notifications