import React from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Notification from '../../img/noti.png'
import Comment from '../../img/comment.png'
import { UilSetting } from "@iconscout/react-unicons"
import TrendCard from '../TrendCard/TrendCard'
import { useState } from 'react'
import ShareModal from '../ShareModal/ShareModal'
import {Link} from "react-router-dom"

const RightSide = () => {

  const [modalOpened, setModalOpened] = useState(false);

  return (
    <div className="RightSide">
        <div className="NavIcons">
            <Link to="../home"><img src={Home} alt="" /></Link>
            <UilSetting />
            <img src={Notification} alt="" />
            <img src={Comment} alt="" />
        </div>

        <TrendCard />

        <button className="button rs-button" onClick={()=>setModalOpened(true)}>Share</button>
        <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  )
}

export default RightSide