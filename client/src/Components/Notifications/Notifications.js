import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getNotifications } from '../../actions/userAction';
import './Notifications.css'


const Notification = ({notification}) => {
  return (
    <div className="Notification">
        <div className="NotificationLeft">
            <img src={notification.userImage} alt=""/>

            {notification?.comment ? <div className="NotificationInfo">
                <span>{notification.username}</span>
                <span>commented: {notification.comment}</span>
            </div>
            :
            <div className="NotificationInfo">
                <span>{notification.username}</span>
                <span> liked your post.</span>
            </div>}
        </div>

        <div className="NotificationRight">
            <img src={notification.postImage} alt="" />
        </div>
    </div>
  )
}

const Notifications = ({location,user}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNotifications = async () => {
      dispatch(getNotifications(user._id))
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