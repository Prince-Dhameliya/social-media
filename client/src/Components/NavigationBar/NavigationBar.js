import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Link} from "react-router-dom"
import './NavigationBar.css';

import Home from '../../img/home.svg'
import WHome from '../../img/Whitehome.svg'
import Search from '../../img/Search.svg'
import WSearch from '../../img/WhiteSearch.svg'
import AddObj from '../../img/AddObject.svg'
import WAddObj from '../../img/WhiteAddObject.svg'
import Like from '../../img/likeBlack.svg'
import WLike from '../../img/dislike.svg'
import FullWhiteLike from '../../img/FullWhiteLike.svg'
import FullWhiteComment from '../../img/FullWhiteComment.svg'
import Triangle from '../../img/Triangle.svg'
import UserIcon from '../../img/UserIcon.svg'



const NavigationBar = ({location}) => {

  const {user} = useSelector((state)=>state.authReducer.authData);
  const [animation, setAnimation] = useState(true);
  let notifications = user.notifications;
  let comments=0;
  let like=0;
  let follow=0;
  notifications.map((notification,id)=>{
      if(notification?.type === "comment"){
        comments=comments+1;
      }
      else if(notification?.type === "liked"){
        like=like+1;
      }
      else if(notification?.type === "follow"){
        follow=follow+1;
      }
      return null;
  })

  useEffect(()=>{
      if(notifications?.length > 0){
        setAnimation(true);
        setInterval(()=>{
          setAnimation(false);
        },2000)
      }
  },[notifications.length])


  const [active, setActive] = useState(location);

  const handleClick = (event) => {
    if(event.target.id === "1"){
      setActive("home");
    }
    else if(event.target.id === "2"){
      setActive("allposts");
    }
    else if(event.target.id === "3"){
      setActive("createpost");
    }
    else if(event.target.id === "4"){
      setActive("activity");
    }
    else if(event.target.id === "5"){
      setActive("profile");
    }
  }

  return (
    <>
      <div className='NavigationBar'>
              <Link to="../"><img id="1" src={active === "home" ? Home : WHome} alt="" className='homeNavigation' onClick={handleClick} /></Link>
              <Link to="../explore"><img id="2" src={active === "allposts" ? Search : WSearch} alt="" className='searchNavigation' onClick={handleClick} /></Link>
              <Link to=""><img id="3" src={active === "createpost" ? AddObj : WAddObj} alt="" className='addPostNavigation' onClick={handleClick} /></Link>
              <Link to="../activity"><img id="4" src={active === "activity" ? Like : WLike} alt="" className='likeNavigation' onClick={handleClick} /></Link>
              {animation && ((like !== 0) || (comments !== 0) || (follow !== 0)) && <div className="NotificationAnimation" id="NotificationAnimation">
                  <div className="NotificationTop">
                      {(like!== 0) && <div>
                          <img src={FullWhiteLike} className="AnimationIcon" alt="" />
                          <span className="AnimationCount">{like}</span>
                      </div>}
                      {(comments !== 0) && <div>
                          <img style={{width: "25px"}} src={FullWhiteComment} className="AnimationIcon" alt="" />
                          <span className="AnimationCount">{comments}</span>
                      </div>}
                      {(follow !== 0) && <div>
                          <img src={UserIcon} className="AnimationIcon" alt="" />
                          <span className="AnimationCount">{follow}</span>
                      </div>}
                  </div>
                  <img src={Triangle} className="NotificationBottom" alt="" />
              </div>}
              <Link to={`../${user._id}`}><img id="5" src={user.profilePicture ? user.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} className={active === "profile" ? "active profileNavigation" : "profileNavigation"} alt="" onClick={handleClick} /></Link>
      </div>
    </>
  )
}

export default NavigationBar