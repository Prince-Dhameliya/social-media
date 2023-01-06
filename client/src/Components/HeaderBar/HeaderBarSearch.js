import React from 'react'
import './HeaderBar.css'
import Search from '../../img/SearchGrey.svg'
import Close from '../../img/CloseGrey.svg'

const HeaderBarSearch = () => {
  return (
    <div className="HeaderBar HeaderBarSearch">
        <div id="search">
          <img src={Search} className="SearchButtonIcon" alt="" />
          <input type="text" placeholder="Search"/>
          <img src={Close} className="SearchButtonIcon" alt="" />
        </div>
    </div>
  )
}

export default HeaderBarSearch