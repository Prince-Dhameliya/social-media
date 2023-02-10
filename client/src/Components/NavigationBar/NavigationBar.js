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
import CreatePost from '../CreatePost/CreatePost';



const NavigationBar = ({location}) => {

  const {user} = useSelector((state)=>state.authReducer.authData);
  const [animation, setAnimation] = useState(true);
  const [open, setOpen] = useState(false);
  let notification = user.notification;
  let comments=0;
  let like=0;
  let follow=0;
  notification?.map((notification,id)=>{
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
      if(location !== "activity" && notification?.length > 0){
        setAnimation(true);
        setInterval(()=>{
          setAnimation(false);
        },2000)
      }
  },[notification.length])

  const [active, setActive] = useState(location);

  const handleClick = (event) => {
    if(event.target.id === "100001"){
      setActive("home");
    }
    else if(event.target.id === "100002"){
      setActive("allposts");
    }
    else if(event.target.id === "100003"){
      setActive("createpost");
      setOpen(true);
    }
    else if(event.target.id === "100004"){
      setActive("activity");
    }
    else if(event.target.id === "100005"){
      setActive("profile");
    }
  }

  return (
    <>
      <div className='NavigationBar'>
              <Link to="../"><img id="100001" src={active === "home" ? Home : WHome} alt="" className='homeNavigation' onClick={handleClick} /></Link>
              <Link to="../explore"><img id="100002" src={active === "allposts" ? Search : WSearch} alt="" className='searchNavigation' onClick={handleClick} /></Link>
              <Link to=""><img id="100003" src={active === "createpost" ? AddObj : WAddObj} alt="" className='addPostNavigation' onClick={handleClick} />
              </Link>
              <Link to="../activity"><img id="100004" src={active === "activity" ? Like : WLike} alt="" className='likeNavigation' onClick={handleClick} /></Link>
              <Link to={`../${user._id}`}><img id="100005" src={user.profilePicture ? user.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} className={active === "profile" ? "active profileNavigation" : "profileNavigation"} alt="" onClick={handleClick} /></Link>
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
      </div>
      <CreatePost open={open} setOpen={setOpen}/>
    </>
  )
}

export default NavigationBar