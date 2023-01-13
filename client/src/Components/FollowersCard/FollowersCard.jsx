import React from 'react'
import {useSelector} from 'react-redux'
import './FollowersCard.css'
import User from './User';

const FollowersCard = ({persons}) => {
    const {user} = useSelector((state)=>state.authReducer.authData)

  return (
    <div className="FollowersCard">
        <h3>People you may know</h3>

        <div className="FollowerList">
            {persons.map((person, id)=>{
                if(person._id !== user._id && !(person.followers.includes(user._id))){
                    return <User person={person} user={user} key={id} />
                }
                return null;
            })}
        </div>
    </div>
  )
}

export default FollowersCard