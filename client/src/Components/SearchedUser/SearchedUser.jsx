import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import './SearchedUser.css'
import User from './User1'

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
                    return <User person={person} user={user} key={id} />
                }
                return null;
            })}
        </div>
    </div>
  )
}

export default SearchedUser