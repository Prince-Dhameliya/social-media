import React from 'react'
import './HeaderBar.css'
import Search from '../../img/SearchGrey.svg'
import Close from '../../img/CloseGrey.svg'
import { Link } from 'react-router-dom'

const HeaderBarSearch = ({setSearchedName,screenSize}) => {

  const handleTextCancle = () => { 
    document.getElementById("SearchInput").value = "";
    setSearchedName("");
    document.getElementById("SearchTextCancel").style.display = "none";
    document.getElementById("SearchInput").style.removeProperty("flex-grow");
  }
  
  const handleChange = (e) => {
    let text = e.target.value;
    setSearchedName(text);
    if(text.length > 0){
      document.getElementById("SearchTextCancel").style.display = "flex";
      document.getElementById("SearchInput").style.flexGrow = "1";
    }
    else{
      document.getElementById("SearchTextCancel").style.display = "none";
      document.getElementById("SearchInput").style.removeProperty("flex-grow");
    }
  }

  const handleSearch = () => {
    document.getElementById("SearchInput").select();
    if(screenSize.dynamicWidth <= 700){
      document.getElementById("SearchCancel").style.display = "block";
    }
    setSearchedName("");
  }
  
  const handleCancel = () => {
    if(screenSize.dynamicWidth <= 700){
      document.getElementById("SearchInput").value = "";
      setSearchedName("");
      document.getElementById("SearchCancel").style.display = "none";
      document.getElementById("SearchTextCancel").style.display = "none";
      document.getElementById("SearchInput").style.removeProperty("flex-grow");
    }
  }

  return (
    <div>
      {(screenSize.dynamicWidth <= 700) && <Link style={{textDecoration: "none"}} to="../explore/search">
        <div className="HeaderBarSearch">
          <div id="search" onClick={handleSearch}>
            <img src={Search} className="SearchButtonIcon" alt="" />
            <input type="text" placeholder="Search" id="SearchInput" onChange={handleChange}/>
            <div id="SearchTextCancel" onClick={handleTextCancle} >
              <img src={Close} className="SearchButtonIcon" alt="" />
            </div>
          </div>
          <Link style={{textDecoration: "none", color: "Black"}} to="../explore"><div id="SearchCancel" onClick={handleCancel}>
            <span>Cancel</span>
          </div></Link>
        </div>
      </Link>
      }
      {(screenSize.dynamicWidth > 700) && 
        <div className="HeaderBarSearch">
          <div id="search" onClick={handleSearch}>
            <img src={Search} className="SearchButtonIcon" alt="" />
            <input type="text" placeholder="Search" id="SearchInput" onChange={handleChange}/>
            <div id="SearchTextCancel" onClick={handleTextCancle} >
              <img src={Close} className="SearchButtonIcon" alt="" />
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default HeaderBarSearch