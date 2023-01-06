import { useDispatch, useSelector } from 'react-redux'
import './NavigationMain.css'
import { Link } from 'react-router-dom'
import { logOut } from '../../actions/AuthAction'

// import Home from '../../img/home.svg'
import WHome from '../../img/Whitehome.svg'
// import Search from '../../img/Search.svg'
import WSearch from '../../img/WhiteSearch.svg'
// import AddObj from '../../img/AddObject.svg'
import WAddObj from '../../img/WhiteAddObject.svg'
// import Like from '../../img/likeBlack.svg'
import WLike from '../../img/dislike.svg'
import More from '../../img/More.svg'
import Settings from '../../img/Settings.svg'
import Saved from '../../img/UnBookmark.svg'
import Mode from '../../img/Mode.svg'
import Logo from '../../img/logo.png'

function togglemenu(){
  let submenu = document.getElementById("submenu");
  submenu.classList.toggle("open-menu");
}

const NavigationMain = () => {
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut())
  }

  const {user} = useSelector((state)=>state.authReducer.authData);
  return (
    <div className="NavigationMain">
      <div className="logoAndStuff">
        <div className="logoTitle">
            <img src={Logo} alt="" className='logo_icon' />
            <span className="logo_Title">Social Point</span>
        </div>
        <div className="navigationItems">
          <Link style={{textDecoration: "none", color: "inherit"}} to="../home"><div className="navigation_row">
            <img src={WHome} alt="" className='navigation_icon' />
            <span className="navigation_title">Home</span>
          </div>
          </Link>
          <Link style={{textDecoration: "none", color: "inherit"}} to="../explore"><div className="navigation_row">
            <img src={WSearch} alt="" className='navigation_icon' />
            <span className="navigation_title">Search</span>
          </div>
          </Link>
          <Link style={{textDecoration: "none", color: "inherit"}} to=""><div className="navigation_row">
            <img src={WAddObj} alt="" className='navigation_icon' />
            <span className="navigation_title">Create</span>
          </div>
          </Link>
          <Link style={{textDecoration: "none", color: "inherit"}} to=""><div className="navigation_row">
            <img src={WLike} alt="" className='navigation_icon' />
            <span className="navigation_title">Notifications</span>
          </div>
          </Link>
          <Link style={{textDecoration: "none", color: "inherit"}} to={`../${user._id}`}><div className="navigation_row">
            <img src={user.profilePicture} alt="" className='navigation_icon navigation_profileIcon' />
            <span className="navigation_title">Profile</span>
          </div>
          </Link>
        </div>
      </div>

      <div className="moreItems" id="moreItems" onClick={togglemenu}>
        <img src={More} alt="" className='navigation_icon' />
        <span className="navigation_title">More</span>
      </div>

      <div className="sub-menu-wrap sub-menu-pc" id="submenu">
          <div className="sub-menu">
              <div className="sub-menu-link">
                  <p>Settings</p>
                  <span><img alt="" src={Settings}/></span>
              </div>
              <hr/>
              <Link style={{textDecoration: "none", color: "inherit"}} to={`/${user._id}/saved`}><div className="sub-menu-link">
                  <p>Saved</p>
                  <span><img alt="" src={Saved}/></span>
              </div></Link>
              <hr/>
              <div className="sub-menu-link">
                  <p>Switch appearance</p>
                  <span><img alt="" src={Mode}/></span>
              </div>
              <hr/>
              <div className="sub-menu-link" onClick={handleLogOut}>
                  <p>Log out</p>
              </div>
          </div>
      </div>
    </div>
  )
}

export default NavigationMain