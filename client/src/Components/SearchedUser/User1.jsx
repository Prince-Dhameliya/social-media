import React from 'react'
import { Link } from 'react-router-dom';

const User = ({person,user}) => {

  return (
    <div className="SearchedUser">
        <div>
            <img src={person.profilePicture ? person.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} alt="" className="SearchedUserImage" />
            <div className="SearchedUserName">
                <span><Link style={{textDecoration: "none", color: "inherit"}} to={`/${person._id}`}>{person.username}</Link></span>
                <span>{person.firstname} {person.lastname}</span>
            </div>
        </div>
    </div>
  )
}

export default User