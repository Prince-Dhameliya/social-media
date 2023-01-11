import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from "react-router-dom"
import './NavigationBar.css';

// import Home from '../../img/home.svg'
import WHome from '../../img/Whitehome.svg'
// import Search from '../../img/Search.svg'
import WSearch from '../../img/WhiteSearch.svg'
// import AddObj from '../../img/AddObject.svg'
import WAddObj from '../../img/WhiteAddObject.svg'
// import Like from '../../img/likeBlack.svg'
import WLike from '../../img/dislike.svg'



const NavigationBar = () => {

  const {user} = useSelector((state)=>state.authReducer.authData);
    

  return (
    <>
      <div className='NavigationBar'>
              <Link to="../"><img src={WHome} alt="" className='homeNavigation' /></Link>
              <Link to="../explore"><img src={WSearch} alt="" className='searchNavigation' /></Link>
              <Link to=""><img src={WAddObj} alt="" className='addPostNavigation' /></Link>
              <Link to="../activity"><img src={WLike} alt="" className='likeNavigation' /></Link>
              <Link to={`../${user._id}`}><img src={user.profilePicture ? user.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} className="profileNavigation" alt="" /></Link>
      </div>
    </>
  )
}

export default NavigationBar