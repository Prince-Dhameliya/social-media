import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import Posts from '../Posts/Posts'
import StoryScroller from '../StoryScroller/StoryScroller'
import './HomeSide.css'

const HomeSide = ({posts,persons,location,screenSize}) => {
  return (
    <>
      <div className="HomeSide">
          <div className="PostSide">
              <StoryScroller/>
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