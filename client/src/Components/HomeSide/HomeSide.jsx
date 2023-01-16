import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import Posts from '../Posts/Posts'
import PostShare from '../PostShare/PostShare'
import './HomeSide.css'

const HomeSide = ({posts,persons,location,screenSize}) => {
  return (
    <>
      <div className="HomeSide">
          <div className="PostSide">
              <PostShare />
              <Posts posts={posts} persons={persons} location={location} screenSize={screenSize} />
          </div>
          <div className="FollowerSide">
              <FollowersCard persons={persons}/>
          </div>
      </div>
    </>
  )
}

export default HomeSide