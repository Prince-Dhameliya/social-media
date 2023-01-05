import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './HomeSide.css'

const HomeSide = () => {
  return (
    <div className="HomeSide">
        <div className="PostSide">
            <PostShare />
            <Posts />
        </div>
        <div className="FollowerSide">
            <FollowersCard/>
        </div>
    </div>
  )
}

export default HomeSide