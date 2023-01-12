import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import './FollowerCardVertical.css'
import User from './User1'
import { getAllUser } from '../../api/UserRequest';

const FollowersCardVertical = () => {
    const [persons, setPersons] = useState([]);
    const {user} = useSelector((state)=>state.authReducer.authData)

    useEffect(() => {
        const fetchPersons = async () => {
            const {data} = await getAllUser();
            setPersons(data)
        }
        fetchPersons()
    },[])

  return (
    <div className="FollowersCardVertical">
        <h3>People you may know</h3>

        <div className="FollowerListVertical">
            {persons.map((person, id)=>{
                if(person._id !== user._id){
                    return <User person={person} user={user} key={id} />
                }
                return null;
            })}
        </div>
    </div>
  )
}

export default FollowersCardVertical