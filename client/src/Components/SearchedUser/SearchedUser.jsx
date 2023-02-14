import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './SearchedUser.css'

const SearchUser = ({person,user}) => {
    const navigate = useNavigate();
  
    return (
      <div className="SearchedUser" onClick={()=>navigate(`/${person._id}`)}>
          <div>
              <img src={person.profilePicture ? person.profilePicture : "https://res.cloudinary.com/princedhameliya/image/upload/v1669662212/Default/defaultProfile_tvonuv.png"} alt="" className="SearchedUserImage" />
              <div className="SearchedUserName">
                  <span>{person.username}</span>
                  <span>{person.firstname} {person.lastname}</span>
              </div>
          </div>
      </div>
    )
  }

const SearchedUser = ({persons,searchedName}) => {
    const {user} = useSelector((state)=>state.authReducer.authData)
    let [searchedUsers, setSearchedUsers] = useState([]);

    useEffect(()=>{
        if(searchedName.length === 0){
            setSearchedUsers([]);
        }else{
            setSearchedUsers(persons.filter(person=>{
                let fullName = person?.firstname+" "+person?.lastname;
                fullName = fullName.toLowerCase();
                return (person.username.includes(searchedName) || fullName.includes(searchedName))
            }));
        }
    },[searchedName.length])

  return (
    <div className="SearchedUsers">
        <div className="SearchedUsersList">
            {searchedUsers.map((person, id)=>{
                if(person._id !== user._id){
                    return <SearchUser person={person} user={user} key={id} />
                }
                return null;
            })}
        </div>
    </div>
  )
}

export default SearchedUser