import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './HomeSide.css'

const HomeSide = ({persons}) => {
  return (
    <>
      <div className="HomeSide">
          <div className="PostSide">
              <PostShare />
              <Posts persons={persons} />
          </div>
          <div className="FollowerSide">
              <FollowersCard persons={persons}/>
          </div>
      </div>
    </>
  )
}

export default HomeSide