import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/userAction';
import { getNotifications } from '../../api/UserRequest';
import './Notifications.css'


const Notification = ({notification,currentUser,profileUserId,user}) => {
    const dispatch = useDispatch();
    const [isfollowing, setIsFollowing] = useState(user.following.includes(profileUserId))

    const handleFollow = () => {
      setIsFollowing((prev)=>!prev)
      isfollowing ? dispatch(unFollowUser(currentUser._id, user)) : dispatch(followUser(currentUser._id, user));
    }
  return (
    <div className="Notification">
        <div className="NotificationLeft">
            <img src={notification.userImage} alt=""/>

            {(notification?.type === "comment") && <div className="NotificationInfo">
                <span>{notification.username}</span>
                <span>commented: {notification.comment}</span>
            </div>}
            
            {(notification?.type === "liked") && <div className="NotificationInfo">
                <span>{notification.username}</span>
                <span> liked your post.</span>
            </div>}

            {(notification?.type === "follow") && <div className="NotificationInfo">
                <span>{notification.username}</span>
                <span>started following you.</span>
            </div>}
        </div>

        <div className="NotificationRight">
            {(notification?.type === "follow") 
            ? <button className={isfollowing ? "button fc-buttonVertical UnfollowButton" : "button fc-buttonVertical"} onClick={handleFollow}>
                  {isfollowing ? "Unfollow" : "Follow"}
              </button>
            : <img src={notification.postImage} alt="" />}
        </div>
    </div>
  )
}

const Notifications = ({location,currentUser,profileUserId,user}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchNotifications = async () => {
      await getNotifications(user._id);
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
            return <Notification key={id} notification={notification} currentUser={currentUser} profileUserId={profileUserId} user={user} />
          })}
        </div>
    </div>
  )
}

export default Notifications