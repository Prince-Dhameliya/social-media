import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import HeaderBar from '../HeaderBar/HeaderBar'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './HomeSide.css'

const HomeSide = () => {
  return (
    <>
      <div className="HomeSide">
          <div className="PostSide">
              <HeaderBar/>
              <PostShare />
              <Posts />
          </div>
          <div className="FollowerSide">
              <FollowersCard/>
          </div>
      </div>
    </>
  )
}

export default HomeSide